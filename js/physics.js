import { clamp } from './utils.js'

export function computePhysiscsAndTarget(state) {
  let leftTorque = 0,
    rightTorque = 0,
    sumL = 0,
    sumR = 0
  for (const o of state.objects) {
    // all objects on plank
    const dist = Math.abs(o.x) // mesure distance from center
    if (o.x < 0) {
      leftTorque += o.weight * dist
      sumL += o.weight
    } else if (o.x > 0) {
      rightTorque += o.weight * dist
      sumR += o.weight
    }
  }
  const torqueDiff = rightTorque - leftTorque
  const target = clamp(torqueDiff / 30, -30, 30) //divide to reduce angle

  state.targetAngle = target

  return {
    sumL,
    sumR,
    leftTorque: Math.round(leftTorque),
    rightTorque: Math.round(rightTorque),
    targetAngle: target,
  }
}
