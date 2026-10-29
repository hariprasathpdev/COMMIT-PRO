import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge, Modal } from '../../components/ui/UIComponents';
import { StorageService } from '../../services/storage';
import {
  Settings,
  User,
  Shield,
  Download,
  Trash2,
  Check,
  Server,
  Cloud,
  Terminal,
  ExternalLink,
  Save,
} from 'lucide-react';
import { TargetRole, PreferredLanguage } from '../../types';

export function SettingsPage() {
  const {
    userProfile,
    updateProfile,
    resetAllAppData,
    regenerateRoadmapWithCurrentProfile,
    isGeneratingRoadmap,
  } = useApp();

  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [college, setCollege] = useState(userProfile?.college || '');
  const [targetRole, setTargetRole] = useState<TargetRole>(
    userProfile?.targetRole || 'Software Development Engineer'
  );
  const [preferredLanguage, setPreferredLanguage] = useState<PreferredLanguage>(
    userProfile?.preferredLanguage || 'Java'
  );
  const [dailyHours, setDailyHours] = useState<number>(userProfile?.dailyHours || 3.5);
  const [targetDate, setTargetDate] = useState(userProfile?.targetDate || '2026-12-15');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      college,
      targetRole,
      preferredLanguage,
      dailyHours,
      targetDate,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportData = () => {
    const dataStr = StorageService.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commit_pro_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            Profile & System Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update your preparation targets, export your progress records, or review deployment guidelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              Target Preferences & Academic Profile
            </h3>

            {saveSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">College</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Role</label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value as TargetRole)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option>Software Development Engineer</option>
                    <option>Full-Stack Developer</option>
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>Data Analyst</option>
                    <option>AI/ML Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Primary Programming Language
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value as PreferredLanguage)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option>Java</option>
                    <option>Python</option>
                    <option>C++</option>
                    <option>JavaScript</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Daily Study Commitment (Hours)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="10"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Target Placement Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isGeneratingRoadmap}
                  onClick={regenerateRoadmapWithCurrentProfile}
                >
                  Regenerate Roadmap with New Targets
                </Button>

                <Button type="submit" variant="primary" size="sm">
                  <Save className="w-3.5 h-3.5 mr-1" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>

          {/* Deployment Architecture Guide */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              Full-Stack Architecture & Production Deployment
            </h3>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                Commit Pro runs as a unified full-stack application using <strong>Express</strong>, <strong>React 19</strong>, and <strong>TypeScript</strong>.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div>• Frontend: React 19 + Tailwind v4 + Recharts</div>
                <div>• Backend: Node.js Express server on port 3000 (server.ts)</div>
                <div>• AI Engine: Google Gemini 3.8 Flash via @google/genai SDK on server</div>
                <div>• Production Build: npm run build &amp;&amp; npm start</div>
              </div>
              <p className="text-slate-400">
                Security guarantees: Gemini API key is strictly isolated on the backend (never exposed to browser bundles). Sensitive credentials and rate limiting are enforced server-side.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Col: Data Export & Reset */}
        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
              <Download className="w-4 h-4 text-indigo-400" />
              Data Export & Portability
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Download a complete JSON snapshot of your 10-stage roadmap, solved DSA records, study session history, and job applications.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              className="w-full justify-center"
            >
              Export JSON Backup
            </Button>
          </Card>

          <Card className="p-5 border-rose-900/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Danger Zone
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Clear all locally persisted tasks, roadmap milestones, and study timer logs.
            </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setResetModalOpen(true)}
              className="w-full justify-center"
            >
              Reset Application Data
            </Button>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Confirm Data Reset"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-300">
            Are you sure you want to reset all preparation progress? This action will restore demo defaults and clear custom tasks.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setResetModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                resetAllAppData();
                setResetModalOpen(false);
              }}
            >
              Yes, Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
