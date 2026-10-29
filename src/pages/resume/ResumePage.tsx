import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { reviewResumeWithAI } from '../../services/api';
import {
  FileText,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';

export function ResumePage() {
  const { userProfile, updateProfile } = useApp();
  const [resumeText, setResumeText] = useState(userProfile?.resumeText || '');
  const [targetRole, setTargetRole] = useState(userProfile?.targetRole || 'Software Development Engineer');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleAuditResume = async () => {
    if (!resumeText.trim()) return;
    setIsAuditing(true);
    try {
      const result = await reviewResumeWithAI(resumeText, targetRole);
      setAuditResult(result);
      updateProfile({ resumeText });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setResumeText(content.slice(0, 5000));
    };
    reader.readAsText(file);
  };

  const handleCopyImprovedBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            Resume Engineering & ATS Review
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Optimize your college resume for Applicant Tracking Systems (ATS) and tech recruiters using AI evaluation.
          </p>
        </div>

        <Button
          variant="glow"
          size="sm"
          disabled={isAuditing || !resumeText.trim()}
          onClick={handleAuditResume}
        >
          <Sparkles className={`w-3.5 h-3.5 mr-1 ${isAuditing ? 'animate-spin' : ''}`} />
          {isAuditing ? 'Analyzing with Gemini...' : 'Analyze Resume with AI'}
        </Button>
      </div>

      {/* Grid: Editor + Checklist on Left, Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input & Checklist */}
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Resume Content / Plain Text
              </label>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Target:</span>
                <span className="font-semibold text-indigo-300">{targetRole}</span>
              </div>
            </div>

            <textarea
              rows={12}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your full resume text here (Education, Technical Skills, Projects, Coursework)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
            />

            <div className="mt-3 flex items-center justify-between">
              <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload .txt or parsed text</span>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <span className="text-[11px] text-slate-500 font-mono">
                {resumeText.length} characters
              </span>
            </div>
          </Card>

          {/* Placement Cell Resume Checklist */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Placement Cell 6-Second Screen Checklist
              </h3>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Strict 1-Page Limit:</strong> For students with under 3 years experience, resumes exceeding 1 page are often discarded.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Google XYZ Formula:</strong> "Accomplished [X], as measured by [Y], by doing [Z]" in every project bullet.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Clean Single-Column Layout:</strong> Multi-column tables and graphics break ATS regex parsers.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Live Deployed Links:</strong> Always include GitHub repository + live URL for top 2 projects.
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: AI Audit Results */}
        <div className="space-y-6">
          {!auditResult ? (
            <Card className="p-8 text-center border-dashed border-slate-800">
              <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-3 opacity-60" />
              <h3 className="font-bold text-slate-100 text-sm">No Audit Generated Yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Paste your resume on the left and click "Analyze Resume with AI" to check ATS score, missing keywords, and get bullet point rewrites.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAuditResume}
                disabled={!resumeText.trim()}
                className="mt-4"
              >
                Run Quick Audit
              </Button>
            </Card>
          ) : (
            <>
              {/* Score Gauge Card */}
              <Card className="p-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-900/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Overall ATS Match Score
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {auditResult.atsScore >= 80 ? 'Placement Ready' : 'Needs Optimization'}
                    </h3>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-950 border border-indigo-700 flex items-center justify-center font-black text-2xl text-indigo-400 font-mono shadow-md">
                    {auditResult.atsScore}%
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {auditResult.summary}
                </p>

                {/* Subscores */}
                {auditResult.sectionScores && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
                    <div>
                      <div className="font-mono font-bold text-xs text-slate-200">
                        {auditResult.sectionScores.impactAndMetrics}%
                      </div>
                      <div className="text-[10px] text-slate-400">Metrics/Impact</div>
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs text-slate-200">
                        {auditResult.sectionScores.technicalSkills}%
                      </div>
                      <div className="text-[10px] text-slate-400">Tech Stack</div>
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs text-slate-200">
                        {auditResult.sectionScores.projects}%
                      </div>
                      <div className="text-[10px] text-slate-400">Project Depth</div>
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs text-slate-200">
                        {auditResult.sectionScores.readabilityAndATS}%
                      </div>
                      <div className="text-[10px] text-slate-400">ATS Format</div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Missing Keywords */}
              {auditResult.missingKeywords?.length > 0 && (
                <Card className="p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Keywords Expected for {targetRole}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {auditResult.missingKeywords.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-amber-950/50 border border-amber-800/60 text-amber-300 font-mono font-medium"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              {/* Bullet Point Rewrites */}
              {auditResult.bulletPointRewrites?.length > 0 && (
                <Card className="p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Bullet Point Rewrites (Google XYZ Formula)
                  </div>
                  <div className="space-y-3">
                    {auditResult.bulletPointRewrites.map((rw: any, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                        <div className="text-rose-400/90 line-through">
                          ❌ {rw.original}
                        </div>
                        <div className="text-emerald-300 font-medium">
                          ✅ {rw.improved}
                        </div>
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleCopyImprovedBullet(rw.improved, i)}
                            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                          >
                            {copiedIndex === i ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Bullet</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
