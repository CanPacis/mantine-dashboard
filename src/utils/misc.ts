export function createFallDown(index: number, max: number) {
  return {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: {
      opacity: 0,
      transform: `translateY(-${((index * 100) / max) * 2}%)`,
    },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
  };
}

export function createSlideIn(index: number, max: number) {
  return {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: {
      opacity: 0,
      transform: `translateX(-${((index * 100) / max) * 2}%)`,
    },
    common: { transformOrigin: 'left' },
    transitionProperty: 'transform, opacity',
  };
}
