import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'persimmon' | 'periwinkle' | 'botanical' | 'mineral' | 'carbon' | 'live';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'carbon',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider font-mono uppercase',
    md: 'text-xs px-3.5 py-1 tracking-widest font-mono uppercase',
  };

  const variantStyles = {
    persimmon: 'bg-[#FF6747]/10 text-[#FF6747] border border-[#FF6747]/30',
    periwinkle: 'bg-[#8177FF]/10 text-[#6256E0] border border-[#8177FF]/30',
    botanical: 'bg-[#174D3B]/10 text-[#174D3B] border border-[#174D3B]/25',
    mineral: 'bg-white/80 text-[#20231F] border border-[#20231F]/10 shadow-xs',
    carbon: 'bg-[#20231F]/5 text-[#20231F]/80 border border-[#20231F]/15',
    live: 'bg-[#174D3B]/10 text-[#174D3B] border border-[#174D3B]/30 inline-flex items-center gap-2 font-mono uppercase font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-sm transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {variant === 'live' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6747] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6747]"></span>
        </span>
      )}
      {children}
    </span>
  );
};
