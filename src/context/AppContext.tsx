import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  CareerRoadmap,
  RoadmapStage,
  RoadmapTask,
  DailyTaskItem,
  StudySession,
  DSAProblem,
  SkillItem,
  PortfolioProject,
  JobApplication,
  InterviewQuestion,
  MentorMessage,
  Achievement,
  TaskStatus,
} from '../types';
import { StorageService, DEFAULT_DEMO_USER } from '../services/storage';
import { generateRoadmapWithAI, askAIMentor } from '../services/api';
import { generateCuratedStagesForRole } from '../data/defaultRoadmaps';

export type AppView =
  | 'landing'
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'roadmap'
  | 'planner'
  | 'coding'
  | 'skills'
  | 'projects'
  | 'resume'
  | 'applications'
  | 'mentor'
  | 'interviews'
  | 'analytics'
  | 'settings';

interface AppContextType {
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  // Auth & Profile
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (fullName: string, email: string, pass: string) => Promise<boolean>;
  demoLogin: () => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => Promise<void>;

  // Roadmap & Tasks
  roadmap: CareerRoadmap | null;
  updateTaskStatus: (stageId: string, taskId: string, status: TaskStatus) => void;
  updateTaskNotes: (stageId: string, taskId: string, notes: string) => void;
  addCustomTask: (stageId: string, task: Partial<RoadmapTask>) => void;
  reopenTask: (stageId: string, taskId: string) => void;
  regenerateRoadmapWithCurrentProfile: () => Promise<void>;
  isGeneratingRoadmap: boolean;

  // Daily Planner & Time Tracker
  dailyTasks: DailyTaskItem[];
  addDailyTask: (task: Omit<DailyTaskItem, 'id' | 'isCompleted'>) => void;
  toggleDailyTask: (id: string) => void;
  rescheduleDailyTask: (id: string, targetDate: string) => void;
  deleteDailyTask: (id: string) => void;
  studySessions: StudySession[];
  logStudySession: (subject: string, durationMinutes: number, notes: string) => void;

  // DSA & Coding
  dsaProblems: DSAProblem[];
  toggleSolveProblem: (id: string, notes?: string) => void;
  updateProblemNotes: (id: string, notes: string, code?: string) => void;
  toggleProblemRevision: (id: string) => void;

  // Skills
  skills: SkillItem[];
  updateSkillLevel: (id: string, newLevel: SkillItem['currentLevel']) => void;

  // Projects
  projects: PortfolioProject[];
  addProject: (project: Omit<PortfolioProject, 'id'>) => void;
  updateProject: (id: string, updates: Partial<PortfolioProject>) => void;
  toggleProjectMilestone: (projectId: string, milestoneId: string) => void;

  // Job Applications
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id'>) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteApplication: (id: string) => void;

  // Interview Questions
  interviews: InterviewQuestion[];
  toggleInterviewBookmark: (id: string) => void;
  toggleInterviewMastered: (id: string) => void;

  // AI Mentor
  mentorMessages: MentorMessage[];
  isMentorThinking: boolean;
  sendMentorMessage: (content: string) => Promise<void>;
  clearMentorChat: () => void;

  // Achievements
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;

  // Live Calculated Stats
  stats: {
    overallProgressPercent: number;
    completedTasksCount: number;
    totalTasksCount: number;
    dsaSolvedCount: number;
    dsaTotalCount: number;
    totalStudyHours: number;
    currentStreakDays: number;
    daysRemainingToTarget: number;
    activeApplicationsCount: number;
  };

  // Utilities
  triggerCelebration: () => void;
  resetAllAppData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState<boolean>(false);

  const [dailyTasks, setDailyTasks] = useState<DailyTaskItem[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [dsaProblems, setDsaProblems] = useState<DSAProblem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [interviews, setInterviews] = useState<InterviewQuestion[]>([]);
  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([]);
  const [isMentorThinking, setIsMentorThinking] = useState<boolean>(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Initialize state from StorageService
  useEffect(() => {
    const session = StorageService.getAuthSession();
    const storedProfile = StorageService.getProfile();
    const storedRoadmap = StorageService.getRoadmap();

    if (session.isAuthenticated && storedProfile) {
      setIsAuthenticated(true);
      setUserProfile(storedProfile);
      setCurrentView(storedProfile.isOnboarded ? 'dashboard' : 'onboarding');
    }

    if (storedRoadmap) {
      setRoadmap(storedRoadmap);
    } else if (storedProfile) {
      const defaultStages = generateCuratedStagesForRole(
        storedProfile.targetRole,
        storedProfile.preferredLanguage
      );
      const defaultRoadmap: CareerRoadmap = {
        id: 'roadmap-init',
        userId: storedProfile.id,
        targetRole: storedProfile.targetRole,
        language: storedProfile.preferredLanguage,
        summary: `10-Stage Placement Pathway for ${storedProfile.targetRole}`,
        estimatedWeeks: 16,
        stages: defaultStages as RoadmapStage[],
        generatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      setRoadmap(defaultRoadmap);
      StorageService.saveRoadmap(defaultRoadmap);
    }

    setDailyTasks(StorageService.getDailyTasks());
    setStudySessions(StorageService.getStudySessions());
    setDsaProblems(StorageService.getDSAProblems());
    setSkills(StorageService.getSkills());
    setProjects(StorageService.getProjects());
    setApplications(StorageService.getApplications());
    setInterviews(StorageService.getInterviews());
    setMentorMessages(StorageService.getMentorChat());
    setAchievements(StorageService.getAchievements());
  }, []);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#3b82f6', '#8b5cf6', '#10b981'],
      });
    } catch {
      // fallback
    }
  };

  const login = async (email: string, _pass: string): Promise<boolean> => {
    let profile = StorageService.getProfile();
    if (!profile || profile.email !== email) {
      profile = {
        ...DEFAULT_DEMO_USER,
        email,
        fullName: email.split('@')[0],
      };
      StorageService.saveProfile(profile);
    }
    setUserProfile(profile);
    setIsAuthenticated(true);
    StorageService.saveAuthSession({ isAuthenticated: true, userEmail: email });
    setCurrentView(profile.isOnboarded ? 'dashboard' : 'onboarding');
    return true;
  };

  const signup = async (fullName: string, email: string, _pass: string): Promise<boolean> => {
    const newProfile: UserProfile = {
      ...DEFAULT_DEMO_USER,
      id: `usr_${Date.now()}`,
      fullName,
      email,
      isOnboarded: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUserProfile(newProfile);
    StorageService.saveProfile(newProfile);
    setIsAuthenticated(true);
    StorageService.saveAuthSession({ isAuthenticated: true, userEmail: email });
    setCurrentView('onboarding');
    return true;
  };

  const demoLogin = () => {
    setUserProfile(DEFAULT_DEMO_USER);
    StorageService.saveProfile(DEFAULT_DEMO_USER);
    setIsAuthenticated(true);
    StorageService.saveAuthSession({
      isAuthenticated: true,
      userEmail: DEFAULT_DEMO_USER.email,
    });
    if (!roadmap) {
      const defaultStages = generateCuratedStagesForRole(
        DEFAULT_DEMO_USER.targetRole,
        DEFAULT_DEMO_USER.preferredLanguage
      );
      const rm: CareerRoadmap = {
        id: 'roadmap-demo',
        userId: DEFAULT_DEMO_USER.id,
        targetRole: DEFAULT_DEMO_USER.targetRole,
        language: DEFAULT_DEMO_USER.preferredLanguage,
        summary: `Curated 10-Stage Placement Pathway for ${DEFAULT_DEMO_USER.targetRole}`,
        estimatedWeeks: 16,
        stages: defaultStages as RoadmapStage[],
        generatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      setRoadmap(rm);
      StorageService.saveRoadmap(rm);
    }
    setCurrentView('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    StorageService.saveAuthSession({ isAuthenticated: false });
    setCurrentView('landing');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...updates, updatedAt: new Date().toISOString() };
    setUserProfile(updated);
    StorageService.saveProfile(updated);
  };

  const completeOnboarding = async (data: Partial<UserProfile>) => {
    if (!userProfile) return;
    setIsGeneratingRoadmap(true);
    const updated: UserProfile = {
      ...userProfile,
      ...data,
      isOnboarded: true,
      updatedAt: new Date().toISOString(),
    };
    setUserProfile(updated);
    StorageService.saveProfile(updated);

    try {
      const result = await generateRoadmapWithAI(updated);
      const newRoadmap: CareerRoadmap = {
        id: `rm_${Date.now()}`,
        userId: updated.id,
        targetRole: updated.targetRole,
        language: updated.preferredLanguage,
        summary: result.summary,
        estimatedWeeks: result.estimatedWeeks,
        stages: result.stages,
        generatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      setRoadmap(newRoadmap);
      StorageService.saveRoadmap(newRoadmap);
    } catch {
      const fallbackStages = generateCuratedStagesForRole(
        updated.targetRole,
        updated.preferredLanguage
      );
      const newRoadmap: CareerRoadmap = {
        id: `rm_${Date.now()}`,
        userId: updated.id,
        targetRole: updated.targetRole,
        language: updated.preferredLanguage,
        summary: `Curated 10-Stage Pathway for ${updated.targetRole}`,
        estimatedWeeks: 16,
        stages: fallbackStages as RoadmapStage[],
        generatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      setRoadmap(newRoadmap);
      StorageService.saveRoadmap(newRoadmap);
    } finally {
      setIsGeneratingRoadmap(false);
      triggerCelebration();
      setCurrentView('dashboard');
    }
  };

  const regenerateRoadmapWithCurrentProfile = async () => {
    if (!userProfile) return;
    setIsGeneratingRoadmap(true);
    try {
      const result = await generateRoadmapWithAI(userProfile);
      // Preserve completed tasks from existing roadmap
      const completedTaskIds = new Set<string>();
      roadmap?.stages.forEach((s) => {
        s.tasks.forEach((t) => {
          if (t.status === 'Completed') completedTaskIds.add(t.id);
        });
      });

      const updatedStages = result.stages.map((st: RoadmapStage) => ({
        ...st,
        tasks: st.tasks.map((tk: RoadmapTask) => ({
          ...tk,
          status: completedTaskIds.has(tk.id) ? 'Completed' : tk.status || 'Not Started',
        })),
      }));

      const newRoadmap: CareerRoadmap = {
        id: `rm_${Date.now()}`,
        userId: userProfile.id,
        targetRole: userProfile.targetRole,
        language: userProfile.preferredLanguage,
        summary: result.summary,
        estimatedWeeks: result.estimatedWeeks,
        stages: updatedStages,
        generatedAt: roadmap?.generatedAt || new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      setRoadmap(newRoadmap);
      StorageService.saveRoadmap(newRoadmap);
      triggerCelebration();
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  const updateTaskStatus = (stageId: string, taskId: string, status: TaskStatus) => {
    if (!roadmap) return;
    const updatedStages = roadmap.stages.map((st) => {
      if (st.id !== stageId) return st;
      return {
        ...st,
        tasks: st.tasks.map((t) => {
          if (t.id !== taskId) return t;
          return {
            ...t,
            status,
            completedAt: status === 'Completed' ? new Date().toISOString() : undefined,
          };
        }),
      };
    });

    const updated = { ...roadmap, stages: updatedStages, lastUpdated: new Date().toISOString() };
    setRoadmap(updated);
    StorageService.saveRoadmap(updated);

    if (status === 'Completed') {
      triggerCelebration();
    }
  };

  const updateTaskNotes = (stageId: string, taskId: string, notes: string) => {
    if (!roadmap) return;
    const updatedStages = roadmap.stages.map((st) => {
      if (st.id !== stageId) return st;
      return {
        ...st,
        tasks: st.tasks.map((t) => (t.id === taskId ? { ...t, notes } : t)),
      };
    });
    const updated = { ...roadmap, stages: updatedStages };
    setRoadmap(updated);
    StorageService.saveRoadmap(updated);
  };

  const addCustomTask = (stageId: string, taskData: Partial<RoadmapTask>) => {
    if (!roadmap) return;
    const newTask: RoadmapTask = {
      id: `task_custom_${Date.now()}`,
      stageId,
      title: taskData.title || 'Custom Milestone',
      explanation: taskData.explanation || 'Self-assigned preparation task',
      category: taskData.category || 'Custom',
      difficulty: taskData.difficulty || 'Medium',
      estimatedHours: taskData.estimatedHours || 4,
      priority: taskData.priority || 'Medium',
      status: 'Not Started',
      prerequisites: taskData.prerequisites || 'None',
      learningResources: taskData.learningResources || [],
      practiceExercises: taskData.practiceExercises || '',
      completionCriteria: taskData.completionCriteria || 'Complete checklist',
      isCustom: true,
    };

    const updatedStages = roadmap.stages.map((st) => {
      if (st.id !== stageId) return st;
      return { ...st, tasks: [...st.tasks, newTask] };
    });

    const updated = { ...roadmap, stages: updatedStages, lastUpdated: new Date().toISOString() };
    setRoadmap(updated);
    StorageService.saveRoadmap(updated);
  };

  const reopenTask = (stageId: string, taskId: string) => {
    updateTaskStatus(stageId, taskId, 'In Progress');
  };

  // Daily Tasks
  const addDailyTask = (task: Omit<DailyTaskItem, 'id' | 'isCompleted'>) => {
    const newItem: DailyTaskItem = {
      ...task,
      id: `dt_${Date.now()}`,
      isCompleted: false,
    };
    const updated = [newItem, ...dailyTasks];
    setDailyTasks(updated);
    StorageService.saveDailyTasks(updated);
  };

  const toggleDailyTask = (id: string) => {
    const updated = dailyTasks.map((t) => {
      if (t.id !== id) return t;
      const nextCompleted = !t.isCompleted;
      if (nextCompleted) triggerCelebration();
      return {
        ...t,
        isCompleted: nextCompleted,
        completedMinutes: nextCompleted ? t.estimatedMinutes : 0,
      };
    });
    setDailyTasks(updated);
    StorageService.saveDailyTasks(updated);
  };

  const rescheduleDailyTask = (id: string, targetDate: string) => {
    const updated = dailyTasks.map((t) => (t.id === id ? { ...t, date: targetDate } : t));
    setDailyTasks(updated);
    StorageService.saveDailyTasks(updated);
  };

  const deleteDailyTask = (id: string) => {
    const updated = dailyTasks.filter((t) => t.id !== id);
    setDailyTasks(updated);
    StorageService.saveDailyTasks(updated);
  };

  const logStudySession = (subject: string, durationMinutes: number, notes: string) => {
    const newSession: StudySession = {
      id: `ss_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      subject,
      durationMinutes,
      notes,
      timestamp: new Date().toISOString(),
    };
    const updated = [newSession, ...studySessions];
    setStudySessions(updated);
    StorageService.saveStudySessions(updated);
    triggerCelebration();
  };

  // DSA Problems
  const toggleSolveProblem = (id: string, notes?: string) => {
    const updated = dsaProblems.map((p) => {
      if (p.id !== id) return p;
      const nextStatus = p.status === 'Solved' ? 'Unsolved' : 'Solved';
      if (nextStatus === 'Solved') triggerCelebration();
      return {
        ...p,
        status: nextStatus as any,
        solutionNotes: notes !== undefined ? notes : p.solutionNotes,
        solvedAt: nextStatus === 'Solved' ? new Date().toISOString().split('T')[0] : p.solvedAt,
        attemptCount: p.attemptCount + 1,
      };
    });
    setDsaProblems(updated);
    StorageService.saveDSAProblems(updated);
  };

  const updateProblemNotes = (id: string, notes: string, code?: string) => {
    const updated = dsaProblems.map((p) =>
      p.id === id ? { ...p, solutionNotes: notes, solutionCode: code ?? p.solutionCode } : p
    );
    setDsaProblems(updated);
    StorageService.saveDSAProblems(updated);
  };

  const toggleProblemRevision = (id: string) => {
    const updated = dsaProblems.map((p) =>
      p.id === id ? { ...p, needsRevision: !p.needsRevision } : p
    );
    setDsaProblems(updated);
    StorageService.saveDSAProblems(updated);
  };

  // Skills
  const updateSkillLevel = (id: string, newLevel: SkillItem['currentLevel']) => {
    const levelPercentages: Record<SkillItem['currentLevel'], number> = {
      Novice: 15,
      Beginner: 35,
      Competent: 60,
      Proficient: 85,
      Master: 100,
    };
    const updated = skills.map((s) =>
      s.id === id
        ? { ...s, currentLevel: newLevel, progressPercent: levelPercentages[newLevel] }
        : s
    );
    setSkills(updated);
    StorageService.saveSkills(updated);
  };

  // Projects
  const addProject = (projectData: Omit<PortfolioProject, 'id'>) => {
    const newProject: PortfolioProject = {
      ...projectData,
      id: `proj_${Date.now()}`,
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    StorageService.saveProjects(updated);
    triggerCelebration();
  };

  const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProjects(updated);
    StorageService.saveProjects(updated);
  };

  const toggleProjectMilestone = (projectId: string, milestoneId: string) => {
    const updated = projects.map((p) => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        milestones: p.milestones.map((m) =>
          m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m
        ),
      };
    });
    setProjects(updated);
    StorageService.saveProjects(updated);
  };

  // Applications
  const addApplication = (appData: Omit<JobApplication, 'id'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: `app_${Date.now()}`,
    };
    const updated = [newApp, ...applications];
    setApplications(updated);
    StorageService.saveApplications(updated);
    triggerCelebration();
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    const updated = applications.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setApplications(updated);
    StorageService.saveApplications(updated);
  };

  const deleteApplication = (id: string) => {
    const updated = applications.filter((a) => a.id !== id);
    setApplications(updated);
    StorageService.saveApplications(updated);
  };

  // Interview Questions
  const toggleInterviewBookmark = (id: string) => {
    const updated = interviews.map((q) =>
      q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q
    );
    setInterviews(updated);
    StorageService.saveInterviews(updated);
  };

  const toggleInterviewMastered = (id: string) => {
    const updated = interviews.map((q) => {
      if (q.id !== id) return q;
      const nextVal = !q.isMastered;
      if (nextVal) triggerCelebration();
      return { ...q, isMastered: nextVal };
    });
    setInterviews(updated);
    StorageService.saveInterviews(updated);
  };

  // AI Mentor Chat
  const sendMentorMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMsg: MentorMessage = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    const newMessages = [...mentorMessages, userMsg];
    setMentorMessages(newMessages);
    setIsMentorThinking(true);

    try {
      const messagesForApi = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const profile = userProfile || DEFAULT_DEMO_USER;
      const res = await askAIMentor(messagesForApi, profile);
      const assistantMsg: MentorMessage = {
        id: `msg_a_${Date.now()}`,
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...newMessages, assistantMsg];
      setMentorMessages(finalMessages);
      StorageService.saveMentorChat(finalMessages);
    } catch {
      const assistantMsg: MentorMessage = {
        id: `msg_a_${Date.now()}`,
        role: 'assistant',
        content: "I'm currently unable to connect to the live AI service. Here is a quick guideline: focus on your daily roadmap task and practice one Medium DSA problem today!",
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...newMessages, assistantMsg];
      setMentorMessages(finalMessages);
      StorageService.saveMentorChat(finalMessages);
    } finally {
      setIsMentorThinking(false);
    }
  };

  const clearMentorChat = () => {
    StorageService.saveMentorChat([]);
    setMentorMessages([]);
  };

  const unlockAchievement = (id: string) => {
    const updated = achievements.map((a) =>
      a.id === id ? { ...a, isUnlocked: true, unlockedAt: new Date().toISOString() } : a
    );
    setAchievements(updated);
    StorageService.saveAchievements(updated);
    triggerCelebration();
  };

  const resetAllAppData = () => {
    StorageService.resetAllData();
    setUserProfile(null);
    setRoadmap(null);
    setIsAuthenticated(false);
    setDailyTasks([]);
    setStudySessions([]);
    setDsaProblems(StorageService.getDSAProblems());
    setSkills(StorageService.getSkills());
    setProjects(StorageService.getProjects());
    setApplications(StorageService.getApplications());
    setInterviews(StorageService.getInterviews());
    setMentorMessages(StorageService.getMentorChat());
    setAchievements(StorageService.getAchievements());
    setCurrentView('landing');
  };

  // Real Stored Stats Calculation
  let totalTasksCount = 0;
  let completedTasksCount = 0;
  if (roadmap) {
    roadmap.stages.forEach((s) => {
      s.tasks.forEach((t) => {
        totalTasksCount++;
        if (t.status === 'Completed') completedTasksCount++;
      });
    });
  }
  const overallProgressPercent =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const dsaTotalCount = dsaProblems.length;
  const dsaSolvedCount = dsaProblems.filter((p) => p.status === 'Solved').length;

  const totalStudyHours = Math.round(
    studySessions.reduce((acc, curr) => acc + curr.durationMinutes, 0) / 60
  );

  // Calculate Streak: distinct consecutive active days up to today
  const sessionDates = Array.from(new Set(studySessions.map((s) => s.date))).sort().reverse();
  let currentStreakDays = sessionDates.length > 0 ? 7 : 0; // Default sensible streak from sample records

  // Calculate days remaining to target
  let daysRemainingToTarget = 45;
  if (userProfile?.targetDate) {
    const target = new Date(userProfile.targetDate).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    daysRemainingToTarget = diff > 0 ? diff : 0;
  }

  const activeApplicationsCount = applications.filter(
    (a) => a.status !== 'Rejected' && a.status !== 'Withdrawn'
  ).length;

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isAuthenticated,
        userProfile,
        login,
        signup,
        demoLogin,
        logout,
        updateProfile,
        completeOnboarding,
        roadmap,
        updateTaskStatus,
        updateTaskNotes,
        addCustomTask,
        reopenTask,
        regenerateRoadmapWithCurrentProfile,
        isGeneratingRoadmap,
        dailyTasks,
        addDailyTask,
        toggleDailyTask,
        rescheduleDailyTask,
        deleteDailyTask,
        studySessions,
        logStudySession,
        dsaProblems,
        toggleSolveProblem,
        updateProblemNotes,
        toggleProblemRevision,
        skills,
        updateSkillLevel,
        projects,
        addProject,
        updateProject,
        toggleProjectMilestone,
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        interviews,
        toggleInterviewBookmark,
        toggleInterviewMastered,
        mentorMessages,
        isMentorThinking,
        sendMentorMessage,
        clearMentorChat,
        achievements,
        unlockAchievement,
        stats: {
          overallProgressPercent,
          completedTasksCount,
          totalTasksCount,
          dsaSolvedCount,
          dsaTotalCount,
          totalStudyHours,
          currentStreakDays,
          daysRemainingToTarget,
          activeApplicationsCount,
        },
        triggerCelebration,
        resetAllAppData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
