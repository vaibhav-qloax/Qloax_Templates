/**
 * One motion vocabulary for the whole site.
 * Transform and opacity only. Durations stay short enough for a business site.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

export const STAGGER = 0.08;

/** Viewport settings shared by every in-view reveal. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;
