import {
  UserProfile,
  CareerRoadmap,
  DailyTaskItem,
  StudySession,
  DSAProblem,
  SkillItem,
  PortfolioProject,
  JobApplication,
  InterviewQuestion,
  MentorMessage,
  Achievement,
} from '../types';
import { INITIAL_DSA_PROBLEMS } from '../data/dsaProblems';
import { CORE_INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { INITIAL_SKILLS } from '../data/skillsCatalog';
import { INITIAL_PROJECTS } from '../data/defaultProjects';
import { generateCuratedStagesForRole } from '../data/defaultRoadmaps';

const STORAGE_KEYS = {
  USER_PROFILE: 'commit_pro_user_profile',
  ROADMAP: 'commit_pro_roadmap',
  DAILY_TASKS: 'commit_pro_daily_tasks',
  STUDY_SESSIONS: 'commit_pro_study_sessions',
  DSA_PROBLEMS: 'commit_pro_dsa_problems',
  SKILLS: 'commit_pro_skills',
  PROJECTS: 'commit_pro_projects',
  APPLICATIONS: 'commit_pro_applications',
  INTERVIEWS: 'commit_pro_interviews',
  MENTOR_CHAT: 'commit_pro_mentor_chat',
  ACHIEVEMENTS: 'commit_pro_achievements',
  AUTH_SESSION: 'commit_pro_auth_session',
  THEME: 'commit_pro_theme',
};

export const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr_demo_789',
  fullName: 'Alex Chen',
  email: 'alex.chen@university.edu',
  college: 'National Institute of Technology',
  degree: 'B.Tech in Computer Science & Engineering',
  branch: 'Computer Science',
  academicYear: '3rd Year (6th Semester)',
  gradYear: '2026',
  skillLevel: 'Intermediate',
  preferredLanguage: 'Java',
  targetRole: 'Software Development Engineer',
  placementGoal: 'On-Campus Placement',
  targetCompanies: 'Google, Microsoft, Amazon, Atlassian, Oracle',
  dailyHours: 3.5,
  targetDate: '2026-12-15',
  completedTopics: ['Arrays', 'Strings', 'Linked Lists', 'Basic SQL', 'Git'],
  weakAreas: ['Dynamic Programming', 'B-Tree Indexing', 'System Design', 'Graphs'],
  learningStyle: 'Hands-on Coding & Projects',
  resumeFileName: 'Alex_Chen_SDE_Resume.pdf',
  resumeText: `Alex Chen
alex.chen@university.edu | github.com/alexchen-dev | linkedin.com/in/alexchen

EDUCATION
B.Tech in Computer Science & Engineering (2022 - 2026) | CGPA: 8.8/10.0

SKILLS
Languages: Java, Python, C++, JavaScript, SQL
Frameworks: React, Node.js, Express, Tailwind CSS
Tools & Systems: Git, Docker, Linux, MySQL, PostgreSQL

PROJECTS
Commit Pro (React, TypeScript, Tailwind, Node.js)
- Developed student preparation platform with customized 10-stage technical career roadmap.
- Integrated AI career mentor and DSA tracker with real-time progress calculations.
- Designed responsive dark mode interface supporting keyboard accessibility.

Peer Resource Sharing Hub (React, Node.js, MongoDB)
- Built student resource sharing application used by 180+ verified campus students.
- Implemented JWT authentication and RESTful API endpoints for textbook listings.`,
  isOnboarded: true,
  createdAt: '2026-10-01T08:00:00.000Z',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Commit',
    description: 'Began your placement preparation journey on Commit Pro',
    iconName: 'GitCommit',
    unlockedAt: '2026-10-01',
    isUnlocked: true,
    category: 'roadmap',
  },
  {
    id: 'ach-2',
    title: 'DSA Starter: 10 Solved',
    description: 'Solved your first 10 data structure problems',
    iconName: 'Code2',
    unlockedAt: '2026-10-24',
    isUnlocked: true,
    category: 'dsa',
  },
  {
    id: 'ach-3',
    title: '7-Day Preparation Streak',
    description: 'Maintained consistent study sessions for 7 consecutive days',
    iconName: 'Flame',
    unlockedAt: '2026-10-28',
    isUnlocked: true,
    category: 'streak',
  },
  {
    id: 'ach-4',
    title: 'Database Architect',
    description: 'Mastered SQL queries, ACID properties, and indexing',
    iconName: 'Database',
    isUnlocked: false,
    category: 'roadmap',
  },
  {
    id: 'ach-5',
    title: 'Flagship Deployed',
    description: 'Launched a full-stack portfolio project to live production with SSL',
    iconName: 'Rocket',
    isUnlocked: false,
    category: 'projects',
  },
  {
    id: 'ach-6',
    title: 'Interview Ready',
    description: 'Completed 5 mock technical interview sessions',
    iconName: 'Award',
    isUnlocked: false,
    category: 'roadmap',
  },
];

export const INITIAL_DAILY_TASKS: DailyTaskItem[] = [
  {
    id: 'dt-1',
    taskId: 'task-1-1',
    title: 'Java Core Memory: Stack vs Heap & Garbage Collection review',
    category: 'Fundamentals',
    estimatedMinutes: 45,
    completedMinutes: 45,
    isCompleted: true,
    date: new Date().toISOString().split('T')[0],
    notes: 'Reviewed young generation, survivor spaces, and G1 GC flags.',
  },
  {
    id: 'dt-2',
    taskId: 'task-2-1',
    title: 'Solve 2 Medium LeetCode problems (Sliding Window)',
    category: 'DSA',
    estimatedMinutes: 60,
    completedMinutes: 60,
    isCompleted: true,
    date: new Date().toISOString().split('T')[0],
    notes: 'Solved Longest Substring Without Repeating Characters in O(N).',
  },
  {
    id: 'dt-3',
    taskId: 'task-3-1',
    title: 'Low-Level Design: Factory & Strategy Pattern notes',
    category: 'Core CS',
    estimatedMinutes: 40,
    completedMinutes: 0,
    isCompleted: false,
    date: new Date().toISOString().split('T')[0],
    notes: 'Need to write code sample for PaymentProcessor strategy.',
  },
  {
    id: 'dt-4',
    title: 'Review 5 Core OS flashcards (Paging & Virtual Memory)',
    category: 'Interview Prep',
    estimatedMinutes: 30,
    completedMinutes: 0,
    isCompleted: false,
    date: new Date().toISOString().split('T')[0],
    notes: 'Check TLB miss penalty explanation.',
  },
];

export const INITIAL_STUDY_SESSIONS: StudySession[] = [
  {
    id: 'ss-1',
    date: '2026-10-23',
    subject: 'DSA - Linked Lists & Two Pointers',
    durationMinutes: 120,
    notes: 'Mastered Floyd Cycle detection and reverse linked list in O(1) space.',
    timestamp: '2026-10-23T18:00:00Z',
  },
  {
    id: 'ss-2',
    date: '2026-10-24',
    subject: 'Core CS - Operating Systems (Processes & Threads)',
    durationMinutes: 90,
    notes: 'Understood PCB context switching and CPU scheduling algorithms.',
    timestamp: '2026-10-24T19:30:00Z',
  },
  {
    id: 'ss-3',
    date: '2026-10-25',
    subject: 'DSA - Binary Search on Answer Space',
    durationMinutes: 110,
    notes: 'Solved Koko Eating Bananas and Capacity To Ship Packages.',
    timestamp: '2026-10-25T17:00:00Z',
  },
  {
    id: 'ss-4',
    date: '2026-10-26',
    subject: 'DBMS - Advanced SQL & Indexing',
    durationMinutes: 80,
    notes: 'Ran EXPLAIN ANALYZE on clustered vs secondary indexes.',
    timestamp: '2026-10-26T20:00:00Z',
  },
  {
    id: 'ss-5',
    date: '2026-10-27',
    subject: 'Portfolio Project - Commit Pro Feature Development',
    durationMinutes: 150,
    notes: 'Wrote React hooks and Tailwind design system components.',
    timestamp: '2026-10-27T16:00:00Z',
  },
  {
    id: 'ss-6',
    date: '2026-10-28',
    subject: 'DSA - Sliding Window & Two Pointers',
    durationMinutes: 105,
    notes: 'Solved Minimum Window Substring test cases.',
    timestamp: '2026-10-28T18:45:00Z',
  },
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    companyName: 'Google',
    role: 'Software Engineering Intern (Summer 2027)',
    jobUrl: 'https://careers.google.com',
    location: 'Bangalore / Hyderabad / Remote',
    packageStipend: '₹1,15,000 / month',
    applicationDate: '2026-10-10',
    deadline: '2026-11-15',
    status: 'Online Assessment',
    nextStep: 'Google Online Challenge (GOC) - 2 DSA Questions (90 mins)',
    nextStepDate: '2026-11-04',
    notes: 'Applied via employee referral from college alumni. Focus heavily on graphs and strings.',
    referralContact: 'Rahul Sharma (Senior SWE, Google Cloud)',
  },
  {
    id: 'app-2',
    companyName: 'Microsoft',
    role: 'Software Development Engineer - 1',
    jobUrl: 'https://careers.microsoft.com',
    location: 'Hyderabad, India',
    packageStipend: '₹45,000,000 CTC (Base + Stocks + Bonus)',
    applicationDate: '2026-10-18',
    deadline: '2026-11-20',
    status: 'Applied',
    nextStep: 'Awaiting shortlisting of resume through campus portal',
    nextStepDate: '2026-11-10',
    notes: 'Campus drive slot day 1 company.',
  },
  {
    id: 'app-3',
    companyName: 'Atlassian',
    role: 'Associate Software Engineer',
    jobUrl: 'https://www.atlassian.com/company/careers',
    location: 'Bengaluru, India',
    packageStipend: '₹55,000,000 CTC',
    applicationDate: '2026-10-12',
    deadline: '2026-10-30',
    status: 'Interview Scheduled',
    nextStep: 'Technical Round 1: DSA + OOP Values Interview',
    nextStepDate: '2026-11-06',
    notes: 'Values interview is crucial: "Open company, no bullshit", "Don\'t #@!% the customer".',
    referralContact: 'Priya Nair (Product Engineer)',
  },
  {
    id: 'app-4',
    companyName: 'Razorpay',
    role: 'Software Engineer Intern',
    jobUrl: 'https://razorpay.com/jobs',
    location: 'Bengaluru, India',
    packageStipend: '₹45,000 / month + PPO',
    applicationDate: '2026-10-22',
    deadline: '2026-11-12',
    status: 'Interested',
    nextStep: 'Draft tailored cover letter and finalize portfolio link',
    nextStepDate: '2026-10-31',
    notes: 'Fintech giant; emphasize reliability, transactions, and backend knowledge.',
  },
];

export const StorageService = {
  getProfile(): UserProfile | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  saveProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getRoadmap(): CareerRoadmap | null {
    const raw = localStorage.getItem(STORAGE_KEYS.ROADMAP);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  saveRoadmap(roadmap: CareerRoadmap): void {
    localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(roadmap));
  },

  getDailyTasks(): DailyTaskItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_TASKS);
    if (!raw) return INITIAL_DAILY_TASKS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_DAILY_TASKS;
    }
  },

  saveDailyTasks(tasks: DailyTaskItem[]): void {
    localStorage.setItem(STORAGE_KEYS.DAILY_TASKS, JSON.stringify(tasks));
  },

  getStudySessions(): StudySession[] {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS);
    if (!raw) return INITIAL_STUDY_SESSIONS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_STUDY_SESSIONS;
    }
  },

  saveStudySessions(sessions: StudySession[]): void {
    localStorage.setItem(STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(sessions));
  },

  getDSAProblems(): DSAProblem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DSA_PROBLEMS);
    if (!raw) return INITIAL_DSA_PROBLEMS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_DSA_PROBLEMS;
    }
  },

  saveDSAProblems(problems: DSAProblem[]): void {
    localStorage.setItem(STORAGE_KEYS.DSA_PROBLEMS, JSON.stringify(problems));
  },

  getSkills(): SkillItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SKILLS);
    if (!raw) return INITIAL_SKILLS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SKILLS;
    }
  },

  saveSkills(skills: SkillItem[]): void {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  },

  getProjects(): PortfolioProject[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) return INITIAL_PROJECTS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  saveProjects(projects: PortfolioProject[]): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getApplications(): JobApplication[] {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) return INITIAL_APPLICATIONS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_APPLICATIONS;
    }
  },

  saveApplications(apps: JobApplication[]): void {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  },

  getInterviews(): InterviewQuestion[] {
    const raw = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
    if (!raw) return CORE_INTERVIEW_QUESTIONS;
    try {
      return JSON.parse(raw);
    } catch {
      return CORE_INTERVIEW_QUESTIONS;
    }
  },

  saveInterviews(interviews: InterviewQuestion[]): void {
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews));
  },

  getMentorChat(): MentorMessage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MENTOR_CHAT);
    if (!raw) {
      return [
        {
          id: 'msg-welcome',
          role: 'assistant',
          content: `👋 **Welcome to Commit Pro AI Career Mentor!**
I'm here to help you crack your dream technical placement.
Here are a few high-impact things we can do together right now:
- **Mock Technical Coding Interview:** Ask me to test your problem-solving process.
- **Explain Tough Algorithms:** Like Knapsack DP, Dijkstra, or B-Trees in simple terms.
- **Review Resume Bullets:** Drop a bullet point and I'll format it with the Google XYZ formula.
- **Behavioral Practice:** Practice answering common HR traps using the STAR method.

What would you like to conquer today?`,
          timestamp: new Date().toISOString(),
          suggestedActions: [
            'Explain Dynamic Programming with intuition',
            'Conduct a Mock Technical Interview',
            'Review my project bullet point for resume',
            'How to answer "Tell me about yourself"'
          ]
        }
      ];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveMentorChat(messages: MentorMessage[]): void {
    localStorage.setItem(STORAGE_KEYS.MENTOR_CHAT, JSON.stringify(messages));
  },

  getAchievements(): Achievement[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!raw) return INITIAL_ACHIEVEMENTS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  },

  saveAchievements(achievements: Achievement[]): void {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  },

  getAuthSession(): { isAuthenticated: boolean; userEmail?: string } {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!raw) return { isAuthenticated: false };
    try {
      return JSON.parse(raw);
    } catch {
      return { isAuthenticated: false };
    }
  },

  saveAuthSession(session: { isAuthenticated: boolean; userEmail?: string }): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session));
  },

  resetAllData(): void {
    localStorage.clear();
  },

  exportAllData(): string {
    const data = {
      profile: this.getProfile(),
      roadmap: this.getRoadmap(),
      dailyTasks: this.getDailyTasks(),
      studySessions: this.getStudySessions(),
      dsaProblems: this.getDSAProblems(),
      skills: this.getSkills(),
      projects: this.getProjects(),
      applications: this.getApplications(),
      interviews: this.getInterviews(),
      achievements: this.getAchievements(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }
};
