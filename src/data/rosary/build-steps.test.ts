import { describe, expect, it } from 'vitest'
import {
  buildMarianSteps,
  buildMiguelSteps,
  StepType,
} from '@/data/rosary/build-steps'
import { getDotPos, layoutFor } from '@/data/rosary/geometry'

describe('buildMarianSteps', () => {
  it('produces 74 steps ending in a final step, with jaculatória included', () => {
    const steps = buildMarianSteps('gozosos', true)
    expect(steps).toHaveLength(74)
    expect(steps[0].title).toBe('Sinal da Cruz')
    expect(steps.at(-1)?.type).toBe(StepType.Final)
  })

  it('drops 5 steps (one jaculatória per mystery) when disabled', () => {
    const steps = buildMarianSteps('gozosos', false)
    expect(steps).toHaveLength(69)
  })
})

describe('buildMiguelSteps', () => {
  it('matches the São Miguel layout (36 loop beads, decades of 4)', () => {
    const steps = buildMiguelSteps()
    const layout = layoutFor('arcanjo', 'miguel')
    expect(layout).toEqual({ loopTotal: 36, decadeSize: 4 })
    expect(steps.at(-1)?.type).toBe(StepType.Final)
  })
})

describe('getDotPos', () => {
  it('places the cross at dot 0 and the medal at dot 5', () => {
    expect(getDotPos(0)).toEqual({ x: 50, y: 122, size: 'cross' })
    expect(getDotPos(5)).toEqual({ x: 50, y: 78, size: 'medal' })
  })

  it('marks every decadeSize-th loop bead as large', () => {
    const first = getDotPos(6, 55, 11)
    const nextDecadeStart = getDotPos(17, 55, 11)
    expect(first.size).toBe('large')
    expect(nextDecadeStart.size).toBe('large')
    expect(getDotPos(7, 55, 11).size).toBe('small')
  })
})
