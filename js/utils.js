export const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
export const round = (v, p = 1) => Math.round(v * 10 ** p) / 10 ** p

// random number between a and b
export const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
