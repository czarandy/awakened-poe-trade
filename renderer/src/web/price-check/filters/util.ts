function decimalPlaces (value: number, dp: number | boolean): number {
  if (typeof dp === 'number') {
    return dp
  } else if (!dp || Math.abs(value) >= 10) {
    return 0
  } else {
    return (Math.abs(value) < 2.3) ? 2 : 1
  }
}

export function roundRoll (value: number, dp: boolean) {
  const rounding = Math.pow(10, decimalPlaces(value, dp))
  return Math.trunc(value * rounding) / rounding
}

// Sentinel for `searchStatRange`, alongside `0` meaning "exact value".
// Negative so it can never collide with a real percentage.
export const STAT_RANGE_ROUND = -1

// Snaps to a "round" value a buyer would actually type into trade: multiples
// of 5 below 50, multiples of 10 at or above it. Widens outward like
// `percentRoll` does — `Math.floor` for the min side, `Math.ceil` for the max
// side — so the item always falls inside its own filter (42 -> 40+).
export function roundedRoll (
  value: number,
  method: Math['floor'] | Math['ceil'],
  dp: boolean
): number {
  const places = decimalPlaces(value, dp)

  // Single-digit whole numbers (+3 to level of gems, 5 sockets) have no useful
  // breakpoint between them, so leave them alone.
  if (places === 0 && Math.abs(value) < 10) {
    return roundRoll(value, dp)
  }

  // Fractional stats round on the same breakpoints scaled by 10, so 6.4 goes
  // 64 -> 60 -> 6.0 instead of collapsing to 5.
  const scale = (places > 0) ? 10 : 1
  const scaled = value * scale

  const step = (Math.abs(scaled) < 50) ? 5 : 10
  const steps = scaled / step
  // Scaling can land a float tick under an exact breakpoint (4.5 * 10 / 5),
  // where Math.floor would drop a whole step.
  const rounded = method(
    (Math.abs(steps - Math.round(steps)) < 1e-9) ? Math.round(steps) : steps
  ) * step

  // Rolls below the first breakpoint (a +2, a +4) would snap to 0, which drops
  // the constraint entirely and matches every item. Keep those exact instead.
  return (rounded === 0 && value !== 0) ? roundRoll(value, dp) : rounded / scale
}

export function percentRoll (
  value: number,
  p: number,
  method: Math['floor'] | Math['ceil'],
  dp: number | boolean = false
): number {
  const res = value + Math.abs(value) * p / 100
  const rounding = Math.pow(10, decimalPlaces(value, dp))
  return method((res + Number.EPSILON) * rounding) / rounding
}

export function percentRollDelta (
  value: number,
  delta: number,
  p: number,
  method: Math['floor'] | Math['ceil'],
  dp = false
): number {
  const res = value + delta * p / 100
  const rounding = Math.pow(10, decimalPlaces(value, dp))
  return method((res + Number.EPSILON) * rounding) / rounding
}
