import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button, Card, Badge } from '../../components/ui/UIComponents';
import {
  Compass,
  Code2,
  FolderGit2,
  HelpCircle,
  Sparkles,
  Flame,
  CheckCircle2,
  ArrowRight,
  Target,
  ChevronDown,
  Terminal,
  Zap,
  Calendar,
  Layers,
  Award,
  BookOpen,
  FileCheck,
} from 'lucide-react';

export function LandingPage() {
  const { setCurrentView, demoLogin } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeRoleTab, setActiveRoleTab] = useState<'sde' | 'fullstack' | 'aiml' | 'analyst'>('sde');

  const faqs = [
    {
      q: 'How does Commit Pro generate my personalized preparation roadmap?',
      a: 'Commit Pro analyzes your target role, target placement date, daily preparation hours, current coding proficiency, and weak areas. Using Google Gemini AI, it structures a rigorous 10-stage milestone path calibrated specifically to your timeline and academic calendar.',
    },
    {
      q: 'Can I change my target role or regenerate my roadmap later without losing progress?',
      a: 'Yes! You can edit any parameter in your profile at any time. When you regenerate your roadmap, Commit Pro retains all previously completed tasks, problem logs, and study sessions while dynamically recalibrating upcoming milestones.',
    },
    {
      q: 'Is Commit Pro only for Software Development Engineers (SDE)?',
      a: 'Not at all. Commit Pro supports full roadmaps and dedicated skill tracks for Full-Stack Developers, Frontend Developers, Backend Engineers, AI/ML Engineers, and Data Analysts.',
    },
    {
      q: 'How does the Gemini AI Career Mentor work?',
      a: 'The Career Mentor is available 24/7 inside your workspace. It reviews your code, explains tricky algorithms with intuitive step-by-step breakdowns, formats your resume bullets using the Google XYZ formula, and conducts simulated technical and behavioral mock interviews.',
    },
    {
      q: 'Do I need to pay or provide an API key to get started?',
      a: 'No! Commit Pro provides immediate access to all core modules with intelligent local mock fallbacks and curated placement problem sets, plus built-in AI capabilities when connected to Gemini.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-slate-800/60">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-300 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>Built for College Students Targeting 2026–2027 Placements</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Stop Preparing Randomly.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Start Building Your Career.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Commit Pro transforms scattered YouTube playlists and random LeetCode grinding into a structured 10-stage roadmap with daily tasks, DSA tracking, portfolio projects, and AI mentorship.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="glow"
              size="lg"
              onClick={() => setCurrentView('auth')}
              className="w-full sm:w-auto"
            >
              Build My Roadmap
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={demoLogin}
              className="w-full sm:w-auto border-slate-700 hover:border-slate-600 text-slate-200"
            >
              <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
              Explore Live Demo
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              10-Stage Placement Path
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Integrated DSA Tracker
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Gemini AI Career Mentor
            </span>
          </div>

          {/* Interactive Product Preview Card */}
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden text-left backdrop-blur-xl">
            {/* Window bar */}
            <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  commit-pro / student-workspace / roadmap-preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="indigo" size="sm">
                  Active Sprint
                </Badge>
                <span className="text-xs text-slate-400 font-mono">Stage 2 of 10</span>
              </div>
            </div>

            {/* Preview Content Inside Mockup */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/50">
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Current Milestone
                </div>
                <div className="bg-slate-950/70 border border-indigo-900/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-400">STAGE 2: DSA</span>
                    <span className="text-[11px] text-slate-400">4 Weeks</span>
                  </div>
                  <h4 className="font-semibold text-sm text-slate-100">
                    Two Pointers & Sliding Window Patterns
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Master non-contiguous arrays, prefix sums, and O(N) window optimizations.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-mono font-medium">3/5 Tasks Done</span>
                    <Badge variant="success" size="sm">
                      On Track
                    </Badge>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Today's Focus:</div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>Solve Minimum Window Substring</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Review B-Tree Indexing in DBMS</span>
                  </div>
                </div>
              </div>

              {/* Middle column: DSA tracker preview */}
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  DSA Problem Tracker
                </div>
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">Two Sum</span>
                    <span className="text-emerald-400 text-[11px] font-mono">Solved</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">Valid Anagram</span>
                    <span className="text-emerald-400 text-[11px] font-mono">Solved</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">Container With Water</span>
                    <span className="text-amber-400 text-[11px] font-mono">Attempted</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">3Sum</span>
                    <span className="text-slate-400 text-[11px] font-mono">Review</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                    <div className="bg-emerald-500 h-1.5 rounded-full w-3/4" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Topic: Two Pointers</span>
                    <span>75% Mastered</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-violet-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    AI Mentor Feedback
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "Your time complexity on sliding window is optimal O(N). Remember to check edge cases with single character inputs before hitting submit."
                  </p>
                </div>
              </div>

              {/* Right column: Target Countdown & Stats */}
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Placement Countdown
                </div>
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-indigo-400 font-mono">45</div>
                  <div className="text-xs text-slate-400 mt-1">Days to Campus Placement Drive</div>
                  <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="font-bold text-slate-200">3.5 hrs</div>
                      <div className="text-[10px] text-slate-400">Daily Target</div>
                    </div>
                    <div>
                      <div className="font-bold text-amber-400">7 Days</div>
                      <div className="text-[10px] text-slate-400">Study Streak</div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={demoLogin}
                  className="w-full justify-center"
                >
                  Launch Interactive Workspace
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Explanation */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            HOW COMMIT PRO WORKS
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white">
            From Day 1 to Offer Letter in 3 Clear Steps
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Card className="relative overflow-hidden group hover:border-indigo-500/40">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-400 font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-100">Set Your Placement Goal</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Input your target engineering role, graduation year, target companies, available daily preparation hours, and current strengths.
              </p>
            </Card>

            <Card className="relative overflow-hidden group hover:border-indigo-500/40">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-400 font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-100">Follow Your 10-Stage Roadmap</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Receive an actionable, week-by-week sequence from programming fundamentals and DSA to core CS, flagship projects, and mock interviews.
              </p>
            </Card>

            <Card className="relative overflow-hidden group hover:border-indigo-500/40">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-400 font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-100">Track Progress & Commit Daily</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Log study hours, track solved DSA questions, review resume ATS scores, and get instant guidance from your Gemini AI Career Mentor.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Role Roadmaps Showcase */}
      <section id="roadmaps" className="py-20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              TAILORED CAREER TRACKS
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white">
              Role-Specific Preparation That Recruiters Value
            </p>
            <p className="mt-3 text-slate-400 text-sm">
              Don't study generic material. Each roadmap aligns with the exact tech stack, problem sets, and system expectations for your target role.
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {[
              { id: 'sde', label: 'Software Development Engineer (SDE)' },
              { id: 'fullstack', label: 'Full-Stack Developer' },
              { id: 'aiml', label: 'AI/ML Engineer' },
              { id: 'analyst', label: 'Data Analyst & Backend' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRoleTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeRoleTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Role Roadmap Details Card */}
          <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
            {activeRoleTab === 'sde' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 1</div>
                  <h4 className="font-bold text-slate-100 mt-1">Core Java / C++ & DSA</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Arrays, Two Pointers, Trees, Graphs, DP, and time complexity derivation.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 2</div>
                  <h4 className="font-bold text-slate-100 mt-1">Core Computer Science</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    DBMS indexing & transactions, OS concurrency & paging, Computer Networks.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 3</div>
                  <h4 className="font-bold text-slate-100 mt-1">Systems & Low-Level Design</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    SOLID principles, Gang of Four design patterns, multi-threaded caching.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-700/40">
                  <div className="text-xs font-bold text-emerald-400">PHASE 4</div>
                  <h4 className="font-bold text-slate-100 mt-1">Interview Readiness</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    OA speed drills, technical mock interviews, and STAR behavioral answers.
                  </p>
                </div>
              </div>
            )}

            {activeRoleTab === 'fullstack' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 1</div>
                  <h4 className="font-bold text-slate-100 mt-1">Modern Frontend</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    React 19, TypeScript, Tailwind, hooks, state management, and performance.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 2</div>
                  <h4 className="font-bold text-slate-100 mt-1">Backend & API Systems</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Node.js/Express, RESTful standards, JWT authentication, and rate limiting.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 3</div>
                  <h4 className="font-bold text-slate-100 mt-1">Databases & Caching</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    PostgreSQL schemas, indexing, Redis caching, and async job queues.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-700/40">
                  <div className="text-xs font-bold text-emerald-400">PHASE 4</div>
                  <h4 className="font-bold text-slate-100 mt-1">Deployment & CI/CD</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Docker containers, Cloud Run / Vercel hosting, custom domain SSL, GitHub Actions.
                  </p>
                </div>
              </div>
            )}

            {activeRoleTab === 'aiml' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 1</div>
                  <h4 className="font-bold text-slate-100 mt-1">Python & Mathematics</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    NumPy, Pandas, Linear Algebra, Multivariable Calculus, and Probability.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 2</div>
                  <h4 className="font-bold text-slate-100 mt-1">Machine Learning Core</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Supervised & unsupervised learning, Scikit-Learn, regression, trees, clustering.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 3</div>
                  <h4 className="font-bold text-slate-100 mt-1">Deep Learning & LLMs</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    PyTorch neural networks, Transformer architectures, embeddings, and Gemini API.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-700/40">
                  <div className="text-xs font-bold text-emerald-400">PHASE 4</div>
                  <h4 className="font-bold text-slate-100 mt-1">MLOps & API Serving</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    FastAPI model serving, latency optimization, Dockerization, and cloud deployment.
                  </p>
                </div>
              </div>
            )}

            {activeRoleTab === 'analyst' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 1</div>
                  <h4 className="font-bold text-slate-100 mt-1">Advanced SQL & Warehousing</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Window functions, CTEs, self-joins, query optimization, and schema modeling.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 2</div>
                  <h4 className="font-bold text-slate-100 mt-1">Python Data Analytics</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Data wrangling with Pandas, statistical testing, and visualization with Seaborn.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400">PHASE 3</div>
                  <h4 className="font-bold text-slate-100 mt-1">BI & Executive Reporting</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Interactive dashboards, business metrics (CAC, LTV, churn), and story generation.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-700/40">
                  <div className="text-xs font-bold text-emerald-400">PHASE 4</div>
                  <h4 className="font-bold text-slate-100 mt-1">Case Studies & Drills</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Product sense questions, A/B testing methodology, and case interviews.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Deep Dive Grid */}
      <section id="features" className="py-20 border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              ALL-IN-ONE PLACEMENT SUITE
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white">
              Everything Needed to Land Top Campus Offers
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hoverEffect className="group">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/40 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">AI-Generated 10-Stage Roadmap</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Structured stages spanning Programming Fundamentals, DSA, OOP, DBMS, OS, Networks, Web Architecture, Projects, Resume, and Mock Interviews.
              </p>
            </Card>

            <Card hoverEffect className="group">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/40 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Curated DSA Practice Tracker</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Topic-by-topic problems with direct LeetCode links, solution notes, pattern tags, and an in-browser code editor with sample test cases.
              </p>
            </Card>

            <Card hoverEffect className="group">
              <div className="w-10 h-10 rounded-xl bg-violet-950 border border-violet-700/40 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Gemini AI Career Mentor</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Instant algorithm coaching, STAR-method interview roleplay, resume bullet rewrites, and personalized daily encouragement.
              </p>
            </Card>

            <Card hoverEffect className="group">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/40 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Portfolio Project Tracker</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Track full-stack applications with milestones, GitHub URLs, live deployment badges, and recruiter-focused bullet highlights.
              </p>
            </Card>

            <Card hoverEffect className="group">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/40 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">ATS Resume Reviewer</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Analyze your resume against standard ATS parsers; detect missing keywords and rewrite passive phrases using the Google XYZ formula.
              </p>
            </Card>

            <Card hoverEffect className="group">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700/40 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Core CS Interview Bank</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                High-yield interview flashcards covering Java internals, DBMS ACID properties, OS paging/deadlocks, and networking handshakes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Weekly Preparation Plan */}
      <section id="plan" className="py-20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              SAMPLE STUDY SCHEDULE
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white">
              What A High-Impact Week Looks Like
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Balanced 3.5 hours/day structured to prevent burnout while ensuring consistent placement velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="border-indigo-900/30">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-400 mb-2">
                <span>MONDAY</span>
                <span className="font-mono text-slate-400">3.5 hrs</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">DSA: Sliding Window</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li>• Solve 2 Medium LeetCode problems</li>
                <li>• Record state transitions in notes</li>
                <li>• 45m Pomodoro study session</li>
              </ul>
            </Card>

            <Card className="border-indigo-900/30">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-400 mb-2">
                <span>TUESDAY</span>
                <span className="font-mono text-slate-400">3.5 hrs</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">DBMS & SQL Queries</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li>• Practice window functions in SQL</li>
                <li>• Deep dive into B-Tree indexing</li>
                <li>• Test execution plans (EXPLAIN)</li>
              </ul>
            </Card>

            <Card className="border-indigo-900/30">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-400 mb-2">
                <span>WEDNESDAY</span>
                <span className="font-mono text-slate-400">3.5 hrs</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">Portfolio Project</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li>• Build RESTful backend endpoint</li>
                <li>• Implement JWT auth middleware</li>
                <li>• Commit code with conventional tags</li>
              </ul>
            </Card>

            <Card className="border-indigo-900/30">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-400 mb-2">
                <span>THURSDAY</span>
                <span className="font-mono text-slate-400">3.5 hrs</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">Operating Systems & Net</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li>• Process vs Thread context switch</li>
                <li>• TCP 3-way handshake trace</li>
                <li>• 5 flashcards review in Hub</li>
              </ul>
            </Card>

            <Card className="border-indigo-900/30 bg-indigo-950/20">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-2">
                <span>FRIDAY</span>
                <span className="font-mono text-slate-400">3.0 hrs</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">Mock & Weekly Review</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li>• 1 AI Mock Interview with Gemini</li>
                <li>• Review missed problems</li>
                <li>• Set goals for next week</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white">
              Everything You Need to Know
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-semibold text-slate-100 hover:text-indigo-300 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ready to Commit to Your Dream Placement?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Take the 2-minute onboarding questionnaire now to generate your personalized 10-stage preparation roadmap.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="glow"
              size="lg"
              onClick={() => setCurrentView('auth')}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={demoLogin}
            >
              Explore Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <span className="font-bold text-xs">C</span>
            </div>
            <span className="font-bold text-slate-200 text-sm">Commit Pro</span>
            <span className="text-slate-400">| “Your Career. Your Roadmap. Your Next Commit.”</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-slate-200 transition">Features</a>
            <a href="#roadmaps" className="hover:text-slate-200 transition">Roadmaps</a>
            <a href="#faq" className="hover:text-slate-200 transition">FAQ</a>
            <button onClick={() => setCurrentView('settings')} className="hover:text-slate-200 transition">Docs & Setup</button>
          </div>

          <div className="text-slate-400">
            © {new Date().getFullYear()} Commit Pro. Built for university placement excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
