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
  // Variant styling classes
  const variantClasses = {
    primary: 'bg-[#FAC417] text-slate-900 hover:bg-[#E5B210] font-semibold shadow-sm focus:ring-[#FAC417]/30',
    secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-200/50',
    dark: 'bg-slate-950 text-white hover:bg-slate-900 focus:ring-slate-900/30',
    danger: 'bg-[#FF1744] text-white hover:bg-[#D50000] focus:ring-[#FF1744]/30',
    ghost: 'bg-transparent text-gray-600 hover:text-slate-900 hover:bg-gray-100/50 focus:ring-gray-100',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-full',
    md: 'px-5 py-2.5 text-sm rounded-full',
    lg: 'px-7 py-3 text-base rounded-full',
  };

  const baseClasses = 'inline-flex items-center justify-center gap-2 font-heading transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

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
