import React from 'react';

export default function Badge({
  id,
  variant = 'neutral', // 'accent' | 'success' | 'danger' | 'neutral' | 'info'
  size = 'md', // 'sm' | 'md'
  className = '',
  style,
  children,
  ...props
}) {
  const variantClasses = {
    accent: 'bg-[#FAC417]/10 text-[#FAC417] border border-[#FAC417]/30',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    neutral: 'bg-white/5 text-gray-300 border border-white/10',
    info: 'bg-gray-100 text-[#0A3D62] border border-gray-200',
  };

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold tracking-wide uppercase rounded',
    md: 'px-2.5 py-1 text-[9px] sm:text-[10px] font-bold tracking-wide uppercase rounded-full',
  };

  const baseClasses = 'inline-flex items-center gap-1 font-sans select-none';
  const fullClassName = `${baseClasses} ${variantClasses[variant] || variantClasses.neutral} ${sizeClasses[size] || sizeClasses.md} ${className}`;

  return (
    <span
      id={id}
      className={fullClassName}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
}
