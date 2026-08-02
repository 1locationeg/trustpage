import React from 'react';

export default function Button({
  id,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'dark' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
  onClick,
  style,
  children,
  ...props
}) {
  // 2026 visual language button styling configurations
  const variantClasses = {
    primary: 'bg-gradient-to-br from-[#FAC417] via-[#FAC417] to-[#E5B210] text-slate-950 hover:shadow-[0_6px_22px_rgba(250,196,23,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] font-bold border-t border-white/25',
    secondary: 'bg-white/40 backdrop-blur-sm border border-gray-250 text-gray-700 hover:bg-white/80 hover:border-gray-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] font-medium shadow-sm',
    dark: 'bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] font-semibold border-t border-white/10',
    danger: 'bg-gradient-to-br from-[#FF1744] to-[#D50000] text-white hover:shadow-[0_6px_22px_rgba(255,23,68,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] font-bold border-t border-white/20',
    ghost: 'bg-transparent text-gray-600 hover:text-slate-900 hover:bg-gray-150/50 active:scale-[0.97] font-medium',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-full',
    md: 'px-6 py-3 text-sm rounded-full',
    lg: 'px-8 py-3.5 text-base rounded-full',
  };

  const baseClasses = 'inline-flex items-center justify-center gap-2 font-heading transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const fullClassName = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`;

  return (
    <button
      id={id}
      type={type}
      className={fullClassName}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
