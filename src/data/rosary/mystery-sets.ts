export type TMysteryItem = { title: string; desc: string }

export type TMysterySet = { name: string; day: string; items: TMysteryItem[] }

export const MYSTERY_SETS = {
  gozosos: {
    name: 'Mistérios Gozosos',
    day: 'Segunda-feira · Sábado',
    items: [
      {
        title: 'A Anunciação do Anjo a Maria',
        desc: 'O anjo Gabriel anuncia a Maria que ela será a mãe do Filho de Deus, e ela responde: "Eis a serva do Senhor."',
      },
      {
        title: 'A Visitação de Nossa Senhora a Santa Isabel',
        desc: 'Maria visita sua prima Isabel, que está à espera de João Batista, e a saúda com o cântico do Magnificat.',
      },
      {
        title: 'O Nascimento de Jesus em Belém',
        desc: 'Jesus nasce em Belém, numa manjedoura, e os pastores vão adorá-lo.',
      },
      {
        title: 'A Apresentação do Menino Jesus no Templo',
        desc: 'Maria e José apresentam Jesus no templo, cumprindo a Lei, e o ancião Simeão o reconhece como o Salvador.',
      },
      {
        title: 'Jesus é Encontrado no Templo entre os Doutores',
        desc: 'Depois de perdido por três dias, Jesus é encontrado no templo, ensinando os doutores da Lei.',
      },
    ],
  },
  dolorosos: {
    name: 'Mistérios Dolorosos',
    day: 'Terça-feira · Sexta-feira',
    items: [
      {
        title: 'A Agonia de Jesus no Horto das Oliveiras',
        desc: 'Jesus reza angustiado no Horto de Getsêmani e aceita a vontade do Pai.',
      },
      {
        title: 'A Flagelação de Jesus',
        desc: 'Jesus é amarrado e açoitado por ordem de Pilatos.',
      },
      {
        title: 'A Coroação de Jesus com Espinhos',
        desc: 'Os soldados coroam Jesus com espinhos e o escarnecem como rei.',
      },
      {
        title: 'Jesus Carrega a Cruz até o Calvário',
        desc: 'Jesus carrega a cruz pelas ruas de Jerusalém até o monte Calvário.',
      },
      {
        title: 'A Crucificação e Morte de Jesus',
        desc: 'Jesus é crucificado e morre na cruz pela salvação da humanidade.',
      },
    ],
  },
  gloriosos: {
    name: 'Mistérios Gloriosos',
    day: 'Quarta-feira · Domingo',
    items: [
      {
        title: 'A Ressurreição de Jesus',
        desc: 'Jesus ressuscita glorioso ao terceiro dia, vencendo a morte.',
      },
      {
        title: 'A Ascensão de Jesus aos Céus',
        desc: 'Jesus sobe aos céus diante dos apóstolos, quarenta dias após ressuscitar.',
      },
      {
        title: 'A Vinda do Espírito Santo sobre Maria e os Apóstolos',
        desc: 'O Espírito Santo desce sobre Maria e os apóstolos reunidos no Cenáculo, em Pentecostes.',
      },
      {
        title: 'A Assunção de Nossa Senhora ao Céu',
        desc: 'Maria é levada, de corpo e alma, à glória do Céu.',
      },
      {
        title: 'A Coroação de Nossa Senhora como Rainha do Céu e da Terra',
        desc: 'Maria é coroada Rainha do Céu e da Terra.',
      },
    ],
  },
  luminosos: {
    name: 'Mistérios Luminosos',
    day: 'Quinta-feira',
    items: [
      {
        title: 'O Batismo de Jesus no Jordão',
        desc: 'João Batista batiza Jesus no rio Jordão, e a voz do Pai o revela como o Filho amado.',
      },
      {
        title: 'As Bodas de Caná',
        desc: 'Jesus realiza seu primeiro milagre, transformando água em vinho, a pedido de Maria.',
      },
      {
        title: 'O Anúncio do Reino de Deus e o Convite à Conversão',
        desc: 'Jesus anuncia o Reino de Deus e convida todos à conversão e à fé no Evangelho.',
      },
      {
        title: 'A Transfiguração de Jesus',
        desc: 'Jesus se transfigura no monte diante de Pedro, Tiago e João, revelando sua glória.',
      },
      {
        title: 'A Instituição da Eucaristia',
        desc: 'Na Última Ceia, Jesus institui a Eucaristia, dando seu Corpo e Sangue aos apóstolos.',
      },
    ],
  },
} as const satisfies Record<string, TMysterySet>

export type TMysterySetKey = keyof typeof MYSTERY_SETS

export type TArchangelSet = {
  name: string
  day: string
  opening?: string
  closing?: string
  items?: TMysteryItem[]
  invocations?: string[]
  refrain?: string
}

export const ARCHANGEL_SETS = {
  rafael: {
    name: 'São Rafael Arcanjo',
    day: 'Cura e proteção',
    opening:
      'Glorioso Arcanjo São Rafael, mensageiro da cura de Deus: vós que conduzistes Tobias em sua longa viagem e livrastes Sara do mal que a afligia, vinde em nosso auxílio. Iluminai os nossos caminhos, curai as nossas feridas e conduzi-nos com segurança até o Senhor.',
    closing:
      'São Rafael Arcanjo, forte e compassivo, permanecei ao nosso lado em cada etapa da vida. Curai o que precisa ser curado, protegei o que precisa ser guardado e conduzi-nos, como conduzistes Tobias, ao encontro do Senhor. Amém.',
    items: [
      {
        title: 'São Rafael, Médico de Deus',
        desc: 'São Rafael é o médico de Deus, que traz cura para o corpo, a alma e o coração dos que sofrem.',
      },
      {
        title: 'São Rafael, Arcanjo da Libertação',
        desc: 'São Rafael liberta os que estão presos pelas amarras do pecado e do mal.',
      },
      {
        title: 'São Rafael, Fiel Condutor de Tobias',
        desc: 'Como guiou Tobias em sua longa viagem, São Rafael acompanha e protege os nossos passos na estrada da vida.',
      },
      {
        title: 'São Rafael, Auxílio nas Tribulações',
        desc: 'São Rafael socorre os que atravessam a dor e o sofrimento, trazendo consolo e força.',
      },
      {
        title: 'São Rafael, Protetor das Famílias',
        desc: 'São Rafael guarda os lares, fazendo deles santuários de amor e paz.',
      },
    ],
    invocations: [
      'São Rafael, médico de Deus.\nIntercedei pela cura do nosso coração.',
      'São Rafael, arcanjo da libertação.\nVinde nos livrar da escravidão do pecado.',
      'São Rafael, fiel condutor de Tobias.\nAcompanhai nossos passos na estrada da vida.',
      'São Rafael, auxílio nas tribulações.\nSocorrei-nos na dor e no sofrimento.',
      'São Rafael, protetor das famílias.\nFazei de nosso lar um santuário do amor.',
    ],
    refrain:
      'São Rafael Arcanjo, médico de Deus, rogai por nós.\nNossa Senhora, Rainha dos Anjos, rogai por nós.',
  },
  gabriel: {
    name: 'São Gabriel Arcanjo',
    day: 'Anúncio e mensagem de Deus',
    opening:
      'Glorioso Arcanjo São Gabriel, mensageiro da Encarnação: vós que anunciastes a Maria o mistério da vinda do Salvador, alcançai-nos a graça de acolher com fé a palavra de Deus em nossas vidas.',
    closing:
      'São Gabriel Arcanjo, fiel mensageiro do Altíssimo, ajudai-nos a ouvir e a acolher a vontade de Deus em cada momento da nossa vida, como fez Maria ao vosso anúncio. Amém.',
    items: [
      {
        title: 'O Anúncio a Zacarias',
        desc: 'Gabriel anuncia a Zacarias o nascimento de João Batista, precursor do Senhor.',
      },
      {
        title: 'O Anúncio a Maria',
        desc: 'Gabriel saúda Maria e lhe anuncia que ela seria a Mãe do Filho de Deus.',
      },
      {
        title: 'O Anúncio a José em Sonho',
        desc: 'Gabriel revela a José, em sonho, o mistério da concepção virginal de Maria.',
      },
      {
        title: 'O Anúncio aos Pastores',
        desc: 'Um anjo do Senhor anuncia aos pastores, em Belém, o nascimento do Salvador.',
      },
      {
        title: 'A Mensagem a Daniel',
        desc: 'Gabriel explica ao profeta Daniel o sentido de suas visões, revelando os planos de Deus para os tempos.',
      },
    ],
    invocations: [
      'São Gabriel, mensageiro fiel.\nEnsinai-nos a escutar a voz de Deus.',
      'São Gabriel, anunciador da graça.\nAjudai-nos a dizer sim à vontade do Senhor.',
      'São Gabriel, guardião dos mistérios divinos.\nFortalecei a nossa confiança.',
      'São Gabriel, portador de boas novas.\nEnchei nossos corações de esperança.',
      'São Gabriel, intérprete das visões de Deus.\nDai-nos discernimento e clareza.',
    ],
    refrain:
      'São Gabriel Arcanjo, mensageiro do Altíssimo, rogai por nós.\nNossa Senhora, Rainha dos Anjos, rogai por nós.',
  },
  miguel: {
    name: 'São Miguel Arcanjo',
    day: 'Proteção espiritual',
  },
} as const satisfies Record<string, TArchangelSet>

export type TArchangelSetKey = keyof typeof ARCHANGEL_SETS

export const MISERICORDIA_DATA = {
  name: 'Divina Misericórdia',
  day: 'Confiança e misericórdia',
}

export const DORES_DATA = {
  name: 'Nossa Senhora das Dores',
  day: 'Terça e sexta-feira',
  sorrows: [
    'A profecia de Simeão sobre a espada de dor que atravessaria o coração de Maria.',
    'A fuga para o Egito com o Menino Jesus, para escapar da perseguição de Herodes.',
    'Os três dias de angústia à procura de Jesus, perdido no templo de Jerusalém.',
    'O encontro de Maria com Jesus a caminho do Calvário, carregando a cruz.',
    'A presença de Maria ao pé da cruz, vendo morrer seu Filho.',
    'Maria recebe em seus braços o corpo de Jesus, descido da cruz.',
    'O sepultamento de Jesus e a longa espera de Maria pela Ressurreição.',
  ],
}

export const FRANCISCANA_DATA = {
  name: 'Coroa Franciscana',
  day: 'Sete Alegrias de Maria',
  joys: [
    {
      title: 'A Anunciação do Anjo Gabriel a Maria',
      desc: 'O anjo Gabriel anuncia a Maria que ela seria a Mãe do Salvador.',
    },
    {
      title: 'A Visitação de Maria a Santa Isabel',
      desc: 'Maria visita sua prima Isabel e a saúda com alegria.',
    },
    {
      title: 'O Nascimento de Jesus em Belém',
      desc: 'Jesus nasce em Belém, e Maria se alegra com o seu Filho.',
    },
    {
      title: 'A Adoração dos Reis Magos',
      desc: 'Os Magos do Oriente adoram o Menino Jesus e lhe oferecem seus dons.',
    },
    {
      title: 'O Reencontro de Jesus no Templo',
      desc: 'Depois de perdido por três dias, Jesus é encontrado no templo, e a alegria de Maria se renova.',
    },
    {
      title: 'A Ressurreição de Jesus',
      desc: 'Jesus ressuscita glorioso, e o coração de Maria se enche de alegria pascal.',
    },
    {
      title: 'A Assunção de Maria e sua Coroação',
      desc: 'Maria é levada ao Céu e coroada Rainha, junto de seu Filho para sempre.',
    },
  ],
}

export const ESPIRITO_SANTO_DATA = {
  name: 'Espírito Santo',
  day: 'Sete Dons',
  gifts: [
    'Sabedoria',
    'Entendimento',
    'Conselho',
    'Fortaleza',
    'Ciência',
    'Piedade',
    'Temor de Deus',
  ],
}

export const JOSE_DATA = {
  name: 'São José',
  day: 'Sete Dores e Alegrias',
  pairs: [
    {
      dor: 'A dúvida de José diante da gravidez de Maria.',
      alegria: 'A mensagem do anjo, revelando o mistério do Espírito Santo.',
    },
    {
      dor: 'A pobreza do nascimento de Jesus em Belém.',
      alegria: 'O nascimento do Salvador do mundo.',
    },
    {
      dor: 'A obediência à Lei na circuncisão do Menino.',
      alegria: 'O doce nome de Jesus dado à criança.',
    },
    {
      dor: 'A profecia de Simeão sobre as dores que Jesus e Maria sofreriam.',
      alegria: 'A certeza da salvação anunciada nessa mesma profecia.',
    },
    {
      dor: 'A fuga apressada para o Egito, para proteger o Menino Jesus.',
      alegria: 'A queda dos ídolos do Egito diante do Filho de Deus.',
    },
    {
      dor: 'O temor ao regressar do exílio.',
      alegria: 'A vida tranquila da Sagrada Família em Nazaré.',
    },
    {
      dor: 'Os três dias de angústia à procura de Jesus, perdido no templo.',
      alegria: 'O reencontro de Jesus, ensinando os doutores da Lei.',
    },
  ],
}

export const BENTO_DATA = { name: 'São Bento', day: 'Proteção e libertação' }

export const OTHER_CHAPLETS_DATA = {
  misericordia: MISERICORDIA_DATA,
  dores: DORES_DATA,
  franciscana: FRANCISCANA_DATA,
  espiritosanto: ESPIRITO_SANTO_DATA,
  jose: JOSE_DATA,
  bento: BENTO_DATA,
} as const

export type TOtherChapletKey = keyof typeof OTHER_CHAPLETS_DATA
