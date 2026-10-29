import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { generateCuratedStagesForRole } from './src/data/defaultRoadmaps.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// AI Career Mentor endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!ai) {
      return res.json({
        reply: generateMentorFallbackResponse(messages[messages.length - 1]?.content || '', userProfile),
        isFallback: true,
      });
    }

    const systemPrompt = `You are the Commit Pro AI Career Mentor, an expert senior tech recruiter, lead software engineer, and campus placement mentor.
Your mentee is a college student preparing for internships and campus placements.
Student Profile:
- Name: ${userProfile?.fullName || 'Student'}
- Target Role: ${userProfile?.targetRole || 'Software Development Engineer'}
- Target Company / Dream Tier: ${userProfile?.targetCompanies || 'Top Tech & Product Companies'}
- Current Year / Grad Year: ${userProfile?.academicYear || '3rd Year'} (${userProfile?.gradYear || '2026'})
- Preferred Language: ${userProfile?.preferredLanguage || 'Java'}
- Skill Level: ${userProfile?.skillLevel || 'Intermediate'}
- Daily Study Time: ${userProfile?.dailyHours || '3'} hours/day
- Target Placement Date: ${userProfile?.targetDate || 'Upcoming Campus Season'}

Your mentoring style:
1. Pragmatic, encouraging, highly structured, and actionable.
2. Provide concrete code snippets, time-tested DSA strategies (e.g. sliding window, two pointers, BFS/DFS, DP state formulation), system design trade-offs, and STAR-method behavioral interview coaching.
3. Keep answers punchy with bullet points and bold highlights. Avoid long fluff.
4. Ground advice in real hiring standards (OA round test cases, edge cases, time/space complexities).`;

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm ready to help you plan your next placement milestone. What topic shall we tackle?";
    return res.json({ reply, isFallback: false });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    return res.json({
      reply: generateMentorFallbackResponse(req.body?.messages?.slice(-1)[0]?.content || '', req.body?.userProfile),
      isFallback: true,
      note: 'Operating in smart offline mentor mode.',
    });
  }
});

// AI Roadmap Generation endpoint
app.post('/api/gemini/roadmap', async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile) {
      return res.status(400).json({ error: 'User profile is required.' });
    }

    if (!ai) {
      return res.json({
        stages: generateCuratedStagesForRole(profile.targetRole, profile.preferredLanguage),
        isFallback: true,
      });
    }

    const prompt = `Generate a personalized, rigorous 10-stage placement roadmap for a college student with the following profile:
Role: ${profile.targetRole || 'Software Development Engineer'}
Primary Language: ${profile.preferredLanguage || 'Java'}
Level: ${profile.skillLevel || 'Intermediate'}
Daily Hours: ${profile.dailyHours || 3}
Target Placement Date: ${profile.targetDate || '6 months'}
Weak Areas: ${profile.weakAreas?.join(', ') || 'DSA, System Design'}
Goals: ${profile.placementGoal || 'Campus Placements'}

Return a valid JSON object with the exact structure:
{
  "summary": "Brief encouraging summary of this tailored path",
  "estimatedWeeks": 16,
  "stages": [
    {
      "id": "stage-1",
      "stageNumber": 1,
      "title": "Stage 1: Programming Fundamentals",
      "description": "Master syntax, memory, collections and debugging",
      "duration": "2 weeks",
      "tasks": [
        {
          "id": "task-1-1",
          "title": "Core Syntax & Memory Model",
          "explanation": "Deep dive into types, references, stack vs heap, and basic I/O",
          "category": "Fundamentals",
          "difficulty": "Easy",
          "estimatedHours": 10,
          "priority": "High",
          "prerequisites": "None",
          "learningResources": [
            { "name": "Official Docs", "url": "https://dev.java" }
          ],
          "practiceExercises": "Solve 5 basic I/O and flow control problems",
          "completionCriteria": "Explain pass-by-value vs pass-by-reference without hesitation"
        }
      ]
    }
  ]
}

Ensure all 10 stages are included:
1. Programming Fundamentals
2. Data Structures and Algorithms
3. Object-Oriented Programming and Core Computer Science
4. SQL and Database Fundamentals
5. Operating Systems and Computer Networks
6. Specialization / Web Dev / Role Tech Stack
7. Projects and GitHub Portfolio
8. Resume, Aptitude, and Communication
9. Technical Interviews and Mock Interviews
10. Placement Applications and Interview Readiness
Each stage must have 3 to 5 realistic, high-impact tasks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.stages && Array.isArray(parsed.stages)) {
      return res.json({
        summary: parsed.summary,
        estimatedWeeks: parsed.estimatedWeeks,
        stages: parsed.stages,
        isFallback: false,
      });
    }

    return res.json({
      stages: generateCuratedStagesForRole(profile.targetRole, profile.preferredLanguage),
      isFallback: true,
    });
  } catch (error: any) {
    console.error('Error generating roadmap:', error);
    return res.json({
      stages: generateCuratedStagesForRole(req.body?.profile?.targetRole, req.body?.profile?.preferredLanguage),
      isFallback: true,
    });
  }
});

// AI Resume Review endpoint
app.post('/api/gemini/resume-review', async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required.' });
    }

    if (!ai) {
      return res.json(generateLocalResumeAudit(resumeText, targetRole));
    }

    const prompt = `You are a Principal Tech Recruiter and ATS algorithm expert reviewing a college student's resume targeting "${targetRole || 'Software Development Engineer'}".
Resume Content:
"""
${resumeText.slice(0, 5000)}
"""

Evaluate and return a valid JSON object matching:
{
  "atsScore": 78,
  "summary": "Overall assessment in 2 sentences",
  "strengths": ["Clear technical stack", "Quantified user impact in project 1"],
  "improvements": ["Use active verbs like Architected instead of Worked on", "Add test coverage metrics"],
  "missingKeywords": ["Docker", "Redis", "Unit Testing", "RESTful API design"],
  "bulletPointRewrites": [
    {
      "original": "Worked on backend using Node.js to create user login",
      "improved": "Engineered secure JWT-based authentication microservice using Node.js/Express, reducing token validation latency by 35%"
    }
  ],
  "sectionScores": {
    "impactAndMetrics": 75,
    "technicalSkills": 85,
    "projects": 80,
    "readabilityAndATS": 82
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in resume audit:', error);
    return res.json(generateLocalResumeAudit(req.body?.resumeText || '', req.body?.targetRole));
  }
});

// Fallback logic for mentor
function generateMentorFallbackResponse(question: string, profile: any): string {
  const q = question.toLowerCase();
  const lang = profile?.preferredLanguage || 'Java';
  const role = profile?.targetRole || 'Software Engineer';

  if (q.includes('dp') || q.includes('dynamic programming')) {
    return `### 💡 Dynamic Programming Mastery Blueprint

Dynamic programming boils down to **Optimal Substructure** and **Overlapping Subproblems**.

1. **The 5-Step Framework:**
   - **State Definition:** What does \`dp[i]\` or \`dp[i][j]\` mean in plain English? (e.g., maximum profit using first \`i\` items with capacity \`w\`).
   - **Base Cases:** Smallest subproblem (\`dp[0] = 0\`).
   - **Transition Formula:** Express the current decision based on prior states (Pick vs Don't Pick).
   - **Computation Order:** Bottom-up (iterative) or Top-down (memoization with recursion).
   - **Location of Answer:** e.g., \`dp[N]\` or \`max(dp)\`.

2. **Key Placement Problem Archetypes:**
   - **0/1 Knapsack & Unbounded Knapsack** (Coin Change, Partition Equal Subset)
   - **Longest Common Subsequence (LCS)** & Edit Distance
   - **Longest Increasing Subsequence (LIS)** in $O(N \\log N)$ using Binary Search
   - **Interval DP & Grid Paths**

*Recommendation for ${role}: Solve 3 problems from the DSA module under Dynamic Programming today.*`;
  }

  if (q.includes('resume') || q.includes('bullet') || q.includes('ats')) {
    return `### 📄 High-Impact Resume Formula: Google XYZ Framework

When college recruiters scan hundreds of resumes in 6 seconds, format every single project bullet point like this:

> **"Accomplished [X], as measured by [Y], by doing [Z]"**

**Example Bad:**
❌ *“Created a movie recommendation system using Python and Machine Learning.”*

**Example Outstanding:**
✅ *“Architected collaborative filtering recommendation engine using Python and Scikit-Learn; processed 50,000+ ratings to achieve 92% precision score with sub-120ms inference time.”*

**Key Placement Checklist:**
- Keep it to 1 single clean page (no multi-column tables that break ATS).
- Put your GitHub & Live Demo links prominently at the top.
- Include 2-3 deep, deployed projects instead of 10 trivial clones.`;
  }

  if (q.includes('interview') || q.includes('mock') || q.includes('question')) {
    return `### 🎯 Mock Interview Question: ${lang} & Data Structures

**Problem:** Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

**What Interviewers Look For:**
1. **Clarifying Questions:** Ask about duplicates, negative numbers, empty arrays, and memory constraints.
2. **Brute Force:** $O(N^2)$ nested loops — state it briefly so they know you see it.
3. **Optimized Solution:** Use a Hash Map for an $O(N)$ time and $O(N)$ space one-pass lookup.
4. **Clean Code & Edge Cases:** No unhandled nulls or out-of-bounds indices.

Try explaining your line-of-thought before writing code! Would you like to practice tracing it?`;
  }

  return `### 🚀 Action Plan for ${profile?.fullName || 'Colleague'} (${role})

Based on your target preparation plan:
- **Daily Focus:** 1 LeetCode medium problem + 1 core Computer Science topic (DBMS/OS) + 45 minutes on your main portfolio project.
- **Immediate Milestone:** Review your **DSA Tracker** and ensure you have completed at least 2 sliding-window and 2 two-pointer problems.
- **Tip for Campus Drives:** Most online assessment rounds test pure data structure fundamentals with strict time constraints. Focus on clean complexity analysis ($O(N)$ vs $O(N^2)$).

Feel free to ask me to explain any concept, write sample code in **${lang}**, or review a project architecture!`;
}


function generateLocalResumeAudit(resumeText: string, targetRole: string = 'Software Engineer') {
  const text = resumeText.toLowerCase();
  const hasMetrics = /\b(\d+[%kKmM]?|\$\d+)\b/.test(resumeText);
  const hasGithub = text.includes('github') || text.includes('gitlab');
  const hasProjects = text.includes('project') || text.includes('built') || text.includes('developed');
  const hasSkills = text.includes('skills') || text.includes('languages') || text.includes('technologies');

  let score = 65;
  if (hasMetrics) score += 12;
  if (hasGithub) score += 8;
  if (hasProjects) score += 8;
  if (hasSkills) score += 7;

  return {
    atsScore: Math.min(score, 94),
    summary: `Resume shows solid foundations for ${targetRole}. Adding more quantified metrics and deployment links will boost recruiter callback rates significantly.`,
    strengths: [
      hasGithub ? 'Includes version control / GitHub profile links' : 'Clear structure and sections',
      hasSkills ? 'Dedicated technical skills breakdown' : 'Relevant academic coursework listed',
      hasProjects ? 'Detailed project experience highlighted' : 'Clear educational history'
    ],
    improvements: [
      'Quantify results using the Google XYZ formula (e.g. "Reduced query latency by 40%")',
      'Ensure standard section headers (Education, Technical Skills, Projects, Experience)',
      'Add live demo URLs alongside GitHub repository links'
    ],
    missingKeywords: [
      'Docker / Containerization',
      'System Design',
      'Unit Testing / CI/CD',
      'Performance Optimization',
      'Cloud Deployment (AWS/GCP)'
    ],
    bulletPointRewrites: [
      {
        original: 'Built a web application for user tasks and notes.',
        improved: 'Architected full-stack task management platform with responsive React frontend and RESTful Express backend, supporting 500+ active entries with sub-50ms query times.'
      },
      {
        original: 'Solved DSA problems on LeetCode.',
        improved: 'Solved 250+ algorithmic data structure problems across LeetCode & GeeksforGeeks, maintaining a 45-day continuous problem-solving streak.'
      }
    ],
    sectionScores: {
      impactAndMetrics: hasMetrics ? 85 : 55,
      technicalSkills: hasSkills ? 88 : 70,
      projects: hasProjects ? 84 : 65,
      readabilityAndATS: 88
    }
  };
}

// Development vs Production serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Commit Pro server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
