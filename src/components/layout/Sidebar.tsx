import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  Code2,
  Sparkles,
  Layers,
  FolderGit2,
  FileText,
  Briefcase,
  HelpCircle,
  BarChart3,
  Settings,
  Flame,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

interface NavItem {
  id: AppView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar() {
  const { currentView, setCurrentView, stats, userProfile } = useApp();

  const navigation: { section: string; items: NavItem[] }[] = [
    {
      section: 'Core Preparation',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'roadmap', label: '10-Stage Roadmap', icon: Compass, badge: `${stats.overallProgressPercent}%` },
        { id: 'planner', label: 'Daily Planner & Timer', icon: CalendarCheck },
        { id: 'coding', label: 'DSA & Coding Practice', icon: Code2, badge: `${stats.dsaSolvedCount}/${stats.dsaTotalCount}` },
      ],
    },
    {
      section: 'Growth & Intelligence',
      items: [
        { id: 'mentor', label: 'AI Career Mentor', icon: Sparkles, badge: 'Gemini' },
        { id: 'skills', label: 'Skills & Resources', icon: Layers },
        { id: 'projects', label: 'Project Portfolio', icon: FolderGit2 },
        { id: 'interviews', label: 'Interview Hub', icon: HelpCircle },
      ],
    },
    {
      section: 'Placement & Applications',
      items: [
        { id: 'resume', label: 'Resume & ATS Review', icon: FileText },
        { id: 'applications', label: 'Job Applications', icon: Briefcase, badge: `${stats.activeApplicationsCount}` },
        { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
        { id: 'settings', label: 'Settings & Profile', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-slate-950/70 min-h-[calc(100vh-4rem)] flex flex-col justify-between hidden md:flex">
      <div className="p-4 space-y-6">
        {/* Role Target Quick Banner */}
        <div className="bg-gradient-to-br from-indigo-950/50 via-slate-900 to-violet-950/40 border border-indigo-900/40 rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-300 mb-1">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              {userProfile?.academicYear || '3rd Year'}
            </span>
            <span className="text-amber-400 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-amber-400" />
              {stats.currentStreakDays}d streak
            </span>
          </div>
          <div className="text-sm font-bold text-slate-100 truncate">
            {userProfile?.targetRole || 'Software Engineer'}
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Target: {stats.daysRemainingToTarget} days left</span>
            <span className="text-indigo-400 font-mono font-medium">{stats.overallProgressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-5">
          {navigation.map((group) => (
            <div key={group.section} className="space-y-1">
              <h4 className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.section}
              </h4>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
                        isActive
                          ? 'bg-indigo-600/15 text-indigo-300 font-semibold border border-indigo-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-indigo-400'
                              : 'text-slate-400 group-hover:text-slate-300'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                            item.badge === 'Gemini'
                              ? 'bg-violet-950 text-violet-300 border border-violet-800/50'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer info in sidebar */}
      <div className="p-4 border-t border-slate-900 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Commit Pro v2.4</span>
        <button
          onClick={() => setCurrentView('settings')}
          className="hover:text-slate-300 flex items-center gap-1"
        >
          Profile <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
