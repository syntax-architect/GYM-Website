import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const KineticCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | '3d' | 'play' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: coarse)').matches;
    }
    return true;
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid follower lag
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check cursor data attribute on target or parent
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor') as 'pointer' | '3d' | 'play' | 'view';
        setCursorType(val || 'pointer');
        return;
      }

      if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorType('pointer');
        return;
      }

      setCursorType('default');
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouch, isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#D9381E] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Fluid Trailing Aura Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorType === 'pointer' ? 48 : cursorType === '3d' || cursorType === 'play' || cursorType === 'view' ? 64 : 32,
          height: cursorType === 'pointer' ? 48 : cursorType === '3d' || cursorType === 'play' || cursorType === 'view' ? 64 : 32,
          borderColor: cursorType === '3d' ? '#C5A059' : cursorType === 'pointer' ? '#D9381E' : 'rgba(13, 13, 14, 0.25)',
          backgroundColor: cursorType === '3d' ? 'rgba(197, 160, 89, 0.12)' : cursorType === 'play' ? 'rgba(217, 56, 30, 0.15)' : cursorType === 'pointer' ? 'rgba(217, 56, 30, 0.08)' : 'rgba(245, 242, 234, 0.02)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      >
        <div className="w-full h-full rounded-full border border-inherit flex items-center justify-center">
          {cursorType === '3d' && (
            <span className="font-mono text-[9px] font-bold text-[#C5A059] uppercase tracking-wider select-none">
              ORBIT
            </span>
          )}
          {cursorType === 'play' && (
            <span className="font-mono text-[9px] font-bold text-[#D9381E] uppercase tracking-wider select-none">
              PLAY
            </span>
          )}
          {cursorType === 'view' && (
            <span className="font-mono text-[9px] font-bold text-[#0D0D0E] uppercase tracking-wider select-none">
              VIEW
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
};
