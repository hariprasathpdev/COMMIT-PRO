import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge, Modal, StatusBadge } from '../../components/ui/UIComponents';
import { DailyTaskItem, StudySession } from '../../types';
import {
  CalendarCheck,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Flame,
  Calendar,
  CheckCircle2,
  Trash2,
  BookOpen,
  Volume2,
  VolumeX,
} from 'lucide-react';

export function DailyPlannerPage() {
  const {
    dailyTasks,
    addDailyTask,
    toggleDailyTask,
    rescheduleDailyTask,
    deleteDailyTask,
    studySessions,
    logStudySession,
    stats,
    userProfile,
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Timer State (Pomodoro 25m or Stopwatch mode)
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'stopwatch'>('pomodoro');
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('DSA Practice');
  const [sessionNotes, setSessionNotes] = useState('');

  // Add Task Modal State
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('DSA');
  const [taskMinutes, setTaskMinutes] = useState(45);

  // Manual Log Session Modal State
  const [isManualLogOpen, setIsManualLogOpen] = useState(false);
  const [manualSubject, setManualSubject] = useState('DSA & Core CS');
  const [manualDuration, setManualDuration] = useState(60);
  const [manualNotes, setManualNotes] = useState('');

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (timerMode === 'pomodoro') {
            if (prev <= 1) {
              setIsTimerRunning(false);
              logStudySession(currentSubject, 25, 'Completed 25-minute Pomodoro focus block');
              return 25 * 60;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerMode, currentSubject]);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(timerMode === 'pomodoro' ? 25 * 60 : 0);
  };

  const handleFinishStopwatchSession = () => {
    if (timerSeconds < 60) return;
    const minutes = Math.round(timerSeconds / 60);
    logStudySession(currentSubject, minutes, sessionNotes || 'Focused study sprint');
    handleResetTimer();
    setSessionNotes('');
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    addDailyTask({
      title: taskTitle,
      category: taskCategory,
      estimatedMinutes: taskMinutes,
      completedMinutes: 0,
      date: selectedDate,
      notes: '',
    });
    setTaskTitle('');
    setIsAddTaskOpen(false);
  };

  const handleManualLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logStudySession(manualSubject, manualDuration, manualNotes);
    setIsManualLogOpen(false);
    setManualNotes('');
  };

  // Filter tasks for selected date
  const tasksForSelectedDate = dailyTasks.filter((t) => t.date === selectedDate);
  const completedCount = tasksForSelectedDate.filter((t) => t.isCompleted).length;
  const totalMinutesPlanned = tasksForSelectedDate.reduce((acc, t) => acc + t.estimatedMinutes, 0);

  // Generate 7-day calendar navigation strip
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 2 + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    const hasTasks = dailyTasks.some((t) => t.date === dateStr);
    return { dateStr, dayName, dayNum, isToday: dateStr === todayStr, hasTasks };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-indigo-400" />
            Daily Planner & Focus Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build unshakeable preparation consistency with Pomodoro sessions and daily milestone tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsManualLogOpen(true)}
            className="border-slate-700"
          >
            <Clock className="w-3.5 h-3.5 mr-1" />
            Log Offline Hours
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddTaskOpen(true)}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Daily Task
          </Button>
        </div>
      </div>

      {/* Week Day Selector Strip */}
      <div className="grid grid-cols-7 gap-2 bg-slate-900/60 border border-slate-800 p-2 rounded-2xl">
        {weekDays.map((day) => {
          const isSelected = selectedDate === day.dateStr;
          return (
            <button
              key={day.dateStr}
              onClick={() => setSelectedDate(day.dateStr)}
              className={`p-2.5 rounded-xl text-center transition cursor-pointer flex flex-col items-center justify-center relative ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'hover:bg-slate-800/80 text-slate-300'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider">
                {day.dayName}
              </span>
              <span className="text-sm font-black font-mono mt-0.5">{day.dayNum}</span>
              {day.isToday && (
                <span className="text-[9px] font-semibold text-indigo-300 font-mono">Today</span>
              )}
              {day.hasTasks && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Daily Checklist & Rescheduling */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">
                  Tasks for {selectedDate === todayStr ? 'Today' : selectedDate}
                </h3>
                <span className="text-xs text-slate-400">
                  {completedCount}/{tasksForSelectedDate.length} Completed • {totalMinutesPlanned} mins planned
                </span>
              </div>
              <Badge variant="indigo" size="sm">
                Target: {userProfile?.dailyHours || 3.5}h daily
              </Badge>
            </div>

            {tasksForSelectedDate.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl">
                <CalendarCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium">No tasks logged for this day.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddTaskOpen(true)}
                  className="mt-3 text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Task
                </Button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {tasksForSelectedDate.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                      task.isCompleted
                        ? 'bg-slate-950/40 border-slate-900 text-slate-400'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleDailyTask(task.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs transition cursor-pointer ${
                          task.isCompleted
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {task.isCompleted && '✓'}
                      </button>
                      <div>
                        <span
                          className={`text-xs font-semibold block ${
                            task.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
                          }`}
                        >
                          {task.title}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-400">{task.category}</span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {task.estimatedMinutes} mins
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge
                        status={task.isCompleted ? 'Completed' : 'In Progress'}
                        size="sm"
                      />
                      {!task.isCompleted && (
                        <button
                          title="Reschedule to Tomorrow"
                          onClick={() => {
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            rescheduleDailyTask(task.id, tomorrow.toISOString().split('T')[0]);
                          }}
                          className="text-slate-400 hover:text-amber-400 p-1.5 rounded hover:bg-slate-800 text-[11px] flex items-center gap-1 transition"
                        >
                          <span>Postpone</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteDailyTask(task.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Past Study Sessions Log Table */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-100 text-sm">Recent Logged Focus Sessions</h3>
              <span className="text-xs text-slate-400 font-mono">
                {studySessions.length} Sessions Logged
              </span>
            </div>

            <div className="space-y-2">
              {studySessions.slice(0, 5).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-200">{session.subject}</div>
                    <div className="text-[11px] text-slate-400">{session.notes}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-indigo-400">
                      {session.durationMinutes} mins
                    </span>
                    <div className="text-[10px] text-slate-400">{session.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Interactive Study Session Timer & Pomodoro */}
        <div className="space-y-6">
          <Card className="text-center p-6 border-indigo-900/40 bg-gradient-to-b from-indigo-950/20 via-slate-900 to-slate-950">
            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => {
                  setTimerMode('pomodoro');
                  setTimerSeconds(25 * 60);
                  setIsTimerRunning(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  timerMode === 'pomodoro'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 border border-slate-800 text-slate-400'
                }`}
              >
                Pomodoro (25m)
              </button>
              <button
                onClick={() => {
                  setTimerMode('stopwatch');
                  setTimerSeconds(0);
                  setIsTimerRunning(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  timerMode === 'stopwatch'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 border border-slate-800 text-slate-400'
                }`}
              >
                Stopwatch Focus
              </button>
            </div>

            <div className="my-6">
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
                {formatTimer(timerSeconds)}
              </div>
              <div className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-wide">
                {timerMode === 'pomodoro' ? 'Focus Sprint' : 'Open Study Session'}
              </div>
            </div>

            {/* Subject Selector */}
            <div className="mb-4 text-left">
              <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                Active Topic / Subject
              </label>
              <input
                type="text"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant={isTimerRunning ? 'secondary' : 'glow'}
                size="md"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="min-w-[120px]"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current mr-1" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current mr-1" /> Start Focus
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleResetTimer}
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              {timerMode === 'stopwatch' && timerSeconds >= 60 && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleFinishStopwatchSession}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Log
                </Button>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
                Streak: {stats.currentStreakDays} days
              </span>
              <span>Total: {stats.totalStudyHours} hrs</span>
            </div>
          </Card>

          {/* Weekly Review Card */}
          <Card className="p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
              Weekly Preparation Review
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              You are maintaining an average of{' '}
              <span className="font-bold text-white">
                {(stats.totalStudyHours / 4).toFixed(1)} hrs/week
              </span>
              . Top recommendation: solve 2 high-frequency tree and graph problems this weekend to complete Stage 2.
            </p>
          </Card>
        </div>
      </div>

      {/* Add Daily Task Modal */}
      <Modal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        title="Add Daily Preparation Task"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Solve 3Sum and Container With Most Water"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Category</label>
            <select
              value={taskCategory}
              onChange={(e) => setTaskCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            >
              <option value="DSA">DSA & Algorithms</option>
              <option value="Core CS">Core CS (OS/DBMS/CN)</option>
              <option value="Portfolio">Portfolio Project</option>
              <option value="Interview Prep">Interview Questions & HR</option>
              <option value="Aptitude">Quantitative Aptitude</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Estimated Minutes</label>
            <input
              type="number"
              min="15"
              max="240"
              step="15"
              value={taskMinutes}
              onChange={(e) => setTaskMinutes(parseInt(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Task
            </Button>
          </div>
        </form>
      </Modal>

      {/* Manual Study Log Modal */}
      <Modal
        isOpen={isManualLogOpen}
        onClose={() => setIsManualLogOpen(false)}
        title="Log Offline Study Hours"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleManualLogSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Subject / Focus</label>
            <input
              type="text"
              required
              value={manualSubject}
              onChange={(e) => setManualSubject(e.target.value)}
              placeholder="e.g. Dynamic Programming (Knapsack)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Duration (Minutes)</label>
            <input
              type="number"
              min="10"
              max="600"
              step="10"
              value={manualDuration}
              onChange={(e) => setManualDuration(parseInt(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Session Takeaways & Notes</label>
            <textarea
              rows={3}
              value={manualNotes}
              onChange={(e) => setManualNotes(e.target.value)}
              placeholder="Key concepts grasped or problems solved..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setIsManualLogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Session Log
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
