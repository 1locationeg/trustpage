import React from 'react';

export default function StatTile({
  id,
  value,
  label,
  icon,
  variant = 'dark', // 'dark' | 'light'
  highlighted = false,
  activeAccent = '#FAC417',
  className = '',
  style,
  ...props
}) {
  const isDark = variant === 'dark';
  
  const baseClasses = isDark
    ? 'bg-[#0A1128]/60 rounded-lg border border-white/5 flex flex-col justify-between transition-all duration-300'
    : 'flex flex-col items-center p-4 transition-all duration-300';

  // Highlight style logic for visual editor and active state rotator
  const getCombinedStyle = () => {
    let highlightStyle = {};
    if (highlighted && isDark) {
      highlightStyle = {
        borderColor: activeAccent,
        backgroundColor: `${activeAccent}15`,
        boxShadow: `0 0 12px ${activeAccent}35`,
        transform: 'scale(1.05)',
      };
    }
    const fluidStyle = isDark ? {
      padding: 'clamp(0.35rem, 1.5vw, 0.6rem)',
      minHeight: 'clamp(50px, 14vw, 65px)',
    } : {};
    return { ...style, ...fluidStyle, ...highlightStyle };
  };

  return (
    <div
      id={id}
      className={`${baseClasses} ${className}`}
      style={getCombinedStyle()}
      {...props}
    >
      {isDark ? (
        <>
          {icon && (
            <div className="flex items-center justify-center">
              {React.cloneElement(icon, {
                className: 'shrink-0',
                style: { 
                  color: highlighted ? activeAccent : '#FAC417', 
                  width: 'clamp(11px, 2.5vw, 14px)',
                  height: 'clamp(11px, 2.5vw, 14px)',
                  ...icon.props.style 
                }
              })}
            </div>
          )}
          <div 
            className="font-bold font-heading text-center"
            style={{ 
              color: highlighted ? activeAccent : '#ffffff',
              fontSize: 'clamp(10px, 2.5vw, 13px)',
              marginTop: 'clamp(2px, 0.5vw, 4px)'
            }}
          >
            {value}
          </div>
          <div 
            className={`text-center truncate leading-none ${highlighted ? 'text-white' : 'text-gray-400'}`}
            style={{ fontSize: 'clamp(6.5px, 1.6vw, 8.5px)' }}
          >
            {label}
          </div>
        </>
      ) : (
        <>
          {icon && <div className="mb-2 text-[#0A3D62]">{icon}</div>}
          <span className="text-2xl font-extrabold text-slate-900 font-heading">{value}</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 text-center">{label}</span>
        </>
      )}
    </div>
  );
}
