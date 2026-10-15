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
  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
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

  const baseStyles = "group relative inline-flex items-center justify-center font-sans font-bold tracking-wider transition-all duration-300 rounded-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6747] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2EA] overflow-hidden";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-2 uppercase",
    md: "text-sm px-6 py-3 gap-2.5 uppercase",
    lg: "text-base px-8 py-4 gap-3 uppercase tracking-widest",
  };

  const variantStyles = {
    primary: "bg-[#FF6747] hover:bg-[#E04E2F] text-white shadow-[0_10px_25px_-5px_rgba(255,103,71,0.35)] hover:shadow-[0_15px_30px_rgba(255,103,71,0.5)]",
    secondary: "bg-[#20231F] hover:bg-[#174D3B] text-[#F5F2EA] shadow-xs hover:shadow-md",
    botanical: "bg-[#174D3B] hover:bg-[#20231F] text-[#F5F2EA] border border-[#174D3B]",
    outline: "bg-transparent text-[#20231F] border border-[#20231F]/20 hover:border-[#FF6747] hover:text-[#FF6747]",
    ghost: "bg-transparent text-[#20231F]/80 hover:text-[#20231F] hover:bg-[#20231F]/5",
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...(props as unknown as React.ComponentProps<typeof motion.button>)}
    >
      {/* Subtle shine sweep on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

      {icon && iconPosition === 'left' && (
        <span className="transition-transform group-hover:-translate-x-1 duration-200">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform group-hover:translate-x-1 duration-200">{icon}</span>
      )}
    </motion.button>
  );
};
