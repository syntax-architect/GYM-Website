import React, { useRef, useState, useCallback, useEffect } from 'react';

export interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default: 8)
  scale?: number; // scale on hover (default: 1.02)
  glowColor?: string; // radial glow color (default: 'rgba(217, 56, 30, 0.12)')
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glowColor = 'rgba(217, 56, 30, 0.12)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const isReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotionRef.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });

    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle 240px at ${x}px ${y}px, ${glowColor}, transparent 80%)`,
      transition: 'opacity 0.2s ease',
    });
  }, [maxTilt, scale, glowColor]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
    setGlowStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative will-change-transform ${className}`}
    >
      {/* Specular Radial Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity"
        style={glowStyle}
        aria-hidden="true"
      />
      {children}
    </div>
  );
};
