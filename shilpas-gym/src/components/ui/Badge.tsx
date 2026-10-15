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
    persimmon: 'bg-[#FF6747] text-white',
    periwinkle: 'bg-[#8177FF] text-white',
    botanical: 'bg-[#174D3B] text-[#F5F2EA]',
    mineral: 'bg-[#EDE9DF] text-[#20231F]',
    carbon: 'bg-[#20231F] text-[#F5F2EA]',
    live: 'bg-[#174D3B] text-[#F5F2EA] inline-flex items-center gap-2 font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-sm transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {variant === 'live' && (
        <span className="w-2 h-2 rounded-full bg-[#FF6747] inline-block" />
      )}
      {children}
    </span>
  );
};
