import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollContext, type ScrollToOptions, type SmoothScrollContextValue } from './useLenis';

gsap.registerPlugin(ScrollTrigger);

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // Calibrate Lenis for high-performance fluid scroll on both desktop & mobile
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: isTouch ? 1.25 : 1.0,
      syncTouch: true,
      autoResize: true,
      autoRaf: false, // Unified single rAF ticker driven by GSAP
    });

    lenisRef.current = lenis;
    queueMicrotask(() => {
      setLenisInstance(lenis);
    });

    // Expose lenis globally for debugging & fine-tuning
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize requestAnimationFrame with GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Global in-page anchor click interception for smooth animated glide
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(href, {
            offset: -95,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, options?: ScrollToOptions) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -95,
        duration: options?.duration ?? 1.2,
        immediate: options?.immediate ?? false,
        easing: options?.easing,
      });
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const contextValue = useMemo<SmoothScrollContextValue>(
    () => ({
      lenis: lenisInstance,
      scrollTo,
      stop,
      start,
    }),
    [lenisInstance, scrollTo, stop, start]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
