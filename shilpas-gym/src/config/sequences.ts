import type { SequenceConfig } from '../types/sequence';

export const SEQUENCES: Record<string, SequenceConfig> = {
  A01: {
    id: 'a01-hero',
    name: 'A01 Hero Scroll Master',
    sequencePath: '/assets/sequences/a01-hero',
    frameCount: 192,
    width: 848,
    height: 478,
    aspectRatio: 16 / 9,
    poster: '/assets/sequences/a01-hero/poster.webp',
    startFrame: 1,
    endFrame: 192,
    scrub: 0.8,
    scrollDistance: '220vh',
    mobileSequence: '/assets/sequences/a01-hero/mobile',
    mobileFrameCount: 96,
    mobileBreakpoint: 768,
    objectFit: 'cover',
    preloadStrategy: 'progressive',
  },
  A08: {
    id: 'a08-signature',
    name: 'A08 Signature Scroll Sequence',
    sequencePath: '/assets/sequences/a08-signature',
    frameCount: 192,
    width: 848,
    height: 478,
    aspectRatio: 16 / 9,
    poster: '/assets/sequences/a08-signature/poster.webp',
    startFrame: 1,
    endFrame: 192,
    scrub: 0.8,
    scrollDistance: '200vh',
    mobileSequence: '/assets/sequences/a08-signature/mobile',
    mobileFrameCount: 96,
    mobileBreakpoint: 768,
    objectFit: 'cover',
    preloadStrategy: 'progressive',
  },
  A19: {
    id: 'a19',
    name: 'A19 Locked Reel',
    sequencePath: '/assets/sequences/a19',
    frameCount: 192,
    width: 848,
    height: 478,
    aspectRatio: 16 / 9,
    poster: '/assets/sequences/a19/poster.webp',
    startFrame: 1,
    endFrame: 192,
    scrub: 0.8,
    scrollDistance: '200vh',
    mobileSequence: '/assets/sequences/a19/mobile',
    mobileFrameCount: 96,
    mobileBreakpoint: 768,
    objectFit: 'cover',
    preloadStrategy: 'progressive',
  },
};

export function getSequenceConfig(id: string): SequenceConfig {
  const config = SEQUENCES[id.toUpperCase()];
  if (!config) {
    throw new Error(`Sequence config with ID "${id}" not found.`);
  }
  return config;
}
