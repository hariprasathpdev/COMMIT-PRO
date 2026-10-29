import { RoadmapStage } from '../types';

export function generateCuratedStagesForRole(
  role: string = 'Software Development Engineer',
  language: string = 'Java'
): RoadmapStage[] {
  return [
    {
      id: 'stage-1',
      stageNumber: 1,
      title: 'Stage 1: Programming Fundamentals',
      description: `Deepen mastery of ${language}, memory management, collections, and clean coding standards.`,
      duration: '2 Weeks',
      tasks: [
        {
          id: 'task-1-1',
          stageId: 'stage-1',
          title: `${language} Core Syntax, Primitives & Memory Model`,
          explanation: `Understand variable scopes, pass-by-value semantics, stack vs heap allocation, and garbage collection mechanisms in ${language}.`,
          category: 'Fundamentals',
          difficulty: 'Easy',
          estimatedHours: 8,
          priority: 'High',
          status: 'In Progress',
          prerequisites: 'Basic terminal familiarity',
          learningResources: [
            {
              name: `${language} Official Documentation`,
              url: language === 'Java' ? 'https://dev.java' : 'https://docs.python.org/3/',
            },
            { name: 'Roadmap.sh Computer Science', url: 'https://roadmap.sh/computer-science' },
          ],
          practiceExercises:
            'Build 5 algorithmic mini-programs; verify memory footprint and reference equality.',
          completionCriteria:
            'Can explain stack vs heap frame allocation and reference equality clearly.',
        },
        {
          id: 'task-1-2',
          stageId: 'stage-1',
          title: 'Collections Framework & Built-in Data Structures',
          explanation:
            'Master Lists, Sets, Maps, Deques, and their standard library implementations, internal hashing, and load factors.',
          category: 'Fundamentals',
          difficulty: 'Medium',
          estimatedHours: 10,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Core syntax',
          learningResources: [
            {
              name: 'GeeksforGeeks Collections Guide',
              url: 'https://www.geeksforgeeks.org/',
            },
          ],
          practiceExercises:
            'Implement custom Comparator/Comparable and collision handling demonstration.',
          completionCriteria:
            'Explain how HashMap handles collisions with linked nodes and red-black trees.',
        },
        {
          id: 'task-1-3',
          stageId: 'stage-1',
          title: 'Clean Code, Exception Handling & Unit Testing',
          explanation:
            'Learn unchecked vs checked exceptions, try-with-resources, defensive programming, and writing unit tests.',
          category: 'Fundamentals',
          difficulty: 'Easy',
          estimatedHours: 6,
          priority: 'Medium',
          status: 'Not Started',
          prerequisites: 'Basic syntax',
          learningResources: [
            { name: 'Refactoring Guru - Clean Code', url: 'https://refactoring.guru/' },
          ],
          practiceExercises: 'Refactor a messy 100-line script into modular, tested functions.',
          completionCriteria: 'All unit test cases pass with 90%+ branch coverage.',
        },
      ],
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      title: 'Stage 2: Data Structures and Algorithms',
      description: 'Master time/space complexity analysis and high-yield interview data structures.',
      duration: '4 Weeks',
      tasks: [
        {
          id: 'task-2-1',
          stageId: 'stage-2',
          title: 'Arrays, Two Pointers & Sliding Window Patterns',
          explanation:
            'Tackle contiguous sub-array problems, prefix sums, binary search on answer spaces, and two-pointer shrink-and-expand patterns.',
          category: 'DSA',
          difficulty: 'Medium',
          estimatedHours: 14,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Loops and arrays',
          learningResources: [
            { name: 'LeetCode Explore: Arrays', url: 'https://leetcode.com/explore/' },
            { name: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap' },
          ],
          practiceExercises: 'Solve 3Sum, Container With Most Water, and Minimum Size Subarray Sum.',
          completionCriteria:
            'Solve arbitrary medium sliding-window questions within 25 minutes.',
        },
        {
          id: 'task-2-2',
          stageId: 'stage-2',
          title: 'Binary Trees, BSTs & Graph Traversal (BFS & DFS)',
          explanation:
            'Understand tree representations, inorder/preorder/postorder traversals, level-order queues, Dijkstra algorithm, and cycle detection.',
          category: 'DSA',
          difficulty: 'Hard',
          estimatedHours: 18,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Recursion and queues',
          learningResources: [
            { name: 'Visualgo Data Structure Visualizer', url: 'https://visualgo.net/en' },
          ],
          practiceExercises:
            'Solve Lowest Common Ancestor, Number of Islands, and Course Schedule.',
          completionCriteria: 'Implement DFS & BFS without referencing notes or tutorials.',
        },
        {
          id: 'task-2-3',
          stageId: 'stage-2',
          title: 'Dynamic Programming Foundations & Knapsack Variants',
          explanation:
            'Memoization vs tabulation, state definition, transition formulation, 0/1 Knapsack, and Longest Common Subsequence.',
          category: 'DSA',
          difficulty: 'Hard',
          estimatedHours: 20,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Recursion & backtracking',
          learningResources: [
            { name: 'MIT 6.006 Dynamic Programming Lectures', url: 'https://ocw.mit.edu' },
          ],
          practiceExercises: 'Solve Coin Change, House Robber II, and Edit Distance.',
          completionCriteria: 'Correctly state state transition recurrence before coding.',
        },
      ],
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      title: 'Stage 3: OOP and Core Computer Science',
      description:
        'Encapsulation, Inheritance, Polymorphism, Abstraction, and SOLID architecture principles.',
      duration: '2 Weeks',
      tasks: [
        {
          id: 'task-3-1',
          stageId: 'stage-3',
          title: 'The 4 Pillars of OOP & Real-world Modeling',
          explanation:
            'Deep dive into abstract classes vs interfaces, runtime vs compile-time polymorphism, and decoupling.',
          category: 'Core CS',
          difficulty: 'Medium',
          estimatedHours: 8,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Basic classes',
          learningResources: [
            { name: 'Dev.java Object-Oriented Programming', url: 'https://dev.java/learn/oop/' },
          ],
          practiceExercises: 'Model a parking lot or hotel reservation system in clean class diagrams.',
          completionCriteria:
            'Explain Liskov Substitution Principle with a code violation example.',
        },
        {
          id: 'task-3-2',
          stageId: 'stage-3',
          title: 'Low-Level Design & Gang of Four Design Patterns',
          explanation:
            'Master Factory, Singleton, Strategy, Observer, and Decorator design patterns frequently asked in tech interviews.',
          category: 'System Design',
          difficulty: 'Medium',
          estimatedHours: 10,
          priority: 'Medium',
          status: 'Not Started',
          prerequisites: 'OOP pillars',
          learningResources: [
            {
              name: 'SourceMaking Design Patterns',
              url: 'https://sourcemaking.com/design_patterns',
            },
          ],
          practiceExercises: 'Implement Notification Service using Strategy and Observer pattern.',
          completionCriteria: 'Draft class diagrams showcasing loosely coupled components.',
        },
      ],
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      title: 'Stage 4: SQL and Database Fundamentals',
      description:
        'Relational schemas, normalization (1NF-BCNF), ACID properties, indexing, and complex queries.',
      duration: '2 Weeks',
      tasks: [
        {
          id: 'task-4-1',
          stageId: 'stage-4',
          title: 'Advanced SQL Queries, Aggregations & Window Functions',
          explanation:
            'Write complex JOINs, GROUP BY HAVING, ROW_NUMBER(), DENSE_RANK(), and subqueries.',
          category: 'Database',
          difficulty: 'Medium',
          estimatedHours: 10,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Basic SELECT statements',
          learningResources: [{ name: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/' }],
          practiceExercises:
            'Solve top 10 SQL placement interview queries (2nd highest salary, duplicate emails).',
          completionCriteria:
            'Accurately explain Difference between WHERE and HAVING with group filters.',
        },
        {
          id: 'stage-4-2',
          stageId: 'stage-4',
          title: 'Transactions, ACID Properties & B-Tree Indexing Internals',
          explanation:
            'Understand dirty reads, phantom reads, isolation levels, and how B-Trees accelerate lookups.',
          category: 'Database',
          difficulty: 'Hard',
          estimatedHours: 12,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'SQL joins',
          learningResources: [
            { name: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/' },
          ],
          practiceExercises:
            'Analyze EXPLAIN ANALYZE execution plans on a 100k row benchmark table.',
          completionCriteria: 'Explain clustered vs non-clustered index tradeoffs.',
        },
      ],
    },
    {
      id: 'stage-5',
      stageNumber: 5,
      title: 'Stage 5: Operating Systems and Computer Networks',
      description:
        'Crucial for campus recruitment tests: Threads, Processes, Deadlocks, TCP/IP, OSI 7-layer model.',
      duration: '2 Weeks',
      tasks: [
        {
          id: 'task-5-1',
          stageId: 'stage-5',
          title: 'Process vs Thread, Context Switching & Concurrency',
          explanation:
            'Explore process memory spaces, IPC (pipes, shared memory), race conditions, Mutex, and Semaphores.',
          category: 'Core CS',
          difficulty: 'Medium',
          estimatedHours: 8,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Memory basics',
          learningResources: [
            {
              name: 'OSTEP: Operating Systems Three Easy Pieces',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
            },
          ],
          practiceExercises:
            'Implement Producer-Consumer problem using thread synchronization primitives.',
          completionCriteria: 'Explain the 4 necessary conditions for deadlock occurrence.',
        },
        {
          id: 'task-5-2',
          stageId: 'stage-5',
          title: 'Computer Networks: TCP vs UDP, 3-Way Handshake & DNS',
          explanation:
            'Deep-dive into what happens when you type google.com into your browser, HTTP/2 vs HTTP/3, and SSL/TLS handshakes.',
          category: 'Core CS',
          difficulty: 'Medium',
          estimatedHours: 8,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'None',
          learningResources: [
            {
              name: 'MDN Web Docs: How the Web Works',
              url: 'https://developer.mozilla.org/',
            },
          ],
          practiceExercises: 'Trace packet route using traceroute and curl with verbose headers.',
          completionCriteria:
            'Step-by-step narration of DNS lookup, ARP, SYN-SYN/ACK-ACK, and TLS.',
        },
      ],
    },
    {
      id: 'stage-6',
      stageNumber: 6,
      title: `Stage 6: ${
        role.includes('AI')
          ? 'Machine Learning & Python'
          : 'Modern Full-Stack & API Architecture'
      }`,
      description:
        'Hands-on architectural foundations tailored directly to your target industry position.',
      duration: '3 Weeks',
      tasks: [
        {
          id: 'task-6-1',
          stageId: 'stage-6',
          title: 'RESTful API Design & Secure Authentication',
          explanation:
            'Design stateless endpoints, HTTP status semantics, JWT tokens, OAuth flows, and input sanitization.',
          category: 'Development',
          difficulty: 'Medium',
          estimatedHours: 12,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'HTTP basics',
          learningResources: [{ name: 'RESTful API Guidelines', url: 'https://restfulapi.net/' }],
          practiceExercises:
            'Create a fully authenticated CRUD API with rate limiting and pagination.',
          completionCriteria:
            'Passes security audit for SQL injection and token expiration checks.',
        },
        {
          id: 'task-6-2',
          stageId: 'stage-6',
          title: 'Frontend State Management & Responsive UI Engineering',
          explanation:
            'Modern React patterns, hooks, optimistic UI updates, error boundaries, and accessible styling with Tailwind.',
          category: 'Development',
          difficulty: 'Medium',
          estimatedHours: 14,
          priority: 'Medium',
          status: 'Not Started',
          prerequisites: 'HTML, CSS, JS',
          learningResources: [{ name: 'React Official Documentation', url: 'https://react.dev' }],
          practiceExercises:
            'Build a performant dashboard with live data filtering and zero layout shift.',
          completionCriteria: 'Lighthouse accessibility and performance scores of 95+.',
        },
      ],
    },
    {
      id: 'stage-7',
      stageNumber: 7,
      title: 'Stage 7: Projects and GitHub Portfolio',
      description:
        'Build 2 flagship, production-grade applications that stand out on any engineering hiring desk.',
      duration: '3 Weeks',
      tasks: [
        {
          id: 'task-7-1',
          stageId: 'stage-7',
          title: 'Flagship Project 1: Distributed Task Queue / Full-Stack SaaS',
          explanation:
            'Build a production-grade system with database persistence, caching, background worker queues, and CI/CD.',
          category: 'Portfolio',
          difficulty: 'Hard',
          estimatedHours: 25,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Stages 4 and 6',
          learningResources: [
            { name: 'GitHub Developer Guides', url: 'https://docs.github.com' },
          ],
          practiceExercises:
            'Deploy on Cloud Run or Vercel with real SSL domain and comprehensive README.',
          completionCriteria:
            'Live URL accessible with automated test suite and architecture diagram in README.',
        },
        {
          id: 'task-7-2',
          stageId: 'stage-7',
          title: 'GitHub Professional Profile & Commit Hygiene',
          explanation:
            'Curate your GitHub pinned repositories, write conventional commit messages, and showcase open source pull requests.',
          category: 'Portfolio',
          difficulty: 'Easy',
          estimatedHours: 6,
          priority: 'Medium',
          status: 'Not Started',
          prerequisites: 'Git basics',
          learningResources: [
            {
              name: 'Conventional Commits Standard',
              url: 'https://www.conventionalcommits.org/',
            },
          ],
          practiceExercises:
            'Setup README.md with live demo badges, architecture flowchart, and performance benchmarks.',
          completionCriteria:
            'A recruiter can understand what the project does within 15 seconds of opening the repo.',
        },
      ],
    },
    {
      id: 'stage-8',
      stageNumber: 8,
      title: 'Stage 8: Resume, Aptitude, and Communication',
      description:
        'Pass the 6-second ATS filter and master quantitative aptitude for placement screening tests.',
      duration: '2 Weeks',
      tasks: [
        {
          id: 'task-8-1',
          stageId: 'stage-8',
          title: 'Single-Page ATS-Compliant Resume Engineering',
          explanation:
            'Formulate bullet points using Google XYZ metric formula; verify parser friendliness with automated tools.',
          category: 'Placement Readiness',
          difficulty: 'Medium',
          estimatedHours: 8,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Completed projects',
          learningResources: [
            {
              name: 'Harvard Resume Guide',
              url: 'https://careerservices.fas.harvard.edu/',
            },
          ],
          practiceExercises:
            'Run resume text through Commit Pro AI Resume Analyzer and resolve all flagged keywords.',
          completionCriteria: 'Achieve ATS score > 85 with 100% quantifiable metrics.',
        },
        {
          id: 'task-8-2',
          stageId: 'stage-8',
          title: 'Quantitative Aptitude & Logical Reasoning Drills',
          explanation:
            'Master Permutations & Combinations, Probability, Speed-Time-Distance, Syllogisms, and Data Interpretation.',
          category: 'Aptitude',
          difficulty: 'Medium',
          estimatedHours: 12,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Basic math',
          learningResources: [
            { name: 'IndiaBIX Aptitude Tests', url: 'https://www.indiabix.com/' },
          ],
          practiceExercises:
            'Complete 3 timed 30-question simulated company placement tests.',
          completionCriteria: 'Score 80%+ on timed speed drills.',
        },
      ],
    },
    {
      id: 'stage-9',
      stageNumber: 9,
      title: 'Stage 9: Technical Interviews & Mock Interviews',
      description:
        'Simulate high-pressure live coding, whiteboard system design, and behavioral STAR interviews.',
      duration: '2 Weeks',
      tasks: [
        {
          id: 'task-9-1',
          stageId: 'stage-9',
          title: 'Peer & AI Mock Technical Coding Sessions',
          explanation:
            'Practice talking aloud while coding, deriving time and space complexities, and dry-running boundary test cases.',
          category: 'Interview Prep',
          difficulty: 'Hard',
          estimatedHours: 14,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Stage 2 DSA',
          learningResources: [{ name: 'Pramp Mock Interviews', url: 'https://www.pramp.com/' }],
          practiceExercises: 'Complete 3 full mock interviews using Commit Pro AI Mentor.',
          completionCriteria:
            'Solve a blind Medium LeetCode problem while explaining thought process continuously.',
        },
        {
          id: 'task-9-2',
          stageId: 'stage-9',
          title: 'Behavioral & Leadership Principles (STAR Technique)',
          explanation:
            'Prepare 5 compelling stories for: conflict resolution, handling failure, leading a team, and fast technical learning.',
          category: 'HR Interview',
          difficulty: 'Medium',
          estimatedHours: 6,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'College project experiences',
          learningResources: [
            {
              name: 'Amazon Leadership Principles Guide',
              url: 'https://www.amazon.jobs/',
            },
          ],
          practiceExercises:
            'Draft STAR answers (Situation, Task, Action, Result) for top 10 HR questions.',
          completionCriteria: 'Narrate answers without hesitation in under 2 minutes each.',
        },
      ],
    },
    {
      id: 'stage-10',
      stageNumber: 10,
      title: 'Stage 10: Placement Applications and Interview Readiness',
      description:
        'Execute strategic application pipeline, referrals, and final campus drive checklist.',
      duration: '2 Weeks',
      tasks: [
        {
          id: 'task-10-1',
          stageId: 'stage-10',
          title: 'Pipeline Organization & Referral Networking',
          explanation:
            'Track 30+ applications across campus portals, LinkedIn, and company career portals; engage alumni for referrals.',
          category: 'Applications',
          difficulty: 'Easy',
          estimatedHours: 10,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'Resume and portfolio',
          learningResources: [
            { name: 'LinkedIn Alumni Search', url: 'https://www.linkedin.com/' },
          ],
          practiceExercises:
            'Populate Commit Pro Application Tracker with 10 target companies and deadlines.',
          completionCriteria:
            'All 10 applications submitted with custom cover notes and verified status.',
        },
        {
          id: 'task-10-2',
          stageId: 'stage-10',
          title: 'Pre-Interview Warmup & Cheat Sheet Review',
          explanation:
            'Conduct quick 1-hour fast reviews of time complexities, SQL syntax, OS concepts, and your top 2 projects.',
          category: 'Interview Prep',
          difficulty: 'Easy',
          estimatedHours: 6,
          priority: 'High',
          status: 'Not Started',
          prerequisites: 'All previous stages',
          learningResources: [{ name: 'Commit Pro Quick CS Cheat Sheets', url: '#' }],
          practiceExercises: 'Review CS fundamentals flashcards in the Interview Hub.',
          completionCriteria: '100% confidence on all core concepts before round 1.',
        },
      ],
    },
  ];
}
