/** Clamp scroll acceleration so a fast fling never makes the marquee frantic. */
export function marqueeSpeed(velocity: number) {
  return Math.max(0.7, Math.min(1.8, 1 + velocity / 3500));
}

/** Normalized cursor position within a cached hit rectangle. */
export function pointerOffset(x: number, y: number, rect: {left:number;top:number;width:number;height:number}, amount: number) {
  return {
    x: Math.max(-amount, Math.min(amount, ((x - rect.left) / Math.max(rect.width, 1) - 0.5) * amount * 2)),
    y: Math.max(-amount, Math.min(amount, ((y - rect.top) / Math.max(rect.height, 1) - 0.5) * amount * 2)),
  };
}
