export function renderObjects(objectsEl, state) {
  objectsEl.innerHTML = ''
  const half = state.plankLength / 2

  for (const o of state.objects) {
    const el = document.createElement('div')
    el.className = 'obj'
    el.dataset.side = o.x < 0 ? 'L' : o.x > 0 ? 'R' : 'C'

    el.style.left = o.x + half - 12 + 'px' // 12 is half of object

    el.title = `${o.weight} kg ${Math.abs(Math.round(o.x))} px ${
      o.x < 0 ? 'left' : o.x > 0 ? 'right' : 'center'
    }`
    el.innerHTML = `<small>${o.weight}</small>`
    objectsEl.appendChild(el)
  }
}
