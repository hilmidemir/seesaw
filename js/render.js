function sizeFromWeight(w) {
  const min = 16,
    max = 44
  return Math.round(min + (max - min) * ((w - 1) / 9))
}

export function renderObjects(objectsEl, state) {
  objectsEl.querySelectorAll('.obj').forEach((el) => el.remove())
  const half = state.plankLength / 2

  state.objects.forEach((o, idx) => {
    const el = document.createElement('div')
    el.className = 'obj'
    el.dataset.side = o.x < 0 ? 'L' : o.x > 0 ? 'R' : 'C'

    el.dataset.idx = idx
    el.dataset.weight = o.weight
    const size = sizeFromWeight(o.weight)
    el.style.setProperty('--obj-size', size + 'px')

    el.style.left = o.x + half - 12 + 'px' // 12 is half of object
    el.title = `${o.weight} kg ${Math.abs(Math.round(o.x))} px ${
      o.x < 0 ? 'left' : o.x > 0 ? 'right' : 'center'
    }`
    el.innerHTML = `<small>${o.weight}</small>`
    objectsEl.appendChild(el)
  })
}

export function renderHUD(hudEls, metrics, currentAngle, nexwtWeight) {
  const { massL, massR, angleVal, nextW } = hudEls
  massL.textContent = metrics.sumL + ' KG'
  massR.textContent = metrics.sumR + ' KG'
  if (angleVal) angleVal.textContent = Math.round(currentAngle * 10) / 10 + '°'
  if (nextW)
    nextW.textContent = nexwtWeight != null ? `${nexwtWeight} KG` : '---'
}
