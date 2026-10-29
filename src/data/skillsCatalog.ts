import { SkillItem } from '../types';

export const INITIAL_SKILLS: SkillItem[] = [
  {
    id: 'skill-1',
    name: 'Java / Core OOP',
    category: 'Languages',
    currentLevel: 'Competent',
    targetLevel: 'Proficient',
    progressPercent: 70,
    relatedTaskIds: ['task-1-1', 'task-1-2', 'task-3-1'],
    docUrl: 'https://dev.java',
    recommendedPractice: 'Implement clean low-level design patterns and thread concurrency.'
  },
  {
    id: 'skill-2',
    name: 'Data Structures & Algorithms',
    category: 'DSA',
    currentLevel: 'Competent',
    targetLevel: 'Master',
    progressPercent: 55,
    relatedTaskIds: ['task-2-1', 'task-2-2', 'task-2-3'],
    docUrl: 'https://leetcode.com',
    recommendedPractice: 'Solve 1 Medium problem daily across Two Pointers, Trees, and Dynamic Programming.'
  },
  {
    id: 'skill-3',
    name: 'Relational DBMS & SQL',
    category: 'Core CS',
    currentLevel: 'Beginner',
    targetLevel: 'Proficient',
    progressPercent: 40,
    relatedTaskIds: ['task-4-1', 'task-4-2'],
    docUrl: 'https://use-the-index-luke.com',
    recommendedPractice: 'Practice window functions, indexing internals, and transaction isolation levels.'
  },
  {
    id: 'skill-4',
    name: 'Operating Systems & Concurrency',
    category: 'Core CS',
    currentLevel: 'Beginner',
    targetLevel: 'Competent',
    progressPercent: 35,
    relatedTaskIds: ['task-5-1'],
    docUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    recommendedPractice: 'Solve producer-consumer sync and review paging, TLB, and deadlock conditions.'
  },
  {
    id: 'skill-5',
    name: 'Computer Networks (TCP/IP)',
    category: 'Core CS',
    currentLevel: 'Beginner',
    targetLevel: 'Competent',
    progressPercent: 45,
    relatedTaskIds: ['task-5-2'],
    docUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanisms',
    recommendedPractice: 'Trace end-to-end request lifecycle and differentiate TCP vs UDP flows.'
  },
  {
    id: 'skill-6',
    name: 'React & Modern Frontend',
    category: 'Frameworks',
    currentLevel: 'Competent',
    targetLevel: 'Proficient',
    progressPercent: 65,
    relatedTaskIds: ['task-6-2'],
    docUrl: 'https://react.dev',
    recommendedPractice: 'Build responsive SPAs with state management, accessibility, and zero layout shift.'
  },
  {
    id: 'skill-7',
    name: 'RESTful API Engineering & Node.js',
    category: 'Frameworks',
    currentLevel: 'Competent',
    targetLevel: 'Proficient',
    progressPercent: 60,
    relatedTaskIds: ['task-6-1'],
    docUrl: 'https://restfulapi.net/',
    recommendedPractice: 'Implement secure JWT authentication, input validation, and rate limiting.'
  },
  {
    id: 'skill-8',
    name: 'Git, GitHub & CI/CD',
    category: 'Tools & DevOps',
    currentLevel: 'Competent',
    targetLevel: 'Proficient',
    progressPercent: 75,
    relatedTaskIds: ['task-7-2'],
    docUrl: 'https://git-scm.com/doc',
    recommendedPractice: 'Maintain conventional commit history and configure automated GitHub Actions.'
  },
  {
    id: 'skill-9',
    name: 'Behavioral Communication (STAR)',
    category: 'Soft Skills',
    currentLevel: 'Beginner',
    targetLevel: 'Proficient',
    progressPercent: 40,
    relatedTaskIds: ['task-9-2'],
    docUrl: 'https://www.themuse.com/advice/star-interview-method',
    recommendedPractice: 'Prepare 5 quantified project stories showcasing conflict resolution and ownership.'
  }
];
