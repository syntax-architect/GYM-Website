import type { SequenceProgress, PreloadStrategy } from '../types/sequence';

export interface LoaderOptions {
  startFrame?: number;
  endFrame?: number;
  preloadStrategy?: PreloadStrategy;
  concurrency?: number;
  onProgress?: (progress: SequenceProgress) => void;
  onInitialReady?: (initialFrame: HTMLImageElement) => void;
}

export class FrameSequenceLoader {
  private basePath: string;
  private frameCount: number;
  private posterUrl: string;
  private startFrame: number;
  private endFrame: number;
  private preloadStrategy: PreloadStrategy;
  private concurrency: number;

  public get totalFrameCount(): number {
    return this.frameCount;
  }
  
  private frames: Map<number, HTMLImageElement> = new Map();
  private loadedIndices: number[] = [];
  private failedIndices: Set<number> = new Set();
  private posterImage: HTMLImageElement | null = null;

  private isCancelled: boolean = false;
  private isInitialReady: boolean = false;
  private isComplete: boolean = false;
  private activeDownloads: number = 0;
  private queue: number[] = [];

  private onProgress?: (progress: SequenceProgress) => void;
  private onInitialReady?: (initialFrame: HTMLImageElement) => void;

  constructor(
    basePath: string,
    frameCount: number,
    posterUrl: string,
    options: LoaderOptions = {}
  ) {
    this.basePath = basePath.replace(/\/+$/, '');
    this.frameCount = frameCount;
    this.posterUrl = posterUrl;
    this.startFrame = options.startFrame ?? 1;
    this.endFrame = options.endFrame ?? frameCount;
    this.preloadStrategy = options.preloadStrategy ?? 'progressive';
    this.concurrency = options.concurrency ?? 4;
    this.onProgress = options.onProgress;
    this.onInitialReady = options.onInitialReady;
  }

  /**
   * Generates the zero-padded URL for a given 1-indexed frame number
   */
  public getFrameUrl(frameNumber: number): string {
    const padded = String(frameNumber).padStart(4, '0');
    return `${this.basePath}/${padded}.webp`;
  }

  /**
   * Start intelligent preloading sequence
   */
  public start(): void {
    if (this.isCancelled) return;

    // 1. Immediately load poster
    this.loadPoster();

    // 2. Preload Frame 1 immediately for instant paint
    this.loadSingleFrame(this.startFrame)
      .then((img) => {
        if (this.isCancelled) return;
        if (!this.isInitialReady) {
          this.isInitialReady = true;
          this.onInitialReady?.(img);
          this.emitProgress();
        }
      })
      .catch((err) => {
        console.warn(`[FrameSequenceLoader] Initial frame ${this.startFrame} load failed:`, err);
      });

    // 3. Build preload queue according to strategy
    this.buildQueue();

    // 4. Start processing queue progressively
    this.processQueue();
  }

  /**
   * Load the fallback poster frame
   */
  private loadPoster(): void {
    if (!this.posterUrl) return;
    const img = new Image();
    img.src = this.posterUrl;
    img.onload = () => {
      if (this.isCancelled) return;
      this.posterImage = img;
      if (!this.isInitialReady && this.frames.size === 0) {
        this.isInitialReady = true;
        this.onInitialReady?.(img);
        this.emitProgress();
      }
    };
  }

  /**
   * Build download queue with prioritized keyframes
   */
  private buildQueue(): void {
    const totalFrames = this.endFrame - this.startFrame + 1;
    const allFrames: number[] = [];
    for (let f = this.startFrame; f <= this.endFrame; f++) {
      if (f !== this.startFrame) {
        allFrames.push(f);
      }
    }

    if (this.preloadStrategy === 'eager') {
      // Linear load
      this.queue = allFrames;
      return;
    }

    // Keyframes-first / progressive:
    // First pass: step frames (e.g. every 8th or 12th frame) to ensure full scrub coverage immediately
    const step = Math.max(4, Math.floor(totalFrames / 12));
    const keyframes: number[] = [];
    const remaining: number[] = [];

    for (const f of allFrames) {
      if ((f - this.startFrame) % step === 0 || f === this.endFrame) {
        keyframes.push(f);
      } else {
        remaining.push(f);
      }
    }

    // Queue: keyframes first, then intermediate frames
    this.queue = [...keyframes, ...remaining];
  }

  /**
   * Process queue with bounded concurrency and idle scheduling
   */
  private processQueue(): void {
    if (this.isCancelled) return;

    while (this.activeDownloads < this.concurrency && this.queue.length > 0) {
      const nextFrame = this.queue.shift();
      if (nextFrame === undefined) break;

      this.activeDownloads++;
      this.loadSingleFrame(nextFrame)
        .finally(() => {
          this.activeDownloads--;
          if (!this.isCancelled) {
            // Schedule next frame during browser idle time or next tick
            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
              window.requestIdleCallback(() => this.processQueue(), { timeout: 100 });
            } else {
              setTimeout(() => this.processQueue(), 10);
            }
          }
        });
    }

    if (this.queue.length === 0 && this.activeDownloads === 0) {
      this.isComplete = true;
      this.emitProgress();
    }
  }

  /**
   * Load and asynchronously decode a single frame
   */
  private async loadSingleFrame(frameNumber: number): Promise<HTMLImageElement> {
    if (this.frames.has(frameNumber)) {
      return this.frames.get(frameNumber)!;
    }

    const url = this.getFrameUrl(frameNumber);
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = async () => {
        if (this.isCancelled) {
          resolve(img);
          return;
        }

        // Decode in background to prevent scroll-time canvas jank
        if ('decode' in img) {
          try {
            await img.decode();
          } catch {
            // Ignore decode failures, browser will decode on draw
          }
        }

        this.frames.set(frameNumber, img);
        this.insertSortedIndex(frameNumber);
        this.emitProgress();
        resolve(img);
      };

      img.onerror = (err) => {
        this.failedIndices.add(frameNumber);
        this.emitProgress();
        reject(err);
      };

      img.src = url;
    });
  }

  private insertSortedIndex(index: number): void {
    // Binary insert into sorted array for fast nearest-neighbor lookups
    let low = 0;
    let high = this.loadedIndices.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (this.loadedIndices[mid] < index) low = mid + 1;
      else high = mid;
    }
    this.loadedIndices.splice(low, 0, index);
  }

  private emitProgress(): void {
    if (this.isCancelled || !this.onProgress) return;
    const total = this.endFrame - this.startFrame + 1;
    const loaded = this.frames.size;
    const percentage = Math.round((loaded / total) * 100);

    this.onProgress({
      loaded,
      total,
      percentage,
      isInitialReady: this.isInitialReady,
      isComplete: this.isComplete || loaded >= total,
    });
  }

  /**
   * Get exact frame by 1-indexed number
   */
  public getFrame(frameNumber: number): HTMLImageElement | null {
    return this.frames.get(frameNumber) ?? null;
  }

  /**
   * Get nearest loaded frame to prevent blank flicker during high-speed scrubbing
   */
  public getNearestFrame(frameNumber: number): HTMLImageElement | null {
    if (this.frames.has(frameNumber)) {
      return this.frames.get(frameNumber)!;
    }

    if (this.loadedIndices.length === 0) {
      return this.posterImage;
    }

    // Binary search for closest loaded frame
    let low = 0;
    let high = this.loadedIndices.length - 1;
    let closestIndex = this.loadedIndices[0];
    let minDiff = Math.abs(closestIndex - frameNumber);

    while (low <= high) {
      const mid = (low + high) >>> 1;
      const val = this.loadedIndices[mid];
      const diff = Math.abs(val - frameNumber);

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = val;
      }

      if (val === frameNumber) {
        closestIndex = val;
        break;
      } else if (val < frameNumber) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return this.frames.get(closestIndex) ?? this.posterImage;
  }

  public getPoster(): HTMLImageElement | null {
    return this.posterImage;
  }

  /**
   * Release resources and cancel background downloads
   */
  public destroy(): void {
    this.isCancelled = true;
    this.queue = [];
    this.frames.clear();
    this.loadedIndices = [];
    this.failedIndices.clear();
    this.posterImage = null;
  }
}
