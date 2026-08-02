import React from 'react';

export default function Card({
  id,
  tag: Tag = 'div',
  variant = 'clean', // 'clean' | 'preview' | 'dark' | 'custom'
  className = '',
  style,
  children,
  ...props
}) {
  const variantClasses = {
    clean: 'bg-white border border-gray-200 shadow-sm rounded-xl p-6',
    preview: 'bg-white border border-gray-200 shadow-md rounded-2xl p-6',
    dark: 'bg-[#0B1329] border border-white/10 text-white shadow-2xl rounded-2xl p-5',
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
