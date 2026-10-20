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

  // Use refs for values needed inside drawCanvas to avoid stale closures
  // and prevent useCallback identity changes that would destroy the loader
  const isMobileRef = useRef<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < mobileBreakpoint : false
  );
  const lastDrawnImageRef = useRef<HTMLImageElement | null>(null);
  const hasCanvasPaintedRef = useRef<boolean>(false);

  const [showPosterFallback, setShowPosterFallback] = useState(true);

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

  const activeSequencePath = isMobileRef.current && mobileSequence ? mobileSequence : sequencePath;
  const activeFrameCount = isMobileRef.current && mobileFrameCount ? mobileFrameCount : frameCount;
  const activeEndFrame = endFrame ?? activeFrameCount;

  /**
   * Core canvas draw function.
   * Uses refs instead of state for isMobile to keep callback identity stable
   * and prevent the loader effect from re-running (which would destroy + recreate
   * the loader before images finish loading).
   */
  const drawCanvas = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const loader = loaderRef.current;
      let img: HTMLImageElement | null | undefined;

      if (prefersReducedMotion) {
        img = loader?.getPoster();
      } else {
        img = loader?.getNearestFrame(frameIndex) ?? loader?.getPoster();
      }

      // Fallback to the last successfully drawn image to prevent blank frames
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = lastDrawnImageRef.current;
      }

      // If still no valid image, do NOT clear — keep whatever is on the canvas
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Remember this image as fallback for future frames during fast scrubbing
      lastDrawnImageRef.current = img;

      const dpr = isMobileRef.current
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();

      // Guard against zero-dimension canvas (element not yet laid out)
      if (rect.width === 0 || rect.height === 0) return;

      const targetCanvasWidth = Math.round(rect.width * dpr);
      const targetCanvasHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      // Clear only because we have a valid image to paint immediately after
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
        // contain
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

      // Hide poster fallback <img> after first successful canvas paint
      if (!hasCanvasPaintedRef.current) {
        hasCanvasPaintedRef.current = true;
        setShowPosterFallback(false);
      }
    },
    // IMPORTANT: isMobile is read via ref, not state, so it's NOT in this array.
    // This keeps drawCanvas identity stable so the loader effect doesn't re-run.
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

  // Resize and motion preference listeners
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const handleResize = () => {
      isMobileRef.current = window.innerWidth < mobileBreakpoint;
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
        lastDrawnImageRef.current = posterImg;
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
      onFrameLoaded: (frameNum) => {
        // When a frame near the current scrub position finishes loading,
        // re-render to upgrade from the nearest-neighbor approximation
        if (Math.abs(frameNum - activeFrameRef.current) <= 4) {
          // Force a new rAF even if one is pending so the fresh frame gets painted
          isRenderPendingRef.current = false;
          requestFrameRender(activeFrameRef.current);
        }
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

  // Scroll-driven frame rendering (sticky scroll progress)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let inView = true;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        // When section scrolls into view, immediately try to paint
        if (entry.isIntersecting) {
          requestFrameRender(activeFrameRef.current);
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(container);

    const handleScroll = () => {
      if (!inView) return;
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

    // Initial paint attempt — try repeatedly in case images aren't loaded yet
    handleScroll();
    const retryTimer = setTimeout(() => {
      isRenderPendingRef.current = false;
      handleScroll();
    }, 500);

    return () => {
      clearTimeout(retryTimer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startFrame, activeEndFrame, prefersReducedMotion, requestFrameRender]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${prefersReducedMotion ? 'min-h-[100svh]' : ''} ${className}`}
      style={{
        height: prefersReducedMotion ? 'auto' : `calc(100vh + ${scrollDistance})`,
      }}
    >
      {/* Pure CSS Sticky viewport */}
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden bg-[#F5F2EA]">
        {/* Poster fallback — visible until the canvas paints its first frame */}
        {showPosterFallback && (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
            style={{
              objectFit: objectFit === 'cover' ? 'cover' : 'contain',
              objectPosition: 'center',
            }}
          />
        )}

        {/* Canvas for scroll-driven frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
        />

        {/* Foreground Content */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-12">
          {children}
        </div>
      </div>
    </div>
  );
};
