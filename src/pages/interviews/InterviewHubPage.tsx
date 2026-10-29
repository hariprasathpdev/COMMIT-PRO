import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { InterviewQuestion } from '../../types';
import {
  HelpCircle,
  Bookmark,
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter,
  Check,
} from 'lucide-react';

export function InterviewHubPage() {
  const {
    interviews,
    toggleInterviewBookmark,
    toggleInterviewMastered,
    setCurrentView,
  } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [filterBookmarkOnly, setFilterBookmarkOnly] = useState<boolean>(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    'All',
    'Java & OOP',
    'DBMS & SQL',
    'Operating Systems',
    'Computer Networks',
    'Behavioral & HR',
  ];

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = interviews.filter((q) => {
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchesBookmark = !filterBookmarkOnly || q.isBookmarked;
    const matchesSearch =
      !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answerSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesBookmark && matchesSearch;
  });

  const masteredCount = interviews.filter((q) => q.isMastered).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            Core CS & Placement Interview Vault
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Test yourself before revealing the interviewer's expected explanation and standard follow-up questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('mentor')}
            className="border-violet-700/50 text-violet-300"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-violet-400" />
            AI Live Mock Simulation
          </Button>
        </div>
      </div>

      {/* Progress & Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center">
          <div className="text-xl font-bold font-mono text-emerald-400">
            {masteredCount} / {interviews.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Concepts Mastered</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center">
          <div className="text-xl font-bold font-mono text-amber-400">
            {interviews.filter((q) => q.isBookmarked).length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Bookmarked for Revision</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center">
          <div className="text-xl font-bold font-mono text-indigo-400">
            {Math.round((masteredCount / (interviews.length || 1)) * 100)}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Interview Readiness Index</div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
        <input
          type="text"
          placeholder="Search interview questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 min-w-[200px]"
        />

        <div className="flex flex-wrap gap-1">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedTopic === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={() => setFilterBookmarkOnly(!filterBookmarkOnly)}
          className={`ml-auto px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition cursor-pointer ${
            filterBookmarkOnly
              ? 'bg-amber-950/60 border-amber-700 text-amber-300'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <span>Bookmarked Only</span>
        </button>
      </div>

      {/* Questions Flashcards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isRevealed = revealedAnswers[q.id] ?? false;

          return (
            <Card key={q.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="indigo" size="sm">
                      {q.topic}
                    </Badge>
                    <Badge
                      variant={q.frequency === 'Core' ? 'danger' : 'warning'}
                      size="sm"
                    >
                      {q.frequency} Frequency
                    </Badge>
                    {q.isMastered && (
                      <Badge variant="success" size="sm">
                        Mastered ✓
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {q.question}
                  </h3>

                  {/* Summary / Hint */}
                  <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                    <span className="font-semibold text-slate-400 uppercase tracking-wide text-[10px] block mb-1">
                      Quick Answer Summary
                    </span>
                    {q.answerSummary}
                  </div>

                  {/* Revealable Detailed Explanation */}
                  {isRevealed && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs animate-in fade-in">
                      <div className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                        {q.detailedExplanation}
                      </div>

                      {q.codeSnippet && (
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Reference Code
                          </div>
                          <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-indigo-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
                            {q.codeSnippet}
                          </pre>
                        </div>
                      )}

                      {q.commonFollowUps?.length > 0 && (
                        <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-xl">
                          <span className="font-semibold text-indigo-300 block mb-1.5">
                            Common Technical Follow-up Questions:
                          </span>
                          <ul className="space-y-1 text-slate-300 list-disc list-inside">
                            {q.commonFollowUps.map((f, idx) => (
                              <li key={idx}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Quick Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => toggleInterviewBookmark(q.id)}
                    title="Bookmark"
                    className={`p-2 rounded-lg border transition ${
                      q.isBookmarked
                        ? 'bg-amber-950/60 border-amber-800/60 text-amber-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={() => toggleInterviewMastered(q.id)}
                    title="Mark Mastered"
                    className={`p-2 rounded-lg border transition ${
                      q.isMastered
                        ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reveal Toggle Button */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleReveal(q.id)}
                  className="text-xs"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 mr-1" /> Hide Detailed Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 mr-1" /> Reveal Expected Explanation & Follow-ups
                    </>
                  )}
                </Button>

                <span className="text-[11px] text-slate-500 font-mono">
                  {isRevealed ? 'Detailed Breakdown Open' : 'Attempt Answering First'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
