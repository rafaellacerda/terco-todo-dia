import {
  buildArchangelSteps,
  buildBentoSteps,
  buildDoresSteps,
  buildEspiritoSantoSteps,
  buildFranciscanaSteps,
  buildJoseSteps,
  buildMarianSteps,
  buildMiguelSteps,
  buildMisericordiaSteps,
  type TStep,
} from '@/data/rosary/build-steps'
import {
  ARCHANGEL_SETS,
  type TArchangelSetKey,
  MYSTERY_SETS,
  type TMysterySetKey,
  OTHER_CHAPLETS_DATA,
  type TOtherChapletKey,
} from '@/data/rosary/mystery-sets'

export type TRosaryCategory = 'maria' | 'arcanjo' | TOtherChapletKey

export type TRosarySetSummary = {
  category: TRosaryCategory
  key: string
  name: string
  day: string
}

export const MARIAN_SET_LIST: TRosarySetSummary[] = (
  Object.keys(MYSTERY_SETS) as TMysterySetKey[]
).map((key) => ({
  category: 'maria',
  key,
  name: MYSTERY_SETS[key].name,
  day: MYSTERY_SETS[key].day,
}))

export const ARCHANGEL_SET_LIST: TRosarySetSummary[] = (
  Object.keys(ARCHANGEL_SETS) as TArchangelSetKey[]
).map((key) => ({
  category: 'arcanjo',
  key,
  name: ARCHANGEL_SETS[key].name,
  day: ARCHANGEL_SETS[key].day,
}))

export const OTHER_CHAPLET_LIST: TRosarySetSummary[] = (
  Object.keys(OTHER_CHAPLETS_DATA) as TOtherChapletKey[]
).map((key) => ({
  category: key,
  key,
  name: OTHER_CHAPLETS_DATA[key].name,
  day: OTHER_CHAPLETS_DATA[key].day,
}))

const WEEKDAY_TO_MARIAN_SET: Record<number, TMysterySetKey> = {
  0: 'gloriosos',
  1: 'gozosos',
  2: 'dolorosos',
  3: 'gloriosos',
  4: 'luminosos',
  5: 'dolorosos',
  6: 'gozosos',
}

export function suggestedMarianKeyForToday(): TMysterySetKey {
  return WEEKDAY_TO_MARIAN_SET[new Date().getDay()]
}

export function nameForSet(category: TRosaryCategory, key: string): string {
  if (category === 'arcanjo')
    return ARCHANGEL_SETS[key as TArchangelSetKey].name
  if (category === 'maria') return MYSTERY_SETS[key as TMysterySetKey].name
  return OTHER_CHAPLETS_DATA[category].name
}

export function buildStepsFor(
  category: TRosaryCategory,
  key: string,
  includeJaculatoria: boolean,
): TStep[] {
  switch (category) {
    case 'arcanjo':
      return key === 'miguel'
        ? buildMiguelSteps()
        : buildArchangelSteps(key as Exclude<TArchangelSetKey, 'miguel'>)
    case 'misericordia':
      return buildMisericordiaSteps()
    case 'dores':
      return buildDoresSteps()
    case 'franciscana':
      return buildFranciscanaSteps()
    case 'espiritosanto':
      return buildEspiritoSantoSteps()
    case 'jose':
      return buildJoseSteps()
    case 'bento':
      return buildBentoSteps()
    default:
      return buildMarianSteps(key as TMysterySetKey, includeJaculatoria)
  }
}
