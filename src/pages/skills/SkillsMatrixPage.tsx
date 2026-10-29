import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { SkillItem, ProficiencyLevel } from '../../types';
import {
  Layers,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  Compass,
} from 'lucide-react';

export function SkillsMatrixPage() {
  const { skills, updateSkillLevel, setCurrentView, userProfile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'DSA', 'Core CS', 'Frameworks', 'Tools & DevOps', 'Soft Skills'];

  const filteredSkills = skills.filter(
    (s) => selectedCategory === 'All' || s.category === selectedCategory
  );

  const proficiencyLevels: ProficiencyLevel[] = [
    'Novice',
    'Beginner',
    'Competent',
    'Proficient',
    'Master',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            Role Competency & Skill Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track current vs target engineering competencies calibrated for{' '}
            <span className="text-indigo-300 font-semibold">{userProfile?.targetRole}</span> with verified documentation.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentView('roadmap')}
          className="border-slate-700"
        >
          <Compass className="w-3.5 h-3.5 mr-1" />
          View Linked Tasks
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill) => {
          return (
            <Card key={skill.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100">{skill.name}</span>
                    <Badge variant="outline" size="sm">
                      {skill.category}
                    </Badge>
                  </div>
                  <a
                    href={skill.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
                  >
                    <span>Official Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Progress Level Bars */}
                <div className="mt-3 bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">
                      Current: <strong className="text-indigo-300">{skill.currentLevel}</strong>
                    </span>
                    <span className="text-slate-400">
                      Target: <strong className="text-emerald-400">{skill.targetLevel}</strong>
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${skill.progressPercent}%` }}
                    />
                  </div>

                  {/* Level Quick Select */}
                  <div className="flex items-center justify-between gap-1 mt-3 pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Update Level:</span>
                    <div className="flex gap-1">
                      {proficiencyLevels.map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => updateSkillLevel(skill.id, lvl)}
                          className={`text-[10px] px-2 py-0.5 rounded transition ${
                            skill.currentLevel === lvl
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
                          }`}
                        >
                          {lvl[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-300 leading-relaxed">
                  <span className="text-slate-400 font-semibold">Recommended Practice: </span>
                  {skill.recommendedPractice}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{skill.relatedTaskIds.length} Linked Roadmap Milestones</span>
                <span className="text-emerald-400 font-bold">{skill.progressPercent}% Mastered</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
