const REGISTRY = {
  drop: new Audio('assets/drop.mp3'),
  drag: new Audio('assets/drag.mp3'),
  reset: new Audio('assets/reset.mp3'),
}

export function playSound(name, opts = {}) {
  const a = REGISTRY[name]
  if (!a) return
  const node = a.cloneNode()
  node.volume = typeof opts.volume === 'number' ? opts.volume : 0.3
  node.play().catch(() => {})
}

export function setDefaultVolume(v = 0.3) {
  Object.values(REGISTRY).forEach((a) => (a.volume = v))
}
