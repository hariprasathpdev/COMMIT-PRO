import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge, Modal } from '../../components/ui/UIComponents';
import { RoadmapStage, RoadmapTask, TaskStatus, TaskPriority, TaskDifficulty } from '../../types';
import {
  Compass,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  RefreshCw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter,
  CalendarPlus,
  BookOpen,
  FileEdit,
  ArrowRight,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';

export function RoadmapPage() {
  const {
    roadmap,
    updateTaskStatus,
    updateTaskNotes,
    addCustomTask,
    reopenTask,
    addDailyTask,
    regenerateRoadmapWithCurrentProfile,
    isGeneratingRoadmap,
    userProfile,
  } = useApp();

  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'stage-1': true,
    'stage-2': true,
  });
  const [selectedTask, setSelectedTask] = useState<{ stageId: string; task: RoadmapTask } | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Custom Task Modal State
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customStageId, setCustomStageId] = useState<string>('stage-1');
  const [customTitle, setCustomTitle] = useState('');
  const [customExplanation, setCustomExplanation] = useState('');
  const [customCategory, setCustomCategory] = useState('Core Practice');
  const [customDifficulty, setCustomDifficulty] = useState<TaskDifficulty>('Medium');
  const [customHours, setCustomHours] = useState(4);
  const [customPriority, setCustomPriority] = useState<TaskPriority>('High');
  const [customPrereq, setCustomPrereq] = useState('');
  const [customExercises, setCustomExercises] = useState('');
  const [customCriteria, setCustomCriteria] = useState('');
  const [notesInput, setNotesInput] = useState('');

  const toggleExpand = (stageId: string) => {
    setExpandedStages((prev) => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const handleOpenTaskDetails = (stageId: string, task: RoadmapTask) => {
    setSelectedTask({ stageId, task });
    setNotesInput(task.notes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedTask) return;
    updateTaskNotes(selectedTask.stageId, selectedTask.task.id, notesInput);
    setSelectedTask((prev) =>
      prev ? { ...prev, task: { ...prev.task, notes: notesInput } } : null
    );
  };

  const handleAddTaskToPlanner = (task: RoadmapTask) => {
    addDailyTask({
      taskId: task.id,
      title: task.title,
      category: task.category,
      estimatedMinutes: Math.min(task.estimatedHours * 30, 90),
      completedMinutes: 0,
      date: new Date().toISOString().split('T')[0],
      notes: `Roadmap Task: ${task.explanation.slice(0, 80)}...`,
    });
  };

  const handleCreateCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;
    addCustomTask(customStageId, {
      title: customTitle,
      explanation: customExplanation,
      category: customCategory,
      difficulty: customDifficulty,
      estimatedHours: customHours,
      priority: customPriority,
      prerequisites: customPrereq || 'None',
      practiceExercises: customExercises,
      completionCriteria: customCriteria || 'Complete requirements and tests',
    });
    setCustomModalOpen(false);
    setCustomTitle('');
    setCustomExplanation('');
  };

  if (!roadmap) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Loading your personalized roadmap...</p>
      </div>
    );
  }

  // Filter tasks based on category & status & search
  const filteredStages = roadmap.stages.map((stage) => {
    const tasks = stage.tasks.filter((t) => {
      const matchesCat = filterCategory === 'all' || t.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
      const matchesSearch =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesStatus && matchesSearch;
    });
    return { ...stage, tasks };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header with Title and Regenerate AI Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-indigo-400" />
              10-Stage Placement Roadmap
            </h1>
            <Badge variant="indigo" size="sm">
              {roadmap.targetRole}
            </Badge>
          </div>
          <p className="text-xs text-slate-400">
            {roadmap.summary} • Estimated {roadmap.estimatedWeeks} Weeks of structured preparation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCustomModalOpen(true)}
            className="border-slate-700"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Custom Task
          </Button>
          <Button
            variant="glow"
            size="sm"
            disabled={isGeneratingRoadmap}
            onClick={regenerateRoadmapWithCurrentProfile}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingRoadmap ? 'animate-spin' : ''}`} />
            {isGeneratingRoadmap ? 'Regenerating...' : 'Regenerate with AI'}
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5 text-indigo-400" />
          <span>Filters:</span>
        </div>

        <input
          type="text"
          placeholder="Search roadmap tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 min-w-[200px]"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="Fundamentals">Fundamentals</option>
          <option value="DSA">DSA</option>
          <option value="Core CS">Core CS</option>
          <option value="Database">Database</option>
          <option value="Development">Development</option>
          <option value="Portfolio">Portfolio</option>
          <option value="Placement Readiness">Placement Readiness</option>
          <option value="Interview Prep">Interview Prep</option>
        </select>
      </div>

      {/* 10 Stages List */}
      <div className="space-y-4">
        {filteredStages.map((stage) => {
          const isExpanded = expandedStages[stage.id] ?? false;
          const totalTasks = stage.tasks.length;
          const completedCount = stage.tasks.filter((t) => t.status === 'Completed').length;
          const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

          return (
            <div
              key={stage.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-sm"
            >
              {/* Stage Header Accordion */}
              <div
                onClick={() => toggleExpand(stage.id)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-900 transition bg-slate-900/50 border-b border-slate-800/60"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-xs font-mono font-bold text-indigo-400">
                    {stage.stageNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-100">
                        {stage.title}
                      </h3>
                      <Badge variant="indigo" size="sm">
                        {stage.duration}
                      </Badge>
                      {completedCount === totalTasks && totalTasks > 0 && (
                        <Badge variant="success" size="sm">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-mono text-slate-300">
                      {completedCount}/{totalTasks} Done
                    </span>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Tasks List within Stage */}
              {isExpanded && (
                <div className="p-4 sm:p-5 space-y-3 bg-slate-950/40">
                  {stage.tasks.length === 0 ? (
                    <div className="text-xs text-slate-500 py-3 text-center">
                      No tasks matching current filter in this stage.
                    </div>
                  ) : (
                    stage.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-xl border transition-all ${
                          task.status === 'Completed'
                            ? 'bg-slate-950/60 border-slate-900/80 text-slate-400'
                            : task.status === 'In Progress'
                            ? 'bg-slate-900/90 border-indigo-700/50 shadow-sm shadow-indigo-950/50'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <Badge
                                variant={
                                  task.status === 'Completed'
                                    ? 'success'
                                    : task.status === 'In Progress'
                                    ? 'indigo'
                                    : 'default'
                                }
                                size="sm"
                              >
                                {task.status}
                              </Badge>
                              <Badge variant="outline" size="sm">
                                {task.category}
                              </Badge>
                              <Badge
                                variant={
                                  task.difficulty === 'Easy'
                                    ? 'success'
                                    : task.difficulty === 'Medium'
                                    ? 'warning'
                                    : 'danger'
                                }
                                size="sm"
                              >
                                {task.difficulty}
                              </Badge>
                              <span className="text-[11px] text-slate-400 font-mono">
                                ~{task.estimatedHours} hrs
                              </span>
                            </div>

                            <h4
                              onClick={() => handleOpenTaskDetails(stage.id, task)}
                              className={`text-sm font-semibold cursor-pointer hover:text-indigo-300 transition ${
                                task.status === 'Completed'
                                  ? 'line-through text-slate-400'
                                  : 'text-slate-100'
                              }`}
                            >
                              {task.title}
                            </h4>

                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                              {task.explanation}
                            </p>

                            {task.practiceExercises && (
                              <div className="mt-2 text-xs text-indigo-300/80 flex items-center gap-1.5 font-mono">
                                <span>🎯 Practice:</span>
                                <span>{task.practiceExercises}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons for Task */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Add to today's study plan"
                              onClick={() => handleAddTaskToPlanner(task)}
                              className="text-slate-400 hover:text-indigo-300"
                            >
                              <CalendarPlus className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Plan</span>
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenTaskDetails(stage.id, task)}
                              className="text-xs"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              Details
                            </Button>

                            {task.status !== 'Completed' ? (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => updateTaskStatus(stage.id, task.id, 'Completed')}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Complete
                              </Button>
                            ) : (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => reopenTask(stage.id, task.id)}
                                className="text-slate-300"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Reopen
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <Modal
          isOpen={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
          title={selectedTask.task.title}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo" size="sm">
                {selectedTask.task.category}
              </Badge>
              <Badge variant="warning" size="sm">
                Difficulty: {selectedTask.task.difficulty}
              </Badge>
              <Badge variant="outline" size="sm">
                Priority: {selectedTask.task.priority}
              </Badge>
              <span className="font-mono text-slate-400">
                Est: {selectedTask.task.estimatedHours} Hours
              </span>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 text-sm mb-1">Deep Explanation</h5>
              <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {selectedTask.task.explanation}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <h5 className="font-bold text-slate-200 mb-1">Prerequisites</h5>
                <p className="text-slate-400">{selectedTask.task.prerequisites || 'None'}</p>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <h5 className="font-bold text-slate-200 mb-1">Completion Criteria</h5>
                <p className="text-slate-400">
                  {selectedTask.task.completionCriteria || 'All tests verified'}
                </p>
              </div>
            </div>

            {selectedTask.task.learningResources?.length > 0 && (
              <div>
                <h5 className="font-bold text-slate-200 mb-2">Curated Official Learning Resources</h5>
                <div className="space-y-1.5">
                  {selectedTask.task.learningResources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-indigo-300 hover:bg-indigo-950/60 transition"
                    >
                      <span>{res.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Personal Study Notes */}
            <div>
              <h5 className="font-bold text-slate-200 mb-1">Your Personal Study Notes</h5>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Log your takeaways, edge cases, or code snippets here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <div className="flex justify-end mt-1.5">
                <Button variant="outline" size="sm" onClick={handleSaveNotes}>
                  Save Notes
                </Button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleAddTaskToPlanner(selectedTask.task);
                  setSelectedTask(null);
                }}
              >
                <CalendarPlus className="w-3.5 h-3.5 mr-1" />
                Add to Daily Planner
              </Button>

              <div className="flex items-center gap-2">
                {selectedTask.task.status !== 'Completed' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      updateTaskStatus(selectedTask.stageId, selectedTask.task.id, 'Completed');
                      setSelectedTask(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Mark as Completed
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      reopenTask(selectedTask.stageId, selectedTask.task.id);
                      setSelectedTask(null);
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Reopen Task
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Custom Task Modal */}
      <Modal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        title="Add Custom Preparation Task"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateCustomTask} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Stage</label>
            <select
              value={customStageId}
              onChange={(e) => setCustomStageId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            >
              {roadmap.stages.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. Master Monotonic Queue & Deque problems"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Explanation</label>
            <textarea
              rows={2}
              value={customExplanation}
              onChange={(e) => setCustomExplanation(e.target.value)}
              placeholder="What specific concept or system will you master?"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Difficulty</label>
              <select
                value={customDifficulty}
                onChange={(e) => setCustomDifficulty(e.target.value as TaskDifficulty)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Priority</label>
              <select
                value={customPriority}
                onChange={(e) => setCustomPriority(e.target.value as TaskPriority)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCustomModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Task to Roadmap
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
