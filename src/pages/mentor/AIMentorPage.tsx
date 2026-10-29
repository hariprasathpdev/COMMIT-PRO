import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import {
  Sparkles,
  Send,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  Lightbulb,
  Code2,
  Briefcase,
  HelpCircle,
} from 'lucide-react';

export function AIMentorPage() {
  const {
    mentorMessages,
    sendMentorMessage,
    clearMentorChat,
    isMentorThinking,
    userProfile,
  } = useApp();

  const [inputContent, setInputContent] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mentorMessages, isMentorThinking]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputContent.trim() || isMentorThinking) return;
    const msg = inputContent;
    setInputContent('');
    await sendMentorMessage(msg);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    'Explain Dynamic Programming (0/1 Knapsack) with step-by-step intuition',
    `Conduct a 15-minute Technical Mock Interview for ${userProfile?.targetRole || 'SDE'}`,
    'How do I answer: "Tell me about a time you resolved a major bug under deadline pressure"?',
    'Review my portfolio project architecture and suggest 3 scalability improvements',
    'What should my daily 3-hour study schedule look like this week?',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-violet-400" />
              Commit Pro AI Career Mentor
            </h1>
            <Badge variant="purple" size="sm">
              Powered by Gemini
            </Badge>
          </div>
          <p className="text-xs text-slate-400">
            Context-aware placement advisor, technical interviewer, and algorithm coach tuned for {userProfile?.targetRole}.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={clearMentorChat}
          className="border-slate-800 text-slate-400 hover:text-rose-400"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1" />
          Clear Conversation
        </Button>
      </div>

      {/* Main Chat Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col h-[650px] shadow-xl overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {mentorMessages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-violet-950 border border-violet-800/60 flex items-center justify-center text-violet-400 shrink-0 shadow-sm mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm relative group ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-950/80 border border-slate-800/90 text-slate-200 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  <div>{msg.content}</div>

                  {!isUser && (
                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Gemini Career Coach</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-slate-200 flex items-center gap-1 transition"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5 font-bold text-xs">
                    {userProfile?.fullName?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
            );
          })}

          {isMentorThinking && (
            <div className="flex gap-3 text-xs items-center text-slate-400">
              <div className="w-8 h-8 rounded-xl bg-violet-950 border border-violet-800/60 flex items-center justify-center text-violet-400 shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 px-4 rounded-tl-none">
                <span className="animate-pulse">Analyzing context & formulating response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Quick Prompts:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputContent(prompt);
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 whitespace-nowrap shrink-0 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Ask mentor to explain algorithms, review code, or conduct mock interview..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />

          <Button
            type="submit"
            variant="glow"
            size="md"
            disabled={!inputContent.trim() || isMentorThinking}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
