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
    ? 'bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px] transition-all duration-300'
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
    return { ...style, ...highlightStyle };
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
                className: `${icon.props.className || 'w-3.5 h-3.5 shrink-0'}`,
                style: { color: highlighted ? activeAccent : '#FAC417', ...icon.props.style }
              })}
            </div>
          )}
          <div 
            className="text-[12px] font-bold font-heading mt-1 text-center"
            style={{ color: highlighted ? activeAccent : '#ffffff' }}
          >
            {value}
          </div>
          <div className={`text-[8px] text-center truncate leading-none ${highlighted ? 'text-white' : 'text-gray-400'}`}>
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
