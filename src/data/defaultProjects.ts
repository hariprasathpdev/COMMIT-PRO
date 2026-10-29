import { PortfolioProject } from '../types';

export const INITIAL_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Commit Pro — Career Roadmap & Placement Platform',
    description: 'Personalized student placement platform with interactive 10-stage learning paths, daily productivity trackers, DSA practice logs, and AI mentoring.',
    targetSkills: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Gemini AI', 'REST API'],
    difficulty: 'Advanced',
    status: 'In Progress',
    startDate: '2026-10-15',
    targetCompletionDate: '2026-11-20',
    githubUrl: 'https://github.com/hariprasath/commit-pro',
    liveUrl: 'https://commit-pro.dev',
    techStack: ['React 19', 'TypeScript', 'Tailwind v4', 'Express', 'Gemini 3.8 Flash', 'Recharts'],
    milestones: [
      { id: 'm-1', title: 'Complete 15-question onboarding architecture', isCompleted: true },
      { id: 'm-2', title: 'Implement 10-stage dynamic roadmap generator', isCompleted: true },
      { id: 'm-3', title: 'Build interactive DSA problem tracker with code runner', isCompleted: true },
      { id: 'm-4', title: 'Integrate ATS Resume Review and Gemini AI Career Mentor', isCompleted: true },
      { id: 'm-5', title: 'Deploy on Cloud Run and configure SSL domain', isCompleted: false },
    ],
    notes: 'Recruiter favorite because it directly solves the placement preparation fragmentation problem.',
    recruiterHighlights: 'Engineered responsive single-page architecture with state persistence, sub-second API responses, and AI-driven personalized task generation.'
  },
  {
    id: 'proj-2',
    title: 'Distributed Asynchronous Task Queue & Rate Limiter',
    description: 'High-throughput background job processing engine with Redis backing, exponential backoff retries, and token-bucket rate limiting.',
    targetSkills: ['Node.js', 'Redis', 'Concurrency', 'System Design', 'Docker'],
    difficulty: 'Advanced',
    status: 'Idea',
    startDate: '2026-11-25',
    targetCompletionDate: '2026-12-30',
    githubUrl: 'https://github.com/hariprasath/distributed-task-worker',
    techStack: ['TypeScript', 'Redis', 'Docker', 'Prometheus', 'Express'],
    milestones: [
      { id: 'm-21', title: 'Design FIFO and priority queue schemas in Redis', isCompleted: false },
      { id: 'm-22', title: 'Implement worker thread pool with graceful shutdown', isCompleted: false },
      { id: 'm-23', title: 'Benchmark throughput with 10,000 tasks/min under load', isCompleted: false },
    ],
    notes: 'Demonstrates deep backend understanding, distributed concurrency, and resilience.',
    recruiterHighlights: 'Handled 5,000 requests/sec with zero deadlocks and 99.9% uptime in stress simulations.'
  },
  {
    id: 'proj-3',
    title: 'Campus Peer Borrowing & Marketplace Hub',
    description: 'Secure university marketplace for textbooks, lab equipment, and calculators with student email verification and chat.',
    targetSkills: ['React', 'Database Design', 'PostgreSQL', 'Authentication'],
    difficulty: 'Intermediate',
    status: 'Completed',
    startDate: '2026-08-01',
    targetCompletionDate: '2026-09-15',
    githubUrl: 'https://github.com/hariprasath/campus-hub',
    liveUrl: 'https://campus-hub.app',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    milestones: [
      { id: 'm-31', title: 'College domain email verification OTP', isCompleted: true },
      { id: 'm-32', title: 'Relational schema with foreign keys and indexes', isCompleted: true },
      { id: 'm-33', title: 'Peer-to-peer real-time messaging', isCompleted: true },
    ],
    notes: 'Proves capability to take a product from concept to working student deployment.',
    recruiterHighlights: 'Acquired 180+ verified student testers during campus beta testing.'
  }
];
