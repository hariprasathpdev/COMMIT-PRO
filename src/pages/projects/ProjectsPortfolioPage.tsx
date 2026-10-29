import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge, Modal } from '../../components/ui/UIComponents';
import { PortfolioProject, ProjectStatus } from '../../types';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Plus,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Rocket,
  Copy,
  Check,
} from 'lucide-react';

export function ProjectsPortfolioPage() {
  const { projects, addProject, updateProject, toggleProjectMilestone } = useApp();
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [selectedProjectForCard, setSelectedProjectForCard] = useState<PortfolioProject | null>(null);
  const [copiedBullet, setCopiedBullet] = useState(false);

  // New Project Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStackInput, setTechStackInput] = useState('React, TypeScript, Node.js, Express, Tailwind');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [recruiterHighlights, setRecruiterHighlights] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const techStack = techStackInput.split(',').map((t) => t.trim()).filter(Boolean);

    addProject({
      title,
      description,
      targetSkills: techStack,
      difficulty,
      status: 'In Progress',
      startDate: new Date().toISOString().split('T')[0],
      targetCompletionDate: '2026-12-01',
      githubUrl,
      liveUrl,
      techStack,
      milestones: [
        { id: `m_${Date.now()}_1`, title: 'Design system architecture & database schema', isCompleted: true },
        { id: `m_${Date.now()}_2`, title: 'Develop core API endpoints with JWT authentication', isCompleted: false },
        { id: `m_${Date.now()}_3`, title: 'Deploy on Cloud Run with SSL & automated testing', isCompleted: false },
      ],
      notes: '',
      recruiterHighlights: recruiterHighlights || 'Engineered production-grade system with modular clean architecture and sub-100ms latency.',
    });

    setIsAddProjectOpen(false);
    setTitle('');
    setDescription('');
    setGithubUrl('');
    setLiveUrl('');
  };

  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBullet(true);
    setTimeout(() => setCopiedBullet(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-indigo-400" />
            Flagship Project Portfolio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build 2–3 deeply engineered, deployed portfolio applications that prove your technical competence to hiring managers.
          </p>
        </div>

        <Button
          variant="glow"
          size="sm"
          onClick={() => setIsAddProjectOpen(true)}
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add Flagship Project
        </Button>
      </div>

      {/* Recommended Architecture Flow banner */}
      <Card className="p-4 bg-gradient-to-r from-indigo-950/30 via-slate-900 to-indigo-950/20 border-indigo-900/40">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
          <Rocket className="w-4 h-4 text-indigo-400" />
          Production Project Blueprint: From Idea to Interview Showcase
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-bold text-slate-200">1. Real Problem</div>
            <div className="text-[11px] text-slate-400">Solve actual user pain points, avoid generic clone apps.</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-bold text-slate-200">2. Clean Architecture</div>
            <div className="text-[11px] text-slate-400">Stateless REST, indexing, input validation, and auth.</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-bold text-slate-200">3. Live Deployment</div>
            <div className="text-[11px] text-slate-400">Host with custom domain/SSL, add CI/CD test pipelines.</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-bold text-slate-200">4. Quantified Metrics</div>
            <div className="text-[11px] text-slate-400">Measure query speed, test coverage, and concurrent users.</div>
          </div>
        </div>
      </Card>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => {
          const completedMilestones = project.milestones.filter((m) => m.isCompleted).length;
          const totalMilestones = project.milestones.length;
          const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

          return (
            <Card key={project.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge
                      variant={
                        project.status === 'Completed'
                          ? 'success'
                          : project.status === 'In Progress'
                          ? 'indigo'
                          : 'default'
                      }
                      size="sm"
                    >
                      {project.status}
                    </Badge>
                    <Badge variant="outline" size="sm">
                      {project.difficulty}
                    </Badge>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {project.startDate} → {project.targetCompletionDate}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-indigo-300 font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Recruiter Impact Highlight */}
                  <div className="mt-4 p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs">
                    <span className="font-semibold text-indigo-300">Resume Impact Bullet (Google XYZ formula): </span>
                    <span className="text-slate-200 italic">{project.recruiterHighlights}</span>
                  </div>
                </div>

                {/* Right side links & actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 hover:border-slate-700 transition"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub Repo</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-800 text-xs text-indigo-300 hover:bg-indigo-950 transition"
                    >
                      <Rocket className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Live Production App</span>
                      <ExternalLink className="w-3 h-3 text-indigo-400" />
                    </a>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProjectForCard(project)}
                    className="text-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-violet-400" />
                    Showcase Card
                  </Button>
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-slate-300">Engineering Milestones</span>
                  <span className="text-slate-400 font-mono">
                    {completedMilestones}/{totalMilestones} Completed ({progress}%)
                  </span>
                </div>

                <div className="w-full bg-slate-950 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {project.milestones.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => toggleProjectMilestone(project.id, m.id)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition cursor-pointer flex items-center gap-2 ${
                        m.isCompleted
                          ? 'bg-slate-950/60 border-slate-900 text-slate-400'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                          m.isCompleted
                            ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                            : 'border-slate-700'
                        }`}
                      >
                        {m.isCompleted && '✓'}
                      </span>
                      <span className={`truncate ${m.isCompleted ? 'line-through' : ''}`}>
                        {m.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        title="Add Portfolio Project"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Distributed Task Queue & Worker Service"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what problem this solves and architecture highlights..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Tech Stack (Comma-separated)
            </label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">GitHub Repo URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Live Demo URL</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Recruiter Highlight Bullet (XYZ formula)
            </label>
            <textarea
              rows={2}
              value={recruiterHighlights}
              onChange={(e) => setRecruiterHighlights(e.target.value)}
              placeholder="Architected [feature] using [tech] to achieve [metric]..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setIsAddProjectOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* Project Showcase Card Modal (Ready for Resume / LinkedIn) */}
      {selectedProjectForCard && (
        <Modal
          isOpen={Boolean(selectedProjectForCard)}
          onClose={() => setSelectedProjectForCard(null)}
          title="Recruiter Showcase Card"
          maxWidth="max-w-lg"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-400">
              Copy this formatted snippet directly into your resume's Project section or LinkedIn featured items:
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
              <strong>{selectedProjectForCard.title}</strong> | {selectedProjectForCard.techStack.join(', ')}
              {selectedProjectForCard.githubUrl && `\nGitHub: ${selectedProjectForCard.githubUrl}`}
              {selectedProjectForCard.liveUrl && `\nLive Demo: ${selectedProjectForCard.liveUrl}`}
              {`\n• ${selectedProjectForCard.recruiterHighlights}`}
              {`\n• Implemented modular architecture with end-to-end type safety, automated tests, and deployment.`}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="glow"
                size="sm"
                onClick={() =>
                  handleCopySummary(
                    `${selectedProjectForCard.title} | ${selectedProjectForCard.techStack.join(', ')}\n• ${selectedProjectForCard.recruiterHighlights}`
                  )
                }
              >
                {copiedBullet ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copiedBullet ? 'Copied to Clipboard!' : 'Copy Resume Bullet'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
