import { clamp, round } from './utils.js'

const plankEl = document.getElementById('plank') // the clickable plank element
const readout = document.getElementById('readout') // the text element

const PLANK_LENGTH = parseFloat(
  // get plank length from CSS
  getComputedStyle(document.documentElement).getPropertyValue('--plank-length')
)

function getCenteredXFromClick(e, targetEl) {
  // calculate centered x from click event
  const rect = targetEl.getBoundingClientRect() // get element bounds
  const localX = e.clientX - rect.left // [0,width]
  const centered = localX - rect.width / 2 // [-L/2, +L/2]
  // boundrys
  return clamp(centered, -PLANK_LENGTH / 2, PLANK_LENGTH / 2) // limit length for clicks
}

// process of click events
plankEl.addEventListener('click', (e) => {
  const rect = plankEl.getBoundingClientRect()
  if (e.clientY < rect.top || e.clientY > rect.bottom) return //top and bottom boundrys

  const x = getCenteredXFromClick(e, plankEl) //position of click
  const side = x < 0 ? 'LEFT' : x > 0 ? 'RIGHT' : 'CENTER'

  const absX = Math.abs(round(x, 0))
  readout.textContent = `Click @ ${side} · x = ${round(
    x,
    0
  )} px (|x| = ${absX}px) / plank half = ${PLANK_LENGTH / 2}px` // update readout
})
