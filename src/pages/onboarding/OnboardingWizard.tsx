import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button, Card, Badge } from '../../components/ui/UIComponents';
import {
  ProgrammingLevel,
  PreferredLanguage,
  TargetRole,
  PlacementGoal,
  LearningStyle,
} from '../../types';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Code2,
  Calendar,
  Briefcase,
  Target,
  FileText,
  Upload,
} from 'lucide-react';

export function OnboardingWizard() {
  const { userProfile, completeOnboarding, isGeneratingRoadmap } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State covering all 15 specified points
  const [fullName, setFullName] = useState(userProfile?.fullName || 'Alex Chen');
  const [college, setCollege] = useState(userProfile?.college || 'National Institute of Technology');
  const [degree, setDegree] = useState(userProfile?.degree || 'B.Tech in Computer Science');
  const [branch, setBranch] = useState(userProfile?.branch || 'Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState(userProfile?.academicYear || '3rd Year (6th Semester)');
  const [gradYear, setGradYear] = useState(userProfile?.gradYear || '2026');

  const [skillLevel, setSkillLevel] = useState<ProgrammingLevel>(userProfile?.skillLevel || 'Intermediate');
  const [preferredLanguage, setPreferredLanguage] = useState<PreferredLanguage>(userProfile?.preferredLanguage || 'Java');
  const [targetRole, setTargetRole] = useState<TargetRole>(userProfile?.targetRole || 'Software Development Engineer');
  const [placementGoal, setPlacementGoal] = useState<PlacementGoal>(userProfile?.placementGoal || 'On-Campus Placement');
  const [targetCompanies, setTargetCompanies] = useState(userProfile?.targetCompanies || 'Google, Microsoft, Amazon, Atlassian');
  const [dailyHours, setDailyHours] = useState<number>(userProfile?.dailyHours || 3.5);
  const [targetDate, setTargetDate] = useState(userProfile?.targetDate || '2026-12-15');

  const [completedTopics, setCompletedTopics] = useState<string[]>(
    userProfile?.completedTopics || ['Arrays', 'Strings', 'Basic SQL']
  );
  const [weakAreas, setWeakAreas] = useState<string[]>(
    userProfile?.weakAreas || ['Dynamic Programming', 'System Design']
  );
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(
    userProfile?.learningStyle || 'Hands-on Coding & Projects'
  );
  const [resumeFileName, setResumeFileName] = useState(userProfile?.resumeFileName || '');
  const [resumeText, setResumeText] = useState(userProfile?.resumeText || '');

  const availableTopics = [
    'Arrays', 'Strings', 'Linked Lists', 'Stack & Queue', 'Trees',
    'Graphs', 'Dynamic Programming', 'OOP', 'DBMS & SQL', 'Operating Systems',
    'Computer Networks', 'REST APIs', 'React', 'Git & GitHub'
  ];

  const availableWeakAreas = [
    'Dynamic Programming', 'Binary Search on Answer', 'Graph Algorithms (Dijkstra/Topological)',
    'B-Tree Indexing & Transactions', 'Low-Level System Design (LLD)', 'Quantitative Aptitude',
    'STAR Behavioral Questions', 'Live Whiteboard Coding'
  ];

  const toggleTopic = (topic: string) => {
    if (completedTopics.includes(topic)) {
      setCompletedTopics(completedTopics.filter((t) => t !== topic));
    } else {
      setCompletedTopics([...completedTopics, topic]);
    }
  };

  const toggleWeakArea = (area: string) => {
    if (weakAreas.includes(area)) {
      setWeakAreas(weakAreas.filter((a) => a !== area));
    } else {
      setWeakAreas([...weakAreas, area]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setResumeText(content.slice(0, 4000));
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    await completeOnboarding({
      fullName,
      college,
      degree,
      branch,
      academicYear,
      gradYear,
      skillLevel,
      preferredLanguage,
      targetRole,
      placementGoal,
      targetCompanies,
      dailyHours,
      targetDate,
      completedTopics,
      weakAreas,
      learningStyle,
      resumeFileName,
      resumeText,
    });
  };

  if (isGeneratingRoadmap) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400 mb-6 animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Calibrating Your 10-Stage Career Roadmap
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-md">
          Analyzing your target date ({targetDate}), {dailyHours}h daily commitment, and {preferredLanguage} programming background...
        </p>
        <div className="mt-6 w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500 w-3/4 rounded-full animate-pulse" />
        </div>
        <span className="mt-3 text-xs text-indigo-400 font-mono">Generating milestones with Google Gemini...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className="text-indigo-400 font-mono">STEP {currentStep} OF 4</span>
            <span>
              {currentStep === 1 && 'College & Academic Background'}
              {currentStep === 2 && 'Target Role & Placement Goals'}
              {currentStep === 3 && 'Coding Proficiency & Weak Areas'}
              {currentStep === 4 && 'Resume & Roadmap Confirmation'}
            </span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8">
          {/* STEP 1: College & Academic Background */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-white">Academic Profile</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tell us about your current university education so we can align your schedule with placement drive cycles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    1. Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    2. College / University *
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    3. Degree *
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech, B.E., B.Sc., MCA"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    4. Branch / Specialization *
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science, IT, ECE"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Academic Year *
                  </label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option>1st Year (Semester 1-2)</option>
                    <option>2nd Year (Semester 3-4)</option>
                    <option>3rd Year (Semester 5-6)</option>
                    <option>Final Year (Semester 7-8)</option>
                    <option>Recent Graduate / Post-Grad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Graduation Year *
                  </label>
                  <input
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    placeholder="2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Target Role & Goals */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-white">Target Role & Placement Goals</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Specify the engineering role and timeline so we can size your roadmap sprint.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  5. Target Career Role *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Software Development Engineer',
                    'Full-Stack Developer',
                    'Frontend Developer',
                    'Backend Developer',
                    'Data Analyst',
                    'AI/ML Engineer',
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTargetRole(role as TargetRole)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition ${
                        targetRole === role
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    6. Primary Placement Goal *
                  </label>
                  <select
                    value={placementGoal}
                    onChange={(e) => setPlacementGoal(e.target.value as PlacementGoal)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option>Summer Internship</option>
                    <option>On-Campus Placement</option>
                    <option>Off-Campus Placement</option>
                    <option>Higher Studies & Research</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    7. Target Placement Date / Deadline *
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  8. Target Companies (Optional)
                </label>
                <input
                  type="text"
                  value={targetCompanies}
                  onChange={(e) => setTargetCompanies(e.target.value)}
                  placeholder="e.g. Google, Microsoft, Amazon, Atlassian, Startups"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>9. Daily Preparation Commitment</span>
                  <span className="text-indigo-400 font-mono font-bold">{dailyHours} Hours / Day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 hr (Light)</span>
                  <span>3.5 hrs (Recommended)</span>
                  <span>8 hrs (Intensive Sprint)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Coding Background & Skills */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-white">Coding Proficiency & Skills</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Help us benchmark your starting point so you don't repeat basics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    10. Current Programming Level *
                  </label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value as ProgrammingLevel)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option>Beginner (Learning syntax & basic loops)</option>
                    <option>Intermediate (Comfortable with basic DSA & APIs)</option>
                    <option>Advanced (Can solve LeetCode mediums & build systems)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    11. Primary Programming Language *
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value as PreferredLanguage)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option>Java</option>
                    <option>Python</option>
                    <option>C++</option>
                    <option>JavaScript</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  12. Topics You Have Already Completed (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map((topic) => {
                    const isSelected = completedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  13. Areas Requiring Greatest Improvement
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableWeakAreas.map((area) => {
                    const isSelected = weakAreas.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleWeakArea(area)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                          isSelected
                            ? 'bg-amber-950/70 border-amber-700 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {isSelected ? '⚡ ' : '+ '}
                        {area}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  14. Preferred Learning Style
                </label>
                <select
                  value={learningStyle}
                  onChange={(e) => setLearningStyle(e.target.value as LearningStyle)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option>Hands-on Coding & Projects</option>
                  <option>Video Tutorials & Courses</option>
                  <option>Structured Documentation & Books</option>
                  <option>Problem-Solving & Competitive Coding</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: Resume & Roadmap Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-white">Resume & Final Confirmation</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Optionally paste your current resume content or upload a file for automated ATS feedback.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  15. Resume Upload or Text (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 text-center bg-slate-950/60 mb-3">
                  <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-300">
                    Upload resume file (.txt, .md, or parsed PDF text)
                  </p>
                  <input
                    type="file"
                    accept=".txt,.md,.doc"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-400 mt-2 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200 cursor-pointer"
                  />
                  {resumeFileName && (
                    <div className="mt-2 text-xs text-emerald-400 font-mono">
                      ✓ Attached: {resumeFileName}
                    </div>
                  )}
                </div>

                <textarea
                  rows={4}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Or paste your resume text here (Education, Skills, Projects, Experience)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Summary Review Card */}
              <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-4 space-y-2 text-xs">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Roadmap Profile Ready for Generation:
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-400">Target Role:</span> {targetRole}
                  </div>
                  <div>
                    <span className="text-slate-400">Language:</span> {preferredLanguage}
                  </div>
                  <div>
                    <span className="text-slate-400">Daily Study:</span> {dailyHours} hrs/day
                  </div>
                  <div>
                    <span className="text-slate-400">Target Date:</span> {targetDate}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous Step
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="glow"
                size="md"
                onClick={handleSubmit}
              >
                Generate 10-Stage Career Roadmap
                <Sparkles className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
