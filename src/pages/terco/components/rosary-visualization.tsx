import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import type { TStep } from '@/data/rosary/build-steps'
import { getDotPos, SIZE_PX, type TRosaryLayout } from '@/data/rosary/geometry'

type TBeadState = 'pending' | 'current' | 'done'

type TRosaryVisualizationProps = {
  steps: TStep[]
  stepIndex: number
  layout: TRosaryLayout
}

function chromeFor(state: TBeadState, size: string) {
  if (state === 'current') {
    return {
      background: 'oklch(26% 0.06 258)',
      borderColor: 'oklch(20% 0.05 258)',
      ring: true,
    }
  }
  if (state === 'done') {
    return {
      background: 'oklch(74% 0.13 83)',
      borderColor: 'oklch(60% 0.12 80)',
      ring: false,
    }
  }
  return {
    background: 'oklch(99% 0.005 80)',
    borderColor:
      size === 'large' || size === 'medal'
        ? 'oklch(70% 0.06 258)'
        : 'oklch(84% 0.02 80)',
    ring: false,
  }
}

const goldRing: CSSProperties = {
  outline: '2.5px solid oklch(74% 0.13 83)',
  outlineOffset: 2,
}

export function RosaryVisualization({
  steps,
  stepIndex,
  layout,
}: TRosaryVisualizationProps) {
  const { beadStyles, crossStyle, crossStyle2, tailChain, loopChain } =
    useMemo(() => {
      const current = steps[stepIndex]
      const beadStates: Record<number, TBeadState> = {}
      for (let i = 0; i < stepIndex; i++) beadStates[steps[i].dot] = 'done'
      beadStates[current.dot] = 'current'

      const maxDot = 5 + layout.loopTotal
      const beads: CSSProperties[] = []
      for (let dot = 1; dot <= maxDot; dot++) {
        const pos = getDotPos(dot, layout.loopTotal, layout.decadeSize)
        const state = beadStates[dot] ?? 'pending'
        const px = SIZE_PX[pos.size === 'cross' ? 'medal' : pos.size]
        const chrome = chromeFor(state, pos.size)
        const isMedal = pos.size === 'medal'
        const borderWidth = pos.size === 'large' || isMedal ? 2 : 1.25
        beads.push({
          position: 'absolute',
          left: `${pos.x}%`,
          top: `${pos.y / 1.4}%`,
          width: px,
          height: px,
          background: chrome.background,
          border: `${borderWidth}px solid ${chrome.borderColor}`,
          transform: isMedal
            ? 'translate(-50%,-50%) rotate(45deg)'
            : 'translate(-50%,-50%)',
          borderRadius: isMedal ? undefined : '50%',
          transition: 'background .2s',
          zIndex: 2,
          ...(chrome.ring ? goldRing : null),
        })
      }

      const crossState = beadStates[0] ?? 'pending'
      const isCrossCurrent = crossState === 'current'
      const crossFill = isCrossCurrent
        ? 'oklch(26% 0.06 258)'
        : 'oklch(74% 0.13 83)'
      const crossEdge = 'oklch(30% 0.06 258)'

      const vertical: CSSProperties = {
        position: 'absolute',
        left: '50%',
        top: '91.5%',
        width: '1.7%',
        height: '11%',
        background: crossFill,
        border: `1px solid ${crossEdge}`,
        transform: 'translate(-50%,-50%)',
        transition: 'background .2s',
        zIndex: 2,
        borderRadius: 1,
        boxSizing: 'border-box',
      }
      const horizontal: CSSProperties = {
        position: 'absolute',
        left: '50%',
        top: '89.5%',
        width: '6%',
        height: '1.7%',
        background: crossFill,
        border: `1px solid ${crossEdge}`,
        transform: 'translate(-50%,-50%)',
        transition: 'background .2s',
        zIndex: 3,
        borderRadius: 1,
        boxSizing: 'border-box',
      }

      const pointFor = (dot: number) =>
        getDotPos(dot, layout.loopTotal, layout.decadeSize)
      const tail = [0, 1, 2, 3, 4, 5]
        .map(pointFor)
        .map((p) => `${p.x},${p.y}`)
        .join(' ')
      const loopDots = [
        5,
        ...Array.from({ length: maxDot - 5 }, (_, i) => i + 6),
        5,
      ]
      const loop = loopDots
        .map(pointFor)
        .map((p) => `${p.x},${p.y}`)
        .join(' ')

      return {
        beadStyles: beads,
        crossStyle: vertical,
        crossStyle2: horizontal,
        tailChain: tail,
        loopChain: loop,
      }
    }, [steps, stepIndex, layout])

  return (
    <div className="relative mx-auto aspect-100/140 w-[clamp(230px,58vw,320px)] flex-none rounded-2xl bg-card shadow-sm">
      <svg
        viewBox="0 0 100 140"
        preserveAspectRatio="none"
        className="absolute inset-0 z-1 size-full"
      >
        <polyline
          points={tailChain}
          fill="none"
          stroke="oklch(80% 0.05 83)"
          strokeWidth="1"
        />
        <polyline
          points={loopChain}
          fill="none"
          stroke="oklch(80% 0.05 83)"
          strokeWidth="1"
        />
      </svg>
      <div style={crossStyle} />
      <div style={crossStyle2} />
      {beadStyles.map((style, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: bead order is fixed by rosary geometry, never reordered
        <div key={i} style={style} />
      ))}
    </div>
  )
}
