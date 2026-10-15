import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  easing?: (t: number) => number;
}

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useLenis = () => useContext(SmoothScrollContext);

export default useLenis;
