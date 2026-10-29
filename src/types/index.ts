export type ProgrammingLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type PreferredLanguage = 'Java' | 'Python' | 'C++' | 'JavaScript';

export type TargetRole =
  | 'Software Development Engineer'
  | 'Full-Stack Developer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Data Analyst'
  | 'AI/ML Engineer'
  | 'DevOps / Cloud Engineer';

export type PlacementGoal =
  | 'Summer Internship'
  | 'On-Campus Placement'
  | 'Off-Campus Placement'
  | 'Higher Studies & Research';

export type LearningStyle =
  | 'Hands-on Coding & Projects'
  | 'Video Tutorials & Courses'
  | 'Structured Documentation & Books'
  | 'Problem-Solving & Competitive Coding';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  academicYear: string;
  gradYear: string;
  skillLevel: ProgrammingLevel;
  preferredLanguage: PreferredLanguage;
  targetRole: TargetRole;
  placementGoal: PlacementGoal;
  targetCompanies: string;
  dailyHours: number;
  targetDate: string; // YYYY-MM-DD
  completedTopics: string[];
  weakAreas: string[];
  learningStyle: LearningStyle;
  resumeFileName?: string;
  resumeText?: string;
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface LearningResource {
  name: string;
  url: string;
}

export interface RoadmapTask {
  id: string;
  stageId: string;
  title: string;
  explanation: string;
  category: string;
  difficulty: TaskDifficulty;
  estimatedHours: number;
  priority: TaskPriority;
  status: TaskStatus;
  prerequisites: string;
  learningResources: LearningResource[];
  practiceExercises: string;
  completionCriteria: string;
  notes?: string;
  reviewDate?: string;
  completedAt?: string;
  isCustom?: boolean;
}

export interface RoadmapStage {
  id: string;
  stageNumber: number;
  title: string;
  description: string;
  duration: string;
  tasks: RoadmapTask[];
}

export interface CareerRoadmap {
  id: string;
  userId: string;
  targetRole: TargetRole;
  language: PreferredLanguage;
  summary: string;
  estimatedWeeks: number;
  stages: RoadmapStage[];
  generatedAt: string;
  lastUpdated: string;
}

// Daily Planner & Study Tracker
export interface DailyTaskItem {
  id: string;
  taskId?: string; // links to roadmap task if selected from roadmap
  title: string;
  category: string;
  estimatedMinutes: number;
  completedMinutes: number;
  isCompleted: boolean;
  date: string; // YYYY-MM-DD
  notes?: string;
}

export interface StudySession {
  id: string;
  date: string; // YYYY-MM-DD
  subject: string;
  durationMinutes: number;
  notes: string;
  timestamp: string;
}

// DSA & Coding Practice
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type ProblemStatus = 'Unsolved' | 'Attempted' | 'Solved' | 'Review Needed';

export interface DSAProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: ProblemDifficulty;
  platform: 'LeetCode' | 'GeeksforGeeks' | 'HackerRank' | 'CodeChef' | 'Custom';
  platformUrl: string;
  status: ProblemStatus;
  solutionNotes?: string;
  solutionCode?: string;
  language?: string;
  solvedAt?: string;
  attemptCount: number;
  needsRevision: boolean;
}

// Skills Matrix
export type ProficiencyLevel = 'Novice' | 'Beginner' | 'Competent' | 'Proficient' | 'Master';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Core CS' | 'Languages' | 'DSA' | 'Frameworks' | 'Tools & DevOps' | 'Soft Skills';
  currentLevel: ProficiencyLevel;
  targetLevel: ProficiencyLevel;
  progressPercent: number;
  relatedTaskIds: string[];
  docUrl: string;
  recommendedPractice: string;
}

// Project Portfolio
export type ProjectStatus = 'Idea' | 'In Progress' | 'Completed' | 'Deployed';

export interface ProjectMilestone {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  targetSkills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: ProjectStatus;
  startDate: string;
  targetCompletionDate: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  milestones: ProjectMilestone[];
  notes?: string;
  recruiterHighlights: string;
}

// Placement Application Tracker
export type ApplicationStage =
  | 'Interested'
  | 'Applied'
  | 'Online Assessment'
  | 'Interview Scheduled'
  | 'Offer'
  | 'Rejected'
  | 'Withdrawn';

export interface JobApplication {
  id: string;
  companyName: string;
  role: string;
  jobUrl?: string;
  location: string;
  packageStipend: string;
  applicationDate: string;
  deadline?: string;
  status: ApplicationStage;
  nextStep: string;
  nextStepDate?: string;
  notes?: string;
  referralContact?: string;
}

// Interview Prep
export interface InterviewQuestion {
  id: string;
  topic: 'Java & OOP' | 'DBMS & SQL' | 'Operating Systems' | 'Computer Networks' | 'System Design' | 'Behavioral & HR';
  question: string;
  answerSummary: string;
  detailedExplanation: string;
  codeSnippet?: string;
  commonFollowUps: string[];
  isBookmarked: boolean;
  isMastered: boolean;
  frequency: 'High' | 'Medium' | 'Core';
}

// AI Career Mentor
export interface MentorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
}

// Achievements
export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  category: 'streak' | 'dsa' | 'roadmap' | 'projects';
}

// Mock Test Center & Assessment Engine
export type MockTestCategory =
  | 'Quantitative Aptitude'
  | 'Logical Reasoning'
  | 'Verbal Ability'
  | 'Core CS & Programming'
  | 'DSA & Problem Solving'
  | 'Company-Specific Full Mock';

export interface MockQuestion {
  id: string;
  category: MockTestCategory;
  topic: string;
  subtopic?: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetCompanies?: string[];
  timeEstimateSeconds?: number;
}

export type MockTestStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Abandoned';

export interface MockTestSession {
  id: string;
  title: string;
  category: MockTestCategory;
  totalQuestions: number;
  durationMinutes: number;
  questions: MockQuestion[];
  userAnswers: Record<string, number>; // questionId -> selectedOptionIndex
  markedForReview: string[]; // array of questionIds
  status: MockTestStatus;
  startedAt?: string;
  completedAt?: string;
  timeSpentSeconds: number;
  earnedMarks: number;
  totalMarks: number;
  accuracy: number;
  aiFeedbackSummary?: string;
}

export interface TopicPerformance {
  topic: string;
  correct: number;
  total: number;
  accuracy: number;
}

export interface MockTestDiagnosticReport {
  sessionId: string;
  testTitle: string;
  category: MockTestCategory;
  completedAt: string;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unattemptedQuestions: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  avgSecondsPerQuestion: number;
  topicBreakdown: TopicPerformance[];
  strongTopics: string[];
  weakTopics: string[];
  aiActionPlan?: string;
  suggestedTasks?: string[];
}
