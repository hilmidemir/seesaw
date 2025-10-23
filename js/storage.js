const STORAGE_KEY = 'seesaw-case'

export function saveState(state) {
  const objs = Array.isArray(state?.objects) ? state.objects : []

  const data = {
    version: 1,
    plankLength: Number(state?.plankLength) || 400,
    angle: typeof state?.angle === 'number' ? state.angle : 0,
    targetAngle: typeof state?.targetAngle === 'number' ? state.targetAngle : 0,
    objects: objs.map((o) => ({ x: o.x, weight: o.weight })),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    console.log('state saved to local')
  } catch (e) {
    console.warn('Failed to save state to localStorage', e)
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    console.log('[storage] load raw =', raw)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || !Array.isArray(data.objects)) return null
    return data
  } catch (e) {
    console.warn('Failed to load state from localStorage', e)
    return null
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('Failed to clear state from localStorage', e)
  }
}
