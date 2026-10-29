import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button, Badge } from '../ui/UIComponents';
import {
  GitCommit,
  Flame,
  Target,
  Sparkles,
  Menu,
  X,
  Compass,
  BookOpen,
  Code2,
  Briefcase,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export function Navbar() {
  const {
    currentView,
    setCurrentView,
    isAuthenticated,
    userProfile,
    stats,
    demoLogin,
    logout,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => setCurrentView(isAuthenticated ? 'dashboard' : 'landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <GitCommit className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Commit Pro
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-800/50">
                Placement OS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Your Career. Your Roadmap. Your Next Commit.
            </p>
          </div>
        </div>

        {/* Desktop Nav for Unauthenticated / Landing */}
        {!isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => setCurrentView('landing')}
              className={`hover:text-white transition ${
                currentView === 'landing' ? 'text-indigo-400' : ''
              }`}
            >
              Overview
            </button>
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#roadmaps" className="hover:text-white transition">
              Role Roadmaps
            </a>
            <a href="#plan" className="hover:text-white transition">
              Weekly Plan
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
          </nav>
        ) : (
          /* Quick Status for Authenticated User */
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
              <span className="text-slate-400">Target:</span>
              <span className="font-semibold text-slate-100">{userProfile?.targetRole}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-800/50 rounded-lg px-3 py-1.5 text-xs font-semibold text-amber-300">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{stats.currentStreakDays} Day Streak</span>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-950/40 border border-indigo-800/50 rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-300">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>{stats.overallProgressPercent}% Completed</span>
            </div>
          </div>
        )}

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={demoLogin}
                className="hidden md:inline-flex border-indigo-700/60 text-indigo-300 hover:bg-indigo-950/40"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Live Demo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('auth')}
              >
                Sign In
              </Button>
              <Button
                variant="glow"
                size="sm"
                onClick={() => setCurrentView('auth')}
              >
                Get Started
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('mentor')}
                className="border-violet-700/50 text-violet-300 hover:bg-violet-950/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                AI Mentor
              </Button>
              <div
                onClick={() => setCurrentView('settings')}
                className="flex items-center gap-2 cursor-pointer bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg p-1.5 pr-3 transition"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                  {userProfile?.fullName?.charAt(0) || 'U'}
                </div>
                <span className="text-xs font-medium text-slate-200 truncate max-w-[100px]">
                  {userProfile?.fullName || 'Student'}
                </span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-900 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-3 animate-in slide-in-from-top duration-200">
          {!isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Button
                variant="glow"
                size="md"
                onClick={() => {
                  setCurrentView('auth');
                  setMobileMenuOpen(false);
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  demoLogin();
                  setMobileMenuOpen(false);
                }}
              >
                Explore Demo Mode
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  setCurrentView('auth');
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-left bg-slate-900 rounded border border-slate-800 text-slate-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentView('roadmap');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-left bg-slate-900 rounded border border-slate-800 text-slate-200"
              >
                Career Roadmap
              </button>
              <button
                onClick={() => {
                  setCurrentView('planner');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-left bg-slate-900 rounded border border-slate-800 text-slate-200"
              >
                Daily Planner
              </button>
              <button
                onClick={() => {
                  setCurrentView('coding');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-left bg-slate-900 rounded border border-slate-800 text-slate-200"
              >
                DSA Practice
              </button>
              <button
                onClick={() => {
                  setCurrentView('mentor');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-left bg-slate-900 rounded border border-slate-800 text-slate-200"
              >
                AI Mentor
              </button>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-left bg-rose-950/40 rounded border border-rose-800/40 text-rose-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
