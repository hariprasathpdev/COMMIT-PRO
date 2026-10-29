import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge, Modal } from '../../components/ui/UIComponents';
import { JobApplication, ApplicationStage } from '../../types';
import {
  Briefcase,
  Plus,
  ExternalLink,
  Calendar,
  LayoutGrid,
  List,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  FileEdit,
  UserCheck,
} from 'lucide-react';

export function ApplicationsPage() {
  const { applications, addApplication, updateApplication, deleteApplication } = useApp();
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Software Engineering Intern');
  const [jobUrl, setJobUrl] = useState('');
  const [location, setLocation] = useState('Bangalore / Hyderabad / Remote');
  const [packageStipend, setPackageStipend] = useState('₹1,00,000 / month');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ApplicationStage>('Applied');
  const [nextStep, setNextStep] = useState('Awaiting online assessment link');
  const [nextStepDate, setNextStepDate] = useState('');
  const [notes, setNotes] = useState('');
  const [referralContact, setReferralContact] = useState('');

  const stages: ApplicationStage[] = [
    'Interested',
    'Applied',
    'Online Assessment',
    'Interview Scheduled',
    'Offer',
    'Rejected',
  ];

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) return;

    if (editingApp) {
      updateApplication(editingApp.id, {
        companyName,
        role,
        jobUrl,
        location,
        packageStipend,
        applicationDate,
        deadline,
        status,
        nextStep,
        nextStepDate,
        notes,
        referralContact,
      });
      setEditingApp(null);
    } else {
      addApplication({
        companyName,
        role,
        jobUrl,
        location,
        packageStipend,
        applicationDate,
        deadline,
        status,
        nextStep,
        nextStepDate,
        notes,
        referralContact,
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCompanyName('');
    setRole('Software Engineering Intern');
    setJobUrl('');
    setNotes('');
    setReferralContact('');
  };

  const handleEditClick = (app: JobApplication) => {
    setEditingApp(app);
    setCompanyName(app.companyName);
    setRole(app.role);
    setJobUrl(app.jobUrl || '');
    setLocation(app.location);
    setPackageStipend(app.packageStipend);
    setApplicationDate(app.applicationDate);
    setDeadline(app.deadline || '');
    setStatus(app.status);
    setNextStep(app.nextStep);
    setNextStepDate(app.nextStepDate || '');
    setNotes(app.notes || '');
    setReferralContact(app.referralContact || '');
    setIsAddModalOpen(true);
  };

  const filteredApps = applications.filter((app) => {
    return (
      !searchQuery ||
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            Placement Application Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize referrals, online assessments (OA), technical rounds, and offer letters in one unified board.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded transition ${
                viewMode === 'kanban' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="glow"
            size="sm"
            onClick={() => {
              setEditingApp(null);
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
        <Search className="w-4 h-4 text-slate-400 ml-1" />
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none w-full"
        />
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageApps = filteredApps.filter((a) => a.status === stage);
            return (
              <div
                key={stage}
                className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 flex flex-col min-w-[200px]"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/60">
                  <span className="text-xs font-bold text-slate-200">{stage}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400">
                    {stageApps.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1">
                  {stageApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => handleEditClick(app)}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-600/50 transition cursor-pointer shadow-sm group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white group-hover:text-indigo-300 transition">
                          {app.companyName}
                        </span>
                        {app.jobUrl && (
                          <a
                            href={app.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-500 hover:text-indigo-400"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{app.role}</div>

                      <div className="mt-2 text-[10px] text-indigo-400 font-mono font-medium">
                        {app.packageStipend}
                      </div>

                      {app.nextStep && (
                        <div className="mt-2 text-[10px] text-slate-300 bg-slate-950/70 p-1.5 rounded border border-slate-800/80 line-clamp-2">
                          ⚡ {app.nextStep}
                        </div>
                      )}

                      {app.referralContact && (
                        <div className="mt-1.5 text-[10px] text-emerald-400 flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          <span className="truncate">{app.referralContact}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Package / Stipend</th>
                  <th className="py-3 px-4">Next Milestone</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-bold text-slate-200">
                      <div className="flex items-center gap-2">
                        <span>{app.companyName}</span>
                        {app.jobUrl && (
                          <a
                            href={app.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-indigo-400"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{app.role}</td>
                    <td className="py-3 px-4">
                      <Badge variant="indigo" size="sm">
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">
                      {app.packageStipend}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{app.nextStep}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditClick(app)}
                          className="p-1 rounded text-slate-400 hover:text-white"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add / Edit Application Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingApp ? `Edit Application: ${companyName}` : 'Add New Placement Application'}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateOrUpdate} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google, Atlassian"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Role *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Software Engineer Intern"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Current Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStage)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
              >
                {stages.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Package / Stipend</label>
              <input
                type="text"
                value={packageStipend}
                onChange={(e) => setPackageStipend(e.target.value)}
                placeholder="₹1,20,000/mo or 24 LPA"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Job / Portal URL</label>
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Next Action / Assessment Step
            </label>
            <input
              type="text"
              value={nextStep}
              onChange={(e) => setNextStep(e.target.value)}
              placeholder="e.g. Online Assessment (90 mins) on HackerEarth"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Referral Contact / Alumni
            </label>
            <input
              type="text"
              value={referralContact}
              onChange={(e) => setReferralContact(e.target.value)}
              placeholder="e.g. SDE-2 Alumni via LinkedIn"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Round specifics, core values, coding patterns tested..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingApp ? 'Update Application' : 'Save Application'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
