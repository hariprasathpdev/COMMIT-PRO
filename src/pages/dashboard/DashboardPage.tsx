import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge, StatusBadge } from '../../components/ui/UIComponents';
import {
  Compass,
  Flame,
  Target,
  Clock,
  Code2,
  FolderGit2,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Play,
  Award,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Briefcase,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export function DashboardPage() {
  const {
    userProfile,
    roadmap,
    stats,
    dailyTasks,
    toggleDailyTask,
    dsaProblems,
    projects,
    achievements,
    setCurrentView,
    studySessions,
    applications,
  } = useApp();

  // Find current active stage and next recommended task
  let currentStage = roadmap?.stages[0];
  let recommendedTask = currentStage?.tasks[0];

  if (roadmap) {
    for (const stage of roadmap.stages) {
      const incomplete = stage.tasks.find((t) => t.status !== 'Completed');
      if (incomplete) {
        currentStage = stage;
        recommendedTask = incomplete;
        break;
      }
    }
  }

  // Activity contribution map simulation (last 28 days)
  const today = new Date().toISOString().split('T')[0];
  const loggedDates = new Set(studySessions.map((s) => s.date));

  const activityDays = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const dateStr = d.toISOString().split('T')[0];
    const hasActivity = loggedDates.has(dateStr);
    return {
      date: dateStr,
      hasActivity,
      isToday: dateStr === today,
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-900/40 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="indigo" size="sm">
                Target: {userProfile?.targetRole || 'Software Development Engineer'}
              </Badge>
              <Badge variant="purple" size="sm">
                {userProfile?.preferredLanguage || 'Java'} Track
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {userProfile?.fullName || 'Student'}! 👋
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              You are targeting{' '}
              <span className="text-indigo-300 font-semibold">{userProfile?.placementGoal}</span>.
              Keep your momentum going to unlock your next commit.
            </p>
          </div>

          {/* Quick Metrics Trio */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-center min-w-[100px]">
              <div className="text-2xl font-black text-indigo-400 font-mono">
                {stats.daysRemainingToTarget}
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">Days to Target</div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-center min-w-[100px]">
              <div className="text-2xl font-black text-amber-400 font-mono flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-amber-400" />
                {stats.currentStreakDays}d
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">Active Streak</div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-center min-w-[100px]">
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {stats.overallProgressPercent}%
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">Roadmap Velocity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Next Task Callout Card */}
      {recommendedTask && (
        <Card className="border-indigo-600/40 bg-gradient-to-r from-indigo-950/30 via-slate-900 to-indigo-950/20 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">
                    RECOMMENDED NEXT COMMIT • {currentStage?.title}
                  </span>
                  <Badge variant="warning" size="sm">
                    {recommendedTask.difficulty}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">
                  {recommendedTask.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl line-clamp-2">
                  {recommendedTask.explanation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="glow"
                size="sm"
                onClick={() => setCurrentView('roadmap')}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Work on Task
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Today's Planner & DSA Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Study Tasks */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-slate-100 text-sm">Today's Preparation Tasks</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('planner')}
                className="text-indigo-400 hover:text-indigo-300"
              >
                View Full Planner <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {dailyTasks.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl">
                No tasks scheduled for today. Add one from your roadmap or custom planner!
              </div>
            ) : (
              <div className="space-y-2.5">
                {dailyTasks.slice(0, 4).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleDailyTask(task.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                      task.isCompleted
                        ? 'bg-slate-950/40 border-slate-900 text-slate-400'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs transition ${
                          task.isCompleted
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {task.isCompleted && '✓'}
                      </div>
                      <div>
                        <span
                          className={`text-xs font-medium block ${
                            task.isCompleted ? 'line-through text-slate-400' : ''
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{task.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400">
                        {task.estimatedMinutes}m
                      </span>
                      <StatusBadge
                        status={task.isCompleted ? 'Completed' : 'In Progress'}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* DSA Practice Summary */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-slate-100 text-sm">Coding & DSA Solved Progress</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('coding')}
                className="text-indigo-400 hover:text-indigo-300"
              >
                DSA Tracker <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-slate-950/70 border border-emerald-900/40 rounded-xl text-center">
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {dsaProblems.filter((p) => p.difficulty === 'Easy' && p.status === 'Solved').length}/
                  {dsaProblems.filter((p) => p.difficulty === 'Easy').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Easy Solved</div>
              </div>
              <div className="p-3 bg-slate-950/70 border border-amber-900/40 rounded-xl text-center">
                <div className="text-xl font-bold text-amber-400 font-mono">
                  {dsaProblems.filter((p) => p.difficulty === 'Medium' && p.status === 'Solved').length}/
                  {dsaProblems.filter((p) => p.difficulty === 'Medium').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Medium Solved</div>
              </div>
              <div className="p-3 bg-slate-950/70 border border-rose-900/40 rounded-xl text-center">
                <div className="text-xl font-bold text-rose-400 font-mono">
                  {dsaProblems.filter((p) => p.difficulty === 'Hard' && p.status === 'Solved').length}/
                  {dsaProblems.filter((p) => p.difficulty === 'Hard').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Hard Solved</div>
              </div>
            </div>

            {/* Quick preview of problems needing revision */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Flagged for Revision
              </div>
              <div className="space-y-2">
                {dsaProblems
                  .filter((p) => p.needsRevision)
                  .slice(0, 3)
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setCurrentView('coding')}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs hover:border-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="font-medium text-slate-200">{p.title}</span>
                      </div>
                      <Badge
                        variant={p.difficulty === 'Easy' ? 'success' : p.difficulty === 'Medium' ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {p.difficulty}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </Card>

          {/* Activity Heatmap Grid */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-sm">Study Consistency (Last 28 Days)</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Total Logged: {stats.totalStudyHours} hours
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {activityDays.map((d, i) => (
                <div
                  key={i}
                  title={`${d.date}: ${d.hasActivity ? 'Study session logged' : 'Rest day'}`}
                  className={`w-5 h-5 rounded-sm transition-colors ${
                    d.hasActivity
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/20'
                      : 'bg-slate-800/80 hover:bg-slate-700'
                  } ${d.isToday ? 'ring-2 ring-indigo-400' : ''}`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>28 days ago</span>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-slate-800 rounded-sm" /> Inactive
                <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> Active Commit
              </div>
              <span>Today</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Active Projects & Achievements & Quick Applications */}
        <div className="space-y-6">
          {/* Active Projects Widget */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-slate-100 text-sm">Active Portfolio Projects</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('projects')}
                className="text-indigo-400"
              >
                All Projects <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 2).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setCurrentView('projects')}
                  className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl hover:border-slate-700 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-100 truncate max-w-[180px]">
                      {proj.title}
                    </span>
                    <StatusBadge status={proj.status} size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proj.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Placement Application Status Widget */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-slate-100 text-sm">Placement Pipeline</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('applications')}
                className="text-indigo-400"
              >
                Tracker <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="space-y-2">
              {applications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  onClick={() => setCurrentView('applications')}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition text-xs cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-slate-200">{app.companyName}</div>
                    <div className="text-[11px] text-slate-400">{app.nextStep}</div>
                  </div>
                  <StatusBadge status={app.status} size="sm" />
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-slate-100 text-sm">Achievements & Badges</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    ach.isUnlocked
                      ? 'bg-slate-950/80 border-indigo-900/60 text-slate-200'
                      : 'bg-slate-950/30 border-slate-900 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="text-lg mb-1">{ach.isUnlocked ? '🏆' : '🔒'}</div>
                  <div className="text-xs font-semibold truncate">{ach.title}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {ach.isUnlocked ? 'Unlocked' : 'In Progress'}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
