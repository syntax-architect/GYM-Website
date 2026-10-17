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
    x.set((e.clientX - centerX) * 0.18);
    y.set((e.clientY - centerY) * 0.18);
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

  // Agency-grade button foundation: rounded pill, distinct tactile border, inner bevel highlight
  const baseStyles = "group relative inline-flex items-center justify-center font-sans font-extrabold tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6747] focus-visible:ring-offset-2 select-none active:scale-[0.97]";

  const sizeStyles = {
    sm: "text-xs min-h-[42px] px-5 py-2 gap-2.5 uppercase",
    md: "text-xs sm:text-sm min-h-[48px] px-6 py-2.5 sm:py-3 gap-3 uppercase",
    lg: "text-sm sm:text-base min-h-[54px] px-8 py-3.5 gap-3.5 uppercase",
  };

  const variantStyles = {
    primary: "bg-[#FF6747] text-[#20231F] border border-white/30 shadow-[0_4px_16px_rgba(255,103,71,0.28),inset_0_1px_0_rgba(255,255,255,0.4)] hover:bg-[#20231F] hover:text-[#F5F2EA] hover:border-black/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
    secondary: "bg-[#20231F] text-[#F5F2EA] border border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-[#174D3B] hover:border-white/20 hover:shadow-[0_8px_20px_rgba(23,77,59,0.3)]",
    botanical: "bg-[#174D3B] text-[#F5F2EA] border border-white/10 shadow-[0_4px_14px_rgba(23,77,59,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#20231F] hover:border-[#FF6747]/40 hover:shadow-[0_8px_22px_rgba(0,0,0,0.25)]",
    outline: "bg-white/80 backdrop-blur-xs text-[#20231F] border-2 border-[#20231F]/20 hover:border-[#20231F] hover:bg-white shadow-xs hover:shadow-md",
    ghost: "bg-transparent text-[#20231F] border border-transparent hover:border-[#20231F]/20 hover:bg-white/60",
  };

  // High-End Agency "Button-in-Button" trailing icon capsule styling
  const iconCapsuleStyles = {
    primary: "bg-[#20231F]/10 text-[#20231F] group-hover:bg-white/20 group-hover:text-white",
    secondary: "bg-white/10 text-white group-hover:bg-[#FF6747] group-hover:text-[#20231F]",
    botanical: "bg-white/10 text-white group-hover:bg-[#FF6747] group-hover:text-[#20231F]",
    outline: "bg-[#20231F]/10 text-[#20231F] group-hover:bg-[#20231F] group-hover:text-white",
    ghost: "bg-[#20231F]/10 text-[#20231F] group-hover:bg-[#FF6747] group-hover:text-white",
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...(props as unknown as React.ComponentProps<typeof motion.button>)}
    >
      {icon && iconPosition === 'left' && (
        <span className={`w-7 h-7 sm:w-8 sm:h-8 -ml-1 rounded-full flex items-center justify-center transition-all duration-300 ease-out group-hover:-translate-x-0.5 group-hover:scale-105 flex-shrink-0 ${iconCapsuleStyles[variant]}`}>
          {icon}
        </span>
      )}
      <span className="relative z-10 font-bold">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={`w-7 h-7 sm:w-8 sm:h-8 -mr-1.5 rounded-full flex items-center justify-center transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:scale-110 flex-shrink-0 ${iconCapsuleStyles[variant]}`}>
          {icon}
        </span>
      )}
    </motion.button>
  );
};

