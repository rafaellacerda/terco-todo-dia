import {
  ARCHANGEL_REFRAIN,
  ARCHANGEL_SETS,
  type TArchangelSetKey,
  DORES_DATA,
  ESPIRITO_SANTO_DATA,
  FRANCISCANA_DATA,
  JOSE_DATA,
  MYSTERY_SETS,
  type TMysterySetKey,
} from '@/data/rosary/mystery-sets'
import { PRAYERS } from '@/data/rosary/prayers'

export const StepType = { Final: 'final' } as const
export type TStepType = (typeof StepType)[keyof typeof StepType]

export type TStep = {
  dot: number
  title: string
  subtitle?: string
  text: string
  type?: TStepType
}

const ORDINALS = ['1º', '2º', '3º', '4º', '5º']

export function buildMarianSteps(
  setKey: TMysterySetKey,
  includeJaculatoria: boolean,
): TStep[] {
  const items = MYSTERY_SETS[setKey].items
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({
    dot: 0,
    title: 'Creio (Símbolo dos Apóstolos)',
    text: PRAYERS.credo,
  })
  steps.push({ dot: 1, title: 'Pai Nosso', text: PRAYERS.paternoster })
  ;['1ª', '2ª', '3ª'].forEach((n, i) =>
    steps.push({
      dot: 2 + i,
      title: `Ave Maria (${n})`,
      text: PRAYERS.avemaria,
    }),
  )
  steps.push({ dot: 5, title: 'Glória', text: PRAYERS.gloria })
  for (let d = 0; d < 5; d++) {
    const baseDot = 6 + d * 11
    const myst = items[d]
    steps.push({
      dot: baseDot,
      title: `${ORDINALS[d]} Mistério — Pai Nosso`,
      subtitle: myst.title,
      text: `${myst.desc}\n\n— Pai Nosso —\n${PRAYERS.paternoster}`,
    })
    for (let a = 1; a <= 10; a++) {
      steps.push({
        dot: baseDot + a,
        title: `Ave Maria (${a}/10)`,
        subtitle: myst.title,
        text: PRAYERS.avemaria,
      })
    }
    steps.push({
      dot: 5,
      title: 'Glória',
      subtitle: myst.title,
      text: PRAYERS.gloria,
    })
    if (includeJaculatoria) {
      steps.push({
        dot: 5,
        title: 'Jaculatória de Fátima',
        subtitle: myst.title,
        text: PRAYERS.jaculatoria,
      })
    }
  }
  steps.push({ dot: 5, title: 'Salve Rainha', text: PRAYERS.salveRainha })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}

export function buildArchangelSteps(
  setKey: Exclude<TArchangelSetKey, 'miguel'>,
): TStep[] {
  const set = ARCHANGEL_SETS[setKey]
  const items = set.items
  const invocations = set.invocations
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({
    dot: 0,
    title: 'Creio (Símbolo dos Apóstolos)',
    text: PRAYERS.credo,
  })
  steps.push({ dot: 0, title: `Oração a ${set.name}`, text: set.opening ?? '' })
  steps.push({ dot: 1, title: 'Pai Nosso', text: PRAYERS.paternoster })
  ;['pela proteção', 'pela cura', 'pela orientação'].forEach((intent, i) =>
    steps.push({
      dot: 2 + i,
      title: `Ave Maria (${intent})`,
      text: PRAYERS.avemaria,
    }),
  )
  steps.push({ dot: 5, title: 'Glória', text: PRAYERS.gloria })
  for (let d = 0; d < 5; d++) {
    const baseDot = 6 + d * 11
    const myst = items[d]
    const invocation = invocations[d]
    steps.push({
      dot: baseDot,
      title: `${ORDINALS[d]} Mistério — Pai Nosso`,
      subtitle: myst.title,
      text: `${myst.desc}\n\n— Pai Nosso —\n${PRAYERS.paternoster}`,
    })
    for (let a = 1; a <= 10; a++) {
      steps.push({
        dot: baseDot + a,
        title: `Invocação (${a}/10)`,
        subtitle: myst.title,
        text: invocation,
      })
    }
    steps.push({
      dot: 5,
      title: 'Glória',
      subtitle: myst.title,
      text: `${PRAYERS.gloria}\n\n${ARCHANGEL_REFRAIN}`,
    })
  }
  steps.push({ dot: 5, title: 'Salve Rainha', text: PRAYERS.salveRainha })
  steps.push({
    dot: 0,
    title: `Oração Final a ${set.name}`,
    text: set.closing ?? '',
  })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}

export function buildBentoSteps(): TStep[] {
  const crossVerse =
    'A Cruz Sagrada seja a minha luz, não seja o dragão o meu guia. Retira-te, Satanás! Nunca me aconselhes coisas vãs. É mal o que me ofereces, bebe tu mesmo o teu veneno.'
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({
    dot: 0,
    title: 'Versículo da Cruz de São Bento',
    text: crossVerse,
  })
  for (let d = 0; d < 6; d++) {
    const base = 6 + d * 10
    steps.push({
      dot: base,
      title: `${d + 1}ª Dezena — Creio`,
      text: PRAYERS.credo,
    })
    for (let a = 1; a <= 10; a++)
      steps.push({
        dot: base + a,
        title: `Versículo (${a}/10)`,
        text: crossVerse,
      })
  }
  steps.push({
    dot: 0,
    title: 'Oração Complementar',
    text: 'Glorioso Patriarca São Bento, que vos mostrastes sempre compassivo com os necessitados, fazei que também nós, recorrendo à vossa poderosa intercessão, obtenhamos auxílio em todas as nossas aflições; que nas famílias reine a paz e a tranquilidade; que se afastem de nós todas as desgraças, tanto corporais como espirituais, especialmente o mal do pecado. Alcançai do Senhor a graça que vos suplicamos; finalmente, vos pedimos que, ao término de nossa vida terrestre, possamos ir louvar a Deus convosco no Paraíso. Amém.',
  })
  steps.push({
    dot: 0,
    title: 'Oração Conclusiva',
    text: 'Deus, que fizestes o abade São Bento ilustre mestre na escola do Vosso serviço, concedei que, nada preferindo ao Vosso Amor, corramos de coração dilatado no caminho dos Vossos Mandamentos. Por Nosso Senhor Jesus Cristo, nosso Senhor. Amém.',
  })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}

export function buildMiguelSteps(): TStep[] {
  const CHOIRS: Array<[string, string]> = [
    ['Serafins', 'para que sejamos inflamados no fogo da perfeita caridade.'],
    ['Querubins', 'para que sigamos o caminho da perfeição cristã.'],
    ['Tronos', 'para que recebamos o espírito da verdadeira humildade.'],
    [
      'Dominações',
      'para que tenhamos domínio sobre nossos sentidos e paixões.',
    ],
    ['Virtudes', 'para que sejamos fortes e valentes diante das tentações.'],
    ['Potestades', 'para que sejamos livres das ciladas do demônio.'],
    ['Principados', 'para que sirvamos a Deus com fé viva e humilde.'],
    [
      'Arcanjos',
      'para que alcancemos o dom da perseverança na fé e nas boas obras.',
    ],
    [
      'Todos os Anjos',
      'para que sejamos guardados nesta vida e conduzidos à glória eterna.',
    ],
  ]
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({
    dot: 0,
    title: 'V. Deus, vinde em nosso auxílio',
    text: `R. Senhor, socorrei-nos e salvai-nos.\n\n${PRAYERS.gloria}`,
  })
  steps.push({
    dot: 0,
    title: 'Oração a São Miguel Arcanjo',
    text: 'São Miguel Arcanjo, Príncipe da Milícia Celeste, tu que foste escolhido para vencer as forças do mal, vem ajudar-nos, vem proteger-nos.',
  })
  for (let c = 0; c < 9; c++) {
    const base = 6 + c * 4
    const [choir, petition] = CHOIRS[c]
    steps.push({
      dot: base,
      title: `${c + 1}º Coro — Pai Nosso`,
      subtitle: choir,
      text: `Pela intercessão de São Miguel e do coro celeste dos ${choir}, ${petition}\n\n— Pai Nosso —\n${PRAYERS.paternoster}`,
    })
    steps.push({
      dot: base + 1,
      title: 'Ave Maria (1ª)',
      subtitle: choir,
      text: PRAYERS.avemaria,
    })
    steps.push({
      dot: base + 2,
      title: 'Ave Maria (2ª)',
      subtitle: choir,
      text: PRAYERS.avemaria,
    })
    steps.push({
      dot: base + 3,
      title: 'Ave Maria (3ª) + Glória',
      subtitle: choir,
      text: `${PRAYERS.avemaria}\n\n${PRAYERS.gloria}`,
    })
  }
  ;[
    'São Miguel Arcanjo',
    'São Gabriel Arcanjo',
    'São Rafael Arcanjo',
    'o Anjo da Guarda',
  ].forEach((who) => {
    steps.push({
      dot: 5,
      title: `Pai Nosso em honra de ${who}`,
      text: PRAYERS.paternoster,
    })
  })
  steps.push({
    dot: 0,
    title: 'Oração Final a São Miguel',
    text: 'Deus eterno e todo-poderoso, que escolhestes o glorioso Arcanjo São Miguel como Príncipe de vossa Igreja, tornai-nos dignos de ser livres de todos os nossos inimigos, para que na hora da morte sejamos conduzidos à vossa presença. Por Cristo, nosso Senhor. Amém.',
  })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}

export function buildMisericordiaSteps(): TStep[] {
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({ dot: 1, title: 'Pai Nosso', text: PRAYERS.paternoster })
  steps.push({ dot: 2, title: 'Ave Maria', text: PRAYERS.avemaria })
  steps.push({
    dot: 0,
    title: 'Creio (Símbolo dos Apóstolos)',
    text: PRAYERS.credo,
  })
  const large =
    'Eterno Pai, eu Vos ofereço o Corpo e Sangue, a Alma e a Divindade de Vosso amadíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos de todo o mundo.'
  const small =
    'Pela Sua dolorosa Paixão, tende misericórdia de nós e de todo o mundo.'
  for (let d = 0; d < 5; d++) {
    const base = 6 + d * 10
    steps.push({
      dot: base,
      title: `${d + 1}ª Dezena — Oferecimento`,
      text: large,
    })
    for (let a = 1; a <= 10; a++)
      steps.push({ dot: base + a, title: `Súplica (${a}/10)`, text: small })
  }
  ;['1ª', '2ª', '3ª'].forEach((n) =>
    steps.push({
      dot: 5,
      title: `Deus Santo (${n})`,
      text: 'Deus Santo, Deus Forte, Deus Imortal, tende misericórdia de nós e de todo o mundo.',
    }),
  )
  steps.push({
    dot: 0,
    title: 'Oração Final',
    text: 'Deus eterno, em quem a misericórdia é infinita e o tesouro de compaixão inesgotável, olhai para nós com bondade e aumentai em nós a Vossa misericórdia, para que nunca desanimemos nas dificuldades, mas nos entreguemos com confiança à Vossa santa vontade, que é o próprio Amor e a própria Misericórdia. Amém.',
  })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}

export function buildDoresSteps(): TStep[] {
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({
    dot: 0,
    title: 'Oração Introdutória',
    text: 'Meu Deus, eu Vos ofereço este terço para Vossa glória, para honrar a Virgem Maria e partilhar e meditar o seu sofrimento. Concedei-me verdadeiro arrependimento dos meus pecados.',
  })
  for (let d = 0; d < 7; d++) {
    const base = 6 + d * 7
    const sorrow = DORES_DATA.sorrows[d]
    steps.push({
      dot: base,
      title: `${d + 1}ª Dor — Pai Nosso`,
      subtitle: 'Nossa Senhora das Dores',
      text: `${sorrow}\n\n— Pai Nosso —\n${PRAYERS.paternoster}`,
    })
    for (let a = 1; a <= 7; a++) {
      steps.push({
        dot: base + a,
        title: `Ave Maria (${a}/7)`,
        subtitle: 'Nossa Senhora das Dores',
        text: PRAYERS.avemaria,
      })
    }
  }
  steps.push({
    dot: 5,
    title: 'Jaculatória',
    text: 'Ó Mãe de Misericórdia, lembrai-nos sempre das dores de vosso Filho, Jesus Cristo.',
  })
  steps.push({
    dot: 0,
    title: 'Oração Final',
    text: 'Ó Rainha dos Mártires, vosso coração tanto sofreu. Pelo mérito das vossas lágrimas, alcançai-nos a graça de um arrependimento sincero e verdadeiro.',
  })
  ;['1ª', '2ª', '3ª'].forEach((n) =>
    steps.push({
      dot: 5,
      title: `Jaculatória (${n})`,
      text: 'Ó Maria, que foste concebida sem pecado e sofreste por todos nós, rogai por nós!',
    }),
  )
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}

export function buildFranciscanaSteps(): TStep[] {
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({
    dot: 0,
    title: 'Creio (Símbolo dos Apóstolos)',
    text: PRAYERS.credo,
  })
  steps.push({ dot: 1, title: 'Pai Nosso', text: PRAYERS.paternoster })
  steps.push({
    dot: 2,
    title: 'Ave Maria (1ª — pelos anos de Maria)',
    text: PRAYERS.avemaria,
  })
  steps.push({
    dot: 3,
    title: 'Ave Maria (2ª — pelos anos de Maria)',
    text: PRAYERS.avemaria,
  })
  for (let d = 0; d < 7; d++) {
    const base = 6 + d * 10
    const joy = FRANCISCANA_DATA.joys[d]
    steps.push({
      dot: base,
      title: `${d + 1}ª Alegria — Pai Nosso`,
      subtitle: joy.title,
      text: `${joy.desc}\n\n— Pai Nosso —\n${PRAYERS.paternoster}`,
    })
    for (let a = 1; a < 10; a++) {
      steps.push({
        dot: base + a,
        title: `Ave Maria (${a}/10)`,
        subtitle: joy.title,
        text: PRAYERS.avemaria,
      })
    }
    steps.push({
      dot: base + 10,
      title: 'Ave Maria (10/10) + Glória',
      subtitle: joy.title,
      text: `${PRAYERS.avemaria}\n\n${PRAYERS.gloria}`,
    })
  }
  steps.push({ dot: 5, title: 'Ave Maria (extra 1ª)', text: PRAYERS.avemaria })
  steps.push({ dot: 5, title: 'Ave Maria (extra 2ª)', text: PRAYERS.avemaria })
  steps.push({
    dot: 0,
    title: 'Oração Final',
    text: 'Lembrai-vos, ó puríssima Virgem Maria, de que nunca se ouviu dizer que alguém que recorreu à vossa proteção e implorou a vossa assistência fosse por vós desamparado. Cheio dessa confiança, a vós recorro, ó Mãe, e diante de vós me apresento, gemendo sob o peso dos meus pecados. Não desprezeis as minhas súplicas, ó Mãe do Verbo Encarnado, mas dignai-vos escutá-las e atendê-las. Amém.',
  })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}

export function buildEspiritoSantoSteps(): TStep[] {
  const invocacao =
    'Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do Vosso amor. Amém.'
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({ dot: 0, title: 'Invocação ao Espírito Santo', text: invocacao })
  for (let d = 0; d < 7; d++) {
    const base = 6 + d * 10
    const gift = ESPIRITO_SANTO_DATA.gifts[d]
    steps.push({
      dot: base,
      title: 'Pai Nosso',
      subtitle: `Dom da ${gift}`,
      text: `Espírito Santo, dai-nos o dom da ${gift}.\n\n— Pai Nosso —\n${PRAYERS.paternoster}`,
    })
    for (let a = 1; a <= 10; a++) {
      steps.push({
        dot: base + a,
        title: `Ave Maria (${a}/10)`,
        subtitle: `Dom da ${gift}`,
        text: PRAYERS.avemaria,
      })
    }
  }
  steps.push({ dot: 0, title: 'Invocação Final', text: invocacao })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}

export function buildJoseSteps(): TStep[] {
  const steps: TStep[] = []
  steps.push({ dot: 0, title: 'Sinal da Cruz', text: PRAYERS.signCross })
  steps.push({
    dot: 0,
    title: 'Oração a São José',
    text: 'Glorioso Patriarca São José, esposo castíssimo de Maria e pai adotivo de Jesus, vinde em nosso auxílio nesta oração de vossas dores e alegrias.',
  })
  const aspiracao = 'Ave, José, filho de Davi, esposo de Maria, rogai por nós.'
  for (let d = 0; d < 7; d++) {
    const base = 6 + d * 1
    const pair = JOSE_DATA.pairs[d]
    steps.push({
      dot: base,
      title: `${d + 1}ª Dor e Alegria`,
      subtitle: 'São José',
      text: `Dor: ${pair.dor}\n\nAlegria: ${pair.alegria}\n\nPor esta dor e por esta alegria, São José, alcançai-nos a vossa proteção.`,
    })
    steps.push({
      dot: 5,
      title: 'Aspiração',
      subtitle: 'São José',
      text: aspiracao,
    })
  }
  steps.push({
    dot: 0,
    title: 'Oração Final',
    text: 'Lembrai-vos, ó puríssimo esposo da Virgem Maria, que nunca se ouviu dizer que alguém tivesse recorrido à vossa proteção e não fosse por vós atendido. Com esta confiança venho à vossa presença; não desprezeis as minhas súplicas, pai adotivo do Redentor, mas dignai-vos acolhê-las com bondade. Amém.',
  })
  steps.push({
    dot: 0,
    type: StepType.Final,
    title: 'Terço concluído',
    text: '',
  })
  return steps
}
