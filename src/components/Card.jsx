import React from 'react';

export default function Card({
  id,
  tag: Tag = 'div',
  variant = 'clean', // 'clean' | 'preview' | 'dark' | 'glass' | 'custom'
  className = '',
  style,
  children,
  ...props
}) {
  // 2026 visual language variant style maps
  const variantClasses = {
    clean: 'bg-white border border-gray-150 shadow-premium-soft rounded-[24px] p-6 hover:shadow-premium-hover hover:scale-[1.015] hover:-translate-y-0.5',
    preview: 'bg-white border border-gray-200/80 shadow-premium-hover rounded-[28px] p-6',
    dark: 'bg-gradient-to-br from-[#0B1329] via-[#050A1C] to-[#0D162B] border border-white/10 text-white rounded-[28px] p-5 shadow-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
    glass: 'bg-white/70 backdrop-blur-md border border-white/50 shadow-premium-soft rounded-[24px] p-6 hover:bg-white/85 hover:shadow-premium-hover hover:scale-[1.015] hover:-translate-y-0.5',
    custom: '',
  };

  const baseClasses = 'transition-all duration-300 relative overflow-hidden';
  const fullClassName = `${baseClasses} ${variantClasses[variant] || variantClasses.clean} ${className}`;

  return (
    <Tag
      id={id}
      className={fullClassName}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  );
}
