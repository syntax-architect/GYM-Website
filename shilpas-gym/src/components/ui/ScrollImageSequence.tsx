import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FrameSequenceLoader } from '../../utils/frameSequenceLoader';
import type { SequenceProgress, ObjectFitMode } from '../../types/sequence';

export interface ScrollImageSequenceProps {
  sequencePath: string;
  frameCount: number;
  width: number;
  height: number;
  poster: string;
  startFrame?: number;
  endFrame?: number;
  mobileSequence?: string;
  mobileFrameCount?: number;
  mobileBreakpoint?: number;
  scrollDistance?: string; // e.g. '180vh'
  objectFit?: ObjectFitMode;
  className?: string;
  children?: React.ReactNode;
}

export const ScrollImageSequence: React.FC<ScrollImageSequenceProps> = ({
  sequencePath,
  frameCount,
  width,
  height,
  poster,
  startFrame = 1,
  endFrame,
  mobileSequence,
  mobileFrameCount,
  mobileBreakpoint = 768,
  scrollDistance = '180vh',
  objectFit = 'cover',
  className = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<FrameSequenceLoader | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < mobileBreakpoint;
    }
    return false;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [, setProgress] = useState<SequenceProgress>({
    loaded: 0,
    total: frameCount,
    percentage: 0,
    isInitialReady: false,
    isComplete: false,
  });

  const activeFrameRef = useRef<number>(startFrame);
  const rafIdRef = useRef<number | null>(null);
  const isRenderPendingRef = useRef<boolean>(false);

  const activeSequencePath = isMobile && mobileSequence ? mobileSequence : sequencePath;
  const activeFrameCount = isMobile && mobileFrameCount ? mobileFrameCount : frameCount;
  const activeEndFrame = endFrame ?? activeFrameCount;

  const drawCanvas = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const loader = loaderRef.current;
      const img = prefersReducedMotion
        ? loader?.getPoster()
        : loader?.getNearestFrame(frameIndex) ?? loader?.getPoster();

      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetCanvasWidth = Math.round(rect.width * dpr);
      const targetCanvasHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgRatio = (img.naturalWidth || width) / (img.naturalHeight || height);
      const canvasRatio = canvas.width / canvas.height;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (objectFit === 'cover') {
        if (canvasRatio > imgRatio) {
          drawW = canvas.width;
          drawH = canvas.width / imgRatio;
          drawX = 0;
          drawY = (canvas.height - drawH) / 2;
        } else {
          drawH = canvas.height;
          drawW = canvas.height * imgRatio;
          drawX = (canvas.width - drawW) / 2;
          drawY = 0;
        }
      } else {
        if (canvasRatio > imgRatio) {
          drawH = canvas.height;
          drawW = canvas.height * imgRatio;
          drawX = (canvas.width - drawW) / 2;
          drawY = 0;
        } else {
          drawW = canvas.width;
          drawH = canvas.width / imgRatio;
          drawX = 0;
          drawY = (canvas.height - drawH) / 2;
        }
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [objectFit, prefersReducedMotion, width, height]
  );

  const requestFrameRender = useCallback(
    (frameIndex: number) => {
      activeFrameRef.current = frameIndex;
      if (!isRenderPendingRef.current) {
        isRenderPendingRef.current = true;
        rafIdRef.current = requestAnimationFrame(() => {
          drawCanvas(activeFrameRef.current);
          isRenderPendingRef.current = false;
        });
      }
    },
    [drawCanvas]
  );

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const handleResize = () => {
      const mob = window.innerWidth < mobileBreakpoint;
      setIsMobile((prev) => (prev !== mob ? mob : prev));
      requestFrameRender(activeFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint, requestFrameRender]);

  // Load image sequence frames
  useEffect(() => {
    if (prefersReducedMotion) {
      const posterImg = new Image();
      posterImg.src = poster;
      posterImg.onload = () => {
        drawCanvas(startFrame);
        setProgress({
          loaded: 1,
          total: 1,
          percentage: 100,
          isInitialReady: true,
          isComplete: true,
        });
      };
      return;
    }

    const loader = new FrameSequenceLoader(activeSequencePath, activeFrameCount, poster, {
      startFrame,
      endFrame: activeEndFrame,
      preloadStrategy: 'progressive',
      concurrency: 4,
      onProgress: (p) => setProgress(p),
      onInitialReady: () => {
        requestFrameRender(startFrame);
      },
    });

    loaderRef.current = loader;
    loader.start();

    return () => {
      loader.destroy();
      loaderRef.current = null;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [activeSequencePath, activeFrameCount, activeEndFrame, startFrame, poster, prefersReducedMotion, drawCanvas, requestFrameRender]);

  // Rock-solid sticky scroll progress calculation without GSAP pin conflicts
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Progress from 0 (when top hits top of viewport) to 1 (when bottom reaches bottom)
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const targetFrame = Math.round(startFrame + progress * (activeEndFrame - startFrame));
      requestFrameRender(targetFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startFrame, activeEndFrame, prefersReducedMotion, requestFrameRender]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${prefersReducedMotion ? 'min-h-screen' : ''} ${className}`}
      style={{
        height: prefersReducedMotion ? 'auto' : `calc(100vh + ${scrollDistance})`,
      }}
    >
      {/* Pure CSS Sticky viewport: Never conflicts with layout or multiplies scroll space */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F5F2EA] flex flex-col justify-between">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none brightness-[1.0] contrast-[1.02]"
        />

        {/* Ambient mineral edge gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EA]/90 via-transparent to-[#F5F2EA]/50 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EA]/60 via-transparent to-[#F5F2EA]/60 pointer-events-none z-10" />

        {/* Foreground Content */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between pt-24 pb-12">
          {children}
        </div>
      </div>
    </div>
  );
};
