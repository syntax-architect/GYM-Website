import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { sounds } from '../../utils/soundEffects';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'botanical';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  magnetic = false,
  onClick,
  onMouseEnter,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  // Magnetic spring offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22 });
  const springY = useSpring(y, { stiffness: 280, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    sounds.playHover();
    onMouseEnter?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sounds.playClick();
    onClick?.(e);
  };

  const baseStyles = "group relative inline-flex items-center justify-center font-sans font-bold tracking-wide transition-colors transition-transform duration-200 rounded-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6747] focus-visible:ring-offset-2 select-none";

  const sizeStyles = {
    sm: "text-sm min-h-[44px] px-5 py-2.5 gap-2 uppercase tracking-wider",
    md: "text-sm min-h-[48px] px-7 py-3.5 gap-2.5 uppercase tracking-wider",
    lg: "text-base min-h-[54px] px-9 py-4 gap-3 uppercase tracking-wider",
  };

  const variantStyles = {
    primary: "bg-[#FF6747] text-white hover:bg-[#E04E2F] active:bg-[#C84326]",
    secondary: "bg-[#20231F] text-[#F5F2EA] hover:bg-[#174D3B] active:bg-[#0D2B21]",
    botanical: "bg-[#174D3B] text-[#F5F2EA] hover:bg-[#20231F] active:bg-[#0E3024]",
    outline: "bg-transparent text-[#20231F] hover:bg-[#20231F]/5 active:bg-[#20231F]/10",
    ghost: "bg-transparent text-[#20231F] hover:bg-[#20231F]/5 active:bg-[#20231F]/10",
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...(props as unknown as React.ComponentProps<typeof motion.button>)}
    >
      {icon && iconPosition === 'left' && (
        <span className="transition-transform group-hover:-translate-x-0.5 duration-150">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform group-hover:translate-x-0.5 duration-150">{icon}</span>
      )}
    </motion.button>
  );
};
