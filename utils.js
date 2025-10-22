export const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
export const round = (v, p = 1) => Math.round(v * 10 ** p) / 10 ** p
