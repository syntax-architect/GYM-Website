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
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-sm px-3 py-1 font-medium',
    md: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  const variantStyles = {
    persimmon: 'bg-[#D9381E] text-white',
    periwinkle: 'bg-[#C5A059] text-white',
    botanical: 'bg-[#141311] text-[#F5F2EA]',
    mineral: 'bg-[#EDE9DF] text-[#0D0D0E]',
    carbon: 'bg-[#0D0D0E] text-[#F5F2EA]',
    live: 'bg-[#141311] text-[#F5F2EA] inline-flex items-center gap-2 font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-sm transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {variant === 'live' && (
        <span className="w-2 h-2 rounded-full bg-[#D9381E] inline-block" />
      )}
      {children}
    </span>
  );
};
