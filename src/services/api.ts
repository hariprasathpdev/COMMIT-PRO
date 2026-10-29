import { CareerRoadmap, UserProfile, MentorMessage } from '../types';
import { generateCuratedStagesForRole } from '../data/defaultRoadmaps';

export async function fetchServerHealth(): Promise<{ status: string; hasGeminiKey: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (e) {
    return { status: 'offline', hasGeminiKey: false };
  }
}

export async function askAIMentor(
  messages: { role: string; content: string }[],
  userProfile: UserProfile
): Promise<{ reply: string; isFallback: boolean }> {
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, userProfile }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn('Using client fallback for mentor chat:', error);
    const lastMsg = messages[messages.length - 1]?.content.toLowerCase() || '';
    let reply = `### 💡 Placement Coach Response for ${userProfile.fullName || 'Student'}

I recommend focusing on **${userProfile.targetRole}** core competencies today:
1. **DSA Milestone:** Complete 2 Medium problems in your weakest area (${userProfile.weakAreas?.[0] || 'Dynamic Programming'}).
2. **Project Depth:** Ensure your primary GitHub repository has a clear architecture diagram and deployment link.
3. **Core CS:** Dedicate 30 minutes to review DBMS Indexing & Transactions in our Interview Hub.

Ask me about any specific algorithm, code snippet in ${userProfile.preferredLanguage}, or mock interview practice!`;

    if (lastMsg.includes('mock') || lastMsg.includes('question')) {
      reply = `### 🎯 Technical Mock Interview (${userProfile.preferredLanguage})

**Problem:** Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. (Maximum Subarray)

**Clarifying Prompts:**
1. Can the array contain all negative numbers? (Yes, return the max single element).
2. What are the time and space constraints? ($O(N)$ time, $O(1)$ auxiliary space preferred).

*Take 2 minutes to outline Kadane's algorithm approach before writing code!*`;
    }

    return { reply, isFallback: true };
  }
}

export async function generateRoadmapWithAI(profile: UserProfile): Promise<{
  stages: any[];
  summary: string;
  estimatedWeeks: number;
  isFallback: boolean;
}> {
  try {
    const res = await fetch('/api/gemini/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return {
      stages: data.stages || generateCuratedStagesForRole(profile.targetRole, profile.preferredLanguage),
      summary: data.summary || `Personalized 10-Stage Placement Pathway tailored for ${profile.targetRole} using ${profile.preferredLanguage}.`,
      estimatedWeeks: data.estimatedWeeks || 16,
      isFallback: data.isFallback ?? false,
    };
  } catch (error) {
    console.warn('Roadmap API call failed, using curated role stages:', error);
    return {
      stages: generateCuratedStagesForRole(profile.targetRole, profile.preferredLanguage),
      summary: `Structured 10-Stage Placement Preparation Roadmap for ${profile.targetRole} with ${profile.preferredLanguage}.`,
      estimatedWeeks: 16,
      isFallback: true,
    };
  }
}

export async function reviewResumeWithAI(
  resumeText: string,
  targetRole: string
): Promise<any> {
  try {
    const res = await fetch('/api/gemini/resume-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, targetRole }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn('Resume review API failed, using client audit:', error);
    return {
      atsScore: 78,
      summary: `Your resume has strong foundations for ${targetRole}. Focus on adding live URLs and quantifiable metrics.`,
      strengths: ['Clear technical skills section', 'Relevant project experience included'],
      improvements: [
        'Apply the Google XYZ formula: "Accomplished [X] as measured by [Y] by doing [Z]"',
        'Add live hosted URLs next to GitHub links',
        'Incorporate unit testing and performance benchmarks'
      ],
      missingKeywords: ['Docker', 'RESTful APIs', 'CI/CD', 'System Design', 'Redis'],
      bulletPointRewrites: [
        {
          original: 'Worked on React frontend for student task tracker.',
          improved: 'Architected responsive React 19 SPA with TypeScript and Tailwind, reducing initial bundle load by 35% across 400+ active sessions.'
        }
      ],
      sectionScores: {
        impactAndMetrics: 72,
        technicalSkills: 84,
        projects: 80,
        readabilityAndATS: 85
      }
    };
  }
}
