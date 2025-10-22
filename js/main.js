import { clamp, round, randInt } from './utils.js'
import { computePhysiscsAndTarget } from './physics.js'
import { renderObjects } from './render.js'

const plankEl = document.getElementById('plank') // the clickable plank element
const readout = document.getElementById('readout') // the text element
const objectsEl = document.getElementById('objects') // the objects container

const PLANK_LENGTH = parseFloat(
  // get plank length from CSS
  getComputedStyle(document.documentElement).getPropertyValue('--plank-length')
)

const state = {
  plankLength: PLANK_LENGTH,
  angle: 0,
  targetAngle: 0, // angle from physics
  objects: [], // x: px and weight: kg
}
//window.state = state // fpr debug

// calculate centered x from click event
function getCenteredXFromClick(e, targetEl) {
  const rect = targetEl.getBoundingClientRect() // get element bounds
  const localX = e.clientX - rect.left // [0,width]
  const centered = localX - rect.width / 2 // [-L/2, +L/2]
  // boundrys
  return clamp(centered, -PLANK_LENGTH / 2, PLANK_LENGTH / 2) // limit length for clicks
}

function applyAngle() {
  plankEl.style.transform = `translateX(-50%) rotate(${state.angle.toFixed(
    3
  )}deg)`
}

// process of click events
plankEl.addEventListener('click', (e) => {
  const rect = plankEl.getBoundingClientRect()
  if (e.clientY < rect.top || e.clientY > rect.bottom) return //top and bottom boundrys

  const x = getCenteredXFromClick(e, plankEl) //position of click
  const weight = randInt(1, 10)

  state.objects.push({ x, weight })

  const metrics = computePhysiscsAndTarget(state)
  const side = x < 0 ? 'LEFT' : x > 0 ? 'RIGHT' : 'CENTER'

  renderObjects(objectsEl, state) // update visual objects

  const logLine =
    `Added: ${weight} kg ${round(x, 0)} px (${side})` +
    `Torque L/R: ${metrics.leftTorque}/${
      metrics.rightTorque
    }, Target Angle: ${round(metrics.targetAngle, 1)}deg`

  readout.textContent += logLine + '\n'
  readout.scrollTop = readout.scrollHeight

  /*readout.textContent =
    `Added: ${weight} kg ${round(x, 0)} px (${side} | ` +
    `Mass L/R: ${metrics.sumL} kg / ${metrics.sumR} kg | ` +
    `Torque L/R: ${metrics.leftTorque} / ${metrics.rightTorque} | ` +
    `Target Angle: ${round(metrics.targetAngle, 1)} degrees |` +
    `Current Angle: ${round(state.angle, 1)} degrees`
  // update readout*/
})

let rafId = null
function loop() {
  const prev = state.angle
  state.angle = prev + (state.targetAngle - prev) * 0.03 // smooth transition
  if (Math.abs(state.angle - state.targetAngle) < 0.05)
    state.angle = state.targetAngle
  if (prev !== state.angle) applyAngle()
  rafId = requestAnimationFrame(loop)
}

applyAngle()
loop()
