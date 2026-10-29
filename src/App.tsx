/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/landing/LandingPage';
import { AuthPage } from './pages/auth/AuthPage';
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { RoadmapPage } from './pages/roadmap/RoadmapPage';
import { DailyPlannerPage } from './pages/planner/DailyPlannerPage';
import { CodingPracticePage } from './pages/coding/CodingPracticePage';
import { SkillsMatrixPage } from './pages/skills/SkillsMatrixPage';
import { ProjectsPortfolioPage } from './pages/projects/ProjectsPortfolioPage';
import { ResumePage } from './pages/resume/ResumePage';
import { ApplicationsPage } from './pages/applications/ApplicationsPage';
import { AIMentorPage } from './pages/mentor/AIMentorPage';
import { InterviewHubPage } from './pages/interviews/InterviewHubPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { SettingsPage } from './pages/settings/SettingsPage';

function AppContent() {
  const { currentView, isAuthenticated } = useApp();

  // Landing page or unauthenticated view
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navbar />
        <LandingPage />
      </div>
    );
  }

  // Auth Page
  if (currentView === 'auth') {
    return <AuthPage />;
  }

  // Onboarding Wizard
  if (currentView === 'onboarding') {
    return <OnboardingWizard />;
  }

  // Authenticated Application Views
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {currentView === 'dashboard' && <DashboardPage />}
          {currentView === 'roadmap' && <RoadmapPage />}
          {currentView === 'planner' && <DailyPlannerPage />}
          {currentView === 'coding' && <CodingPracticePage />}
          {currentView === 'skills' && <SkillsMatrixPage />}
          {currentView === 'projects' && <ProjectsPortfolioPage />}
          {currentView === 'resume' && <ResumePage />}
          {currentView === 'applications' && <ApplicationsPage />}
          {currentView === 'mentor' && <AIMentorPage />}
          {currentView === 'interviews' && <InterviewHubPage />}
          {currentView === 'analytics' && <AnalyticsPage />}
          {currentView === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
