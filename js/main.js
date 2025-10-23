import { clamp, round, randInt } from './utils.js'
import { computePhysiscsAndTarget } from './physics.js'
import { renderHUD, renderObjects } from './render.js'
import { saveState, loadState, clearState } from './storage.js'

const plankEl = document.getElementById('plank') // the clickable plank element
const readout = document.getElementById('readout') // the text element
const objectsEl = document.getElementById('objects') // the objects container

const massLEl = document.getElementById('massL')
const massREl = document.getElementById('massR')
const angleValEl = document.getElementById('angleVal')
const resetBtn = document.getElementById('resetBtn')
const nextWeightEl = document.getElementById('nextWeight')

const hudEls = {
  massL: massLEl,
  massR: massREl,
  angleVal: angleValEl,
  nextW: nextWeightEl,
}

const PLANK_LENGTH = parseFloat(
  // get plank length from CSS
  getComputedStyle(document.documentElement).getPropertyValue('--plank-length')
)

const state = {
  plankLength: PLANK_LENGTH,
  angle: 0,
  targetAngle: 0, // angle from physics
  objects: [], // x: px and weight: kg
  metrics: { sumL: 0, sumR: 0, targetAngle: 0 },
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

resetBtn?.addEventListener('click', () => {
  state.objects = [] // clear objects
  state.targetAngle = 0
  state.metrics = { sumL: 0, sumR: 0, targetAngle: 0 }
  renderObjects(objectsEl, state)
  renderHUD(hudEls, state.metrics, state.angle)
  readout.textContent = ''
  updateReadoutVisibility()
  loop()
  saveState(state) // save cleared state
})
let nextWeight = null
function ensureNextWeight() {
  if (nextWeight == null) nextWeight = randInt(1, 10)
  return nextWeight
}

/************ TODO Ghost object for previewing placement ****************
const ghostEl = document.createElement('div')
ghostEl.className = 'ghost'
objectsEl.appendChild(ghostEl)


function showGhostAt(clientX) {
  const w = ensureNextWeight()
  const x = getCenteredXFromClick(clientX, plankEl)
  const half = state.plankLength / 2
  const size = Math.round(16 + (44 - 16) * ((w - 1) / 9))
  ghostEl.style.setProperty('--obj-size', size + 'px')
  ghostEl.style.left = x + half - size / 2 + 'px'
  ghostEl.classList.add('show')
}

function hideGhost() {
  ghostEl.classList.remove('show')
}

function handleGhostMove(e) {
  const rect = plankEl.getBoundingClientRect()

  const insideY = e.clientY >= rect.top - 8 && e.clientY <= rect.bottom + 8
  if (!insideY) {
    hideGhost()
    return
  }
  showGhostAt(e.clientX)
}

plankEl.addEventListener('pointerenter', (e) => {
  ensureNextWeight()
  showGhostAt(e.clientX)
})

plankEl.addEventListener('pointermove', (e) => {
  showGhostAt(e.clientX)
})

plankEl.addEventListener('pointerleave', hideGhost)
***************FAILED AND DELAYED **************/

// process of click events
plankEl.addEventListener('click', (e) => {
  const rect = plankEl.getBoundingClientRect()
  if (e.clientY < rect.top || e.clientY > rect.bottom) return //top and bottom boundrys

  const x = getCenteredXFromClick(e, plankEl) //position of click
  const weight = ensureNextWeight()
  nextWeight = null // for next weight

  state.objects.push({ x, weight })

  const metrics = computePhysiscsAndTarget(state)
  state.metrics = metrics

  renderHUD(hudEls, metrics, state.angle, ensureNextWeight()) // update HUD
  renderObjects(objectsEl, state) // update visual objects

  const last = objectsEl.lastElementChild
  if (last) {
    last.classList.add('fall')
  }

  const side = x < 0 ? 'LEFT' : x > 0 ? 'RIGHT' : 'CENTER'
  const logLine =
    `Added: ${weight} kg ${round(x, 0)} px (${side}): ` +
    `Torque L/R: ${metrics.leftTorque}/${metrics.rightTorque}, Angle: ${round(
      metrics.targetAngle,
      1
    )}deg`

  readout.textContent += logLine + '\n'
  readout.scrollTop = readout.scrollHeight
  updateReadoutVisibility()

  saveState(state) // save to localStorage

  /*readout.textContent =
    `Added: ${weight} kg ${round(x, 0)} px (${side} | ` +
    `Mass L/R: ${metrics.sumL} kg / ${metrics.sumR} kg | ` +
    `Torque L/R: ${metrics.leftTorque} / ${metrics.rightTorque} | ` +
    `Target Angle: ${round(metrics.targetAngle, 1)} degrees |` +
    `Current Angle: ${round(state.angle, 1)} degrees`
  // update readout
  */
})
// initialize from storage

/*******************Drag n drpp******************/
let dragging = null
objectsEl.addEventListener('pointerdown', (e) => {
  const target = e.target.closest('.obj')
  if (!target) return
  e.preventDefault()

  const idx = Number(target.dataset.idx)
  if (Number.isNaN(idx)) return

  dragging = { idx }
  target.setPointerCapture?.(e.pointerId)
})

objectsEl.addEventListener('pointermove', (e) => {
  if (!dragging) return
  const idx = dragging.idx
  const x = getCenteredXFromClick(e, plankEl)
  state.objects[idx].x = x

  const el = objectsEl.querySelector(`.obj[data-idx="${idx}"]`)
  if (el) {
    const size = parseFloat(getComputedStyle(el).getPropertyValue('--obj-size'))
    const half = state.plankLength / 2
    el.style.left = x + half - size / 2 + 'px' // for drag position update
    el.dataset.side = x < 0 ? 'L' : x > 0 ? 'R' : 'C'
  }

  state.metrics = computePhysiscsAndTarget(state)
  renderHUD(hudEls, state.metrics, state.angle, ensureNextWeight())
})

function endDrag(e) {
  if (!dragging) return
  dragging = null
  renderObjects(objectsEl, state)
  state.metrics = computePhysiscsAndTarget(state)
  renderHUD(hudEls, state.metrics, state.angle, ensureNextWeight())
  saveState(state)
}
objectsEl.addEventListener('pointerup', endDrag)
objectsEl.addEventListener('pointercancel', endDrag)
;(function initFromStorage() {
  const data = loadState()
  if (!data) {
    applyAngle()
    renderHUD(hudEls, state.metrics, state.angle, ensureNextWeight())
    return
  }

  state.plankLength = data.plankLength || PLANK_LENGTH
  state.angle = typeof data.angle === 'number' ? data.angle : 0
  state.targetAngle =
    typeof data.targetAngle === 'number' ? data.targetAngle : 0
  state.objects = data.objects.map((o) => ({ x: o.x, weight: o.weight }))

  renderObjects(objectsEl, state)
  if (state.objects.length) {
    state.metrics = computePhysiscsAndTarget(state)
  }

  applyAngle()
  renderHUD(hudEls, state.metrics, state.angle, ensureNextWeight())

  updateReadoutVisibility()
})()

let rafId = null
function loop() {
  const prev = state.angle
  state.angle = prev + (state.targetAngle - prev) * 0.03 // smooth transition
  if (Math.abs(state.angle - state.targetAngle) < 0.05)
    state.angle = state.targetAngle
  if (prev !== state.angle) {
    applyAngle()
    renderHUD(hudEls, state.metrics, state.angle, ensureNextWeight()) // update HUD
  }
  rafId = requestAnimationFrame(loop)
}

function updateReadoutVisibility() {
  const hasText = readout.textContent.trim().length > 0
  readout.classList.toggle('open', hasText)
}

applyAngle()
loop()
