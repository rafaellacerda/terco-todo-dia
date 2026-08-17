export type TBeadSize = 'cross' | 'large' | 'small' | 'medal'

export type TDotPos = { x: number; y: number; size: TBeadSize }

export type TRosaryLayout = { loopTotal: number; decadeSize: number }

export const SIZE_PX: Record<Exclude<TBeadSize, 'cross'>, number> = {
  small: 12,
  large: 16,
  medal: 16,
}

export function getDotPos(
  dot: number,
  loopTotal = 55,
  decadeSize = 11,
): TDotPos {
  if (dot === 0) return { x: 50, y: 122, size: 'cross' }
  if (dot === 1) return { x: 50, y: 117, size: 'large' }
  if (dot === 2) return { x: 50, y: 108, size: 'small' }
  if (dot === 3) return { x: 50, y: 99, size: 'small' }
  if (dot === 4) return { x: 50, y: 90, size: 'small' }
  if (dot === 5) return { x: 50, y: 78, size: 'medal' }
  const loopIdx = dot - 6
  const t = loopIdx / (loopTotal - 1)
  const theta = ((15 + t * 330) * Math.PI) / 180
  return {
    x: 50 + 34 * Math.sin(theta),
    y: 45 + 30 * Math.cos(theta),
    size: loopIdx % decadeSize === 0 ? 'large' : 'small',
  }
}

export function layoutFor(category: string, key: string): TRosaryLayout {
  if (category === 'arcanjo' && key === 'miguel')
    return { loopTotal: 36, decadeSize: 4 }
  if (category === 'misericordia') return { loopTotal: 50, decadeSize: 10 }
  if (category === 'dores') return { loopTotal: 49, decadeSize: 7 }
  if (category === 'franciscana' || category === 'espiritosanto')
    return { loopTotal: 70, decadeSize: 10 }
  if (category === 'jose') return { loopTotal: 7, decadeSize: 1 }
  if (category === 'bento') return { loopTotal: 60, decadeSize: 10 }
  return { loopTotal: 55, decadeSize: 11 }
}
