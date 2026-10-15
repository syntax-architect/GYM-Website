export type PreloadStrategy = 'progressive' | 'eager' | 'keyframes-first' | 'on-demand';
export type ObjectFitMode = 'cover' | 'contain';

export interface SequenceConfig {
  id: string;
  name: string;
  sequencePath: string; // Base path e.g. '/assets/sequences/a01-hero'
  frameCount: number; // e.g. 192
  width: number; // Native width (e.g. 848)
  height: number; // Native height (e.g. 478)
  aspectRatio?: number; // default 16/9
  poster: string; // Path to poster image
  startFrame?: number; // 1-indexed (default 1)
  endFrame?: number; // 1-indexed (default frameCount)
  scrub?: boolean | number; // GSAP scrub inertia (default 0.8)
  scrollDistance?: string; // Container scroll track height (e.g. '220vh')
  mobileSequence?: string; // Dedicated mobile path e.g. '/assets/sequences/a01-hero/mobile'
  mobileFrameCount?: number; // e.g. 96
  mobileBreakpoint?: number; // default 768
  objectFit?: ObjectFitMode; // default 'cover'
  preloadStrategy?: PreloadStrategy; // default 'progressive'
}

export interface SequenceProgress {
  loaded: number;
  total: number;
  percentage: number;
  isInitialReady: boolean;
  isComplete: boolean;
}
