import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button, Card, Modal } from '../../components/ui/UIComponents';
import { GitCommit, Sparkles, ArrowRight, ShieldCheck, Mail, Lock, User } from 'lucide-react';

export function AuthPage() {
  const { login, signup, demoLogin, setCurrentView } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signup(fullName, email, password);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    setTimeout(() => {
      setResetModalOpen(false);
      setResetSent(false);
      setResetEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Brand Header */}
      <div
        onClick={() => setCurrentView('landing')}
        className="flex items-center gap-2 mb-8 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
          <GitCommit className="w-6 h-6 stroke-[2.5]" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
          Commit Pro
        </span>
      </div>

      <div className="w-full max-w-md">
        <Card className="border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {isSignUp
                ? 'Begin your personalized 10-stage placement roadmap'
                : 'Sign in to access your dashboard and study sessions'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                College / University Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => setResetModalOpen(true)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="md"
              disabled={loading}
              className="w-full mt-2"
            >
              {loading ? 'Authenticating...' : isSignUp ? 'Create Free Account' : 'Sign In'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative bg-slate-900 px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Or Instant Demo Access
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={demoLogin}
            className="w-full border-indigo-700/50 hover:bg-indigo-950/30 text-indigo-300"
          >
            <Sparkles className="w-4 h-4 mr-1 text-indigo-400" />
            Sign in as Demo Student (Alex Chen)
          </Button>

          <div className="mt-6 text-center text-xs text-slate-400">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                New to Commit Pro?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Sign Up Free
                </button>
              </span>
            )}
          </div>
        </Card>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Encrypted Local & Server-Side Security Isolation</span>
        </div>
      </div>

      {/* Password Reset Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Reset Password"
        maxWidth="max-w-md"
      >
        {resetSent ? (
          <div className="p-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto text-lg font-bold">
              ✓
            </div>
            <h4 className="font-semibold text-slate-100">Reset Link Sent</h4>
            <p className="text-xs text-slate-400">
              We have dispatched password recovery instructions to {resetEmail}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <p className="text-xs text-slate-400">
              Enter your registered college email and we'll send a password recovery token.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setResetModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Send Instructions
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
