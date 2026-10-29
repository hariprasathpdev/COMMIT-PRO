import React from 'react';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'indigo' | 'outline' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}) {
  const variantStyles = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
    warning: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
    danger: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
    indigo: 'bg-indigo-950/70 text-indigo-300 border-indigo-700/60',
    purple: 'bg-violet-950/70 text-violet-300 border-violet-700/60',
    outline: 'bg-transparent text-slate-300 border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = '',
  onClick,
  hoverEffect = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-900/80 border border-slate-800/90 rounded-xl p-5 shadow-sm backdrop-blur-sm ${
        hoverEffect
          ? 'transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 hover:shadow-md cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  title,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}) {
  const variantStyles = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 active:scale-[0.98]',
    glow:
      'bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 active:scale-[0.98]',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 active:scale-[0.98]',
    outline:
      'border border-slate-700 hover:border-slate-600 text-slate-200 hover:bg-slate-800/50 active:scale-[0.98]',
    ghost: 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg font-medium',
    md: 'text-sm px-4 py-2 rounded-lg font-medium',
    lg: 'text-base px-6 py-2.5 rounded-xl font-semibold',
  };

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-2xl',
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full ${maxWidth} bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/50">
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
