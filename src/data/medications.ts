export interface Presentation {
  id: string;
  name: string; // Ex: "Gotas 500 mg/mL", "Suspensão 250 mg/5 mL"
  concentrationMgPerMl: number; // Concentração em mg/ml
  dropsPerMl?: number; // Padrão 20 gotas/ml
  unit: 'gotas' | 'mL' | 'comprimido';
  bottleVolume?: string; // Ex: "Frasco com 10 mL", "Frasco com 150 mL"
  posologyGuidance: string; // Como explicar aos pais
}

export interface Medication {
  id: string;
  name: string;
  substance: string;
  category: 'analgesicos' | 'antiinflamatorios' | 'antibioticos' | 'emergencia';
  commercialNames: string[];
  indication: string;
  recommendedDoseMgPerKg: number; // Dose padrão calculada
  minDoseMgPerKg: number;
  maxDoseMgPerKg: number;
  doseCalculationType: 'per_dose' | 'per_day'; // Se a dose calculada é por tomada ou total diária
  frequencyHours: number; // 6, 8, 12, 24
  frequencyText: string; // "A cada 6 horas", "A cada 8 horas", etc.
  durationDaysDefault?: number;
  maxSingleDoseMg: number;
  maxDailyDoseMg: number;
  minAgeMonths: number; // Ex: Ibuprofeno >= 6 meses
  contraindications: string[];
  clinicalTips: string[];
  presentations: Presentation[];
  instructionsForParents: (doseText: string, freq: string, days?: number) => string;
}

export interface AnestheticLocal {
  id: string;
  name: string;
  substance: string;
  vasoconstrictor: string;
  concentrationPercent: number; // 2%, 3%, 4%
  mgPerMl: number; // 20mg/ml, 30mg/ml, 40mg/ml
  mgPerCartridge: number; // Em tubete de 1.8ml: 36mg, 54mg, 72mg
  maxDoseMgPerKgMalamed: number; // mg/kg segundo Malamed
  absoluteMaxDoseMg: number; // Limite máximo absoluto (ex: 300mg, 500mg)
  minAgeYears: number; // Ex: Articaína >= 4 anos
  warningNotice?: string;
  clinicalIndication: string;
}

export interface ProphylaxisProtocol {
  situation: string;
  medication: string;
  route: string;
  regimenChildren: string;
  dosePerKg: number;
  maxDose: number;
  timing: string;
  notes: string;
}

export const PEDIATRIC_MEDICATIONS: Medication[] = [
  // ANALGÉSICOS E ANTIPIRÉTICOS
  {
    id: 'dipirona',
    name: 'Dipirona Sódica',
    substance: 'Dipirona monoidratada',
    category: 'analgesicos',
    commercialNames: ['Novalgina', 'Anador', 'Dipimed', 'Maxalgina'],
    indication: 'Dor leve a moderada e febre pós-intervenção ou pulpopatia.',
    recommendedDoseMgPerKg: 15, // Padrão: 10 a 25 mg/kg/dose
    minDoseMgPerKg: 10,
    maxDoseMgPerKg: 25,
    doseCalculationType: 'per_dose',
    frequencyHours: 6,
    frequencyText: 'De 6 em 6 horas (se dor ou febre)',
    durationDaysDefault: 3,
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 2000,
    minAgeMonths: 3,
    contraindications: [
      'Crianças menores de 3 meses ou com peso inferior a 5 kg',
      'Hipersensibilidade a pirazolonas ou histórico de agranulocitose',
      'Deficiência congênita de G6PD (favismo)'
    ],
    clinicalTips: [
      'Regra prática consagrada: Gotas (500mg/mL) = 1 gota por kg de peso corporal por tomada.',
      'Limite prático de segurança ambulatorial: não ultrapassar 35-40 gotas por dose em pediatria.',
      'Excelente eficácia analgésica pré e pós-operatória na polpa dentária inflamada.'
    ],
    presentations: [
      {
        id: 'dipirona-gotas-500',
        name: 'Gotas 500 mg/mL (1 gota = 25 mg)',
        concentrationMgPerMl: 500,
        dropsPerMl: 20,
        unit: 'gotas',
        bottleVolume: 'Frasco conta-gotas 10 mL ou 20 mL',
        posologyGuidance: '1 gota por cada 1 kg de peso da criança a cada 6 horas.'
      },
      {
        id: 'dipirona-solucao-50',
        name: 'Solução Oral 50 mg/mL',
        concentrationMgPerMl: 50,
        unit: 'mL',
        bottleVolume: 'Frasco com 100 mL + seringa dosadora',
        posologyGuidance: 'Ideal para crianças que rejeitam gotas pelo sabor amargo.'
      }
    ],
    instructionsForParents: (doseText, freq, days = 3) => 
      `Administrar ${doseText} por via oral ${freq}. Usar somente em caso de dor ou febre, respeitando o intervalo mínimo de 6 horas, por no máximo ${days} dias consecutivos.`
  },
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    substance: 'Paracetamol (Acetaminofeno)',
    category: 'analgesicos',
    commercialNames: ['Tylenol', 'Dôrico', 'Parador', 'Tylenol Bebê'],
    indication: 'Analgesia e antipirese de primeira linha em lactentes e crianças com alergia a dipirona/AINEs.',
    recommendedDoseMgPerKg: 12, // 10 a 15 mg/kg/dose
    minDoseMgPerKg: 10,
    maxDoseMgPerKg: 15,
    doseCalculationType: 'per_dose',
    frequencyHours: 6,
    frequencyText: 'De 6 em 6 horas (ou de 4 em 4h se febre refratária, máx 5 tomadas/dia)',
    durationDaysDefault: 3,
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 75, // mg/kg/dia ou máx 2.6g
    minAgeMonths: 0,
    contraindications: [
      'Insuficiência hepática grave ou hepatopatias ativas',
      'Hipersensibilidade conhecida ao paracetamol'
    ],
    clinicalTips: [
      'Regra prática: Gotas 200mg/mL = 1 gota por kg de peso (1 gota = 10 mg de paracetamol).',
      'Cuidado com Tylenol Bebê (100mg/mL): vem com seringa dosadora em mL e concentração menor!',
      'Margem terapêutica estreita no fígado: alertar os pais para nunca associar outros xaropes antigripais.'
    ],
    presentations: [
      {
        id: 'paracetamol-gotas-200',
        name: 'Gotas 200 mg/mL (1 gota = 10 mg)',
        concentrationMgPerMl: 200,
        dropsPerMl: 20,
        unit: 'gotas',
        bottleVolume: 'Frasco conta-gotas 15 mL',
        posologyGuidance: '1 a 1,2 gotas por kg de peso a cada 6 horas.'
      },
      {
        id: 'paracetamol-bebe-100',
        name: 'Solução Oral Bebê 100 mg/mL',
        concentrationMgPerMl: 100,
        unit: 'mL',
        bottleVolume: 'Frasco com 15 mL + seringa dosadora',
        posologyGuidance: 'Usar seringa dosadora graduada em mL.'
      },
      {
        id: 'paracetamol-susp-32',
        name: 'Suspensão Oral 32 mg/mL (160 mg/5 mL)',
        concentrationMgPerMl: 32,
        unit: 'mL',
        bottleVolume: 'Frasco com 60 mL ou 100 mL',
        posologyGuidance: 'Excelente aceitação com sabor cereja/frutas.'
      }
    ],
    instructionsForParents: (doseText, freq, days = 3) => 
      `Administrar ${doseText} por via oral ${freq}. Manter intervalo mínimo de 6 horas entre as doses. Não ultrapassar a dose prescrita para proteger o fígado da criança.`
  },
  {
    id: 'ibuprofeno',
    name: 'Ibuprofeno',
    substance: 'Ibuprofeno',
    category: 'analgesicos',
    commercialNames: ['Alivium', 'Advil Infantil', 'Dalsy', 'Ibupril'],
    indication: 'Dor de intensidade leve a moderada associada a edema e inflamação (pós-exodontias, cirurgias de freio lingual, pulpotomias).',
    recommendedDoseMgPerKg: 7.5, // 5 a 10 mg/kg/dose
    minDoseMgPerKg: 5,
    maxDoseMgPerKg: 10,
    doseCalculationType: 'per_dose',
    frequencyHours: 8,
    frequencyText: 'De 8 em 8 horas (ou de 6 em 6 horas se dor intensa)',
    durationDaysDefault: 3,
    maxSingleDoseMg: 400,
    maxDailyDoseMg: 40, // 40 mg/kg/dia
    minAgeMonths: 6,
    contraindications: [
      'Lactentes menores de 6 meses',
      'Histórico de úlcera péptica ou sangramento gastrointestinal ativo',
      'Asma induzida por anti-inflamatórios não-esteroidais (AINEs)',
      'Suspeita de Dengue ou coagulopatias'
    ],
    clinicalTips: [
      'Alivium Gotas 50mg/mL: 1 a 2 gotas por kg (1 gota = 2.5 mg). Dose máxima pediátrica por tomada: 40 gotas.',
      'Alivium Gotas 100mg/mL: metade das gotas! 1 gota a cada 2 kg de peso (1 gota = 5 mg). Muita atenção!',
      'Sempre orientar administração logo após as refeições ou com leite para evitar desconforto gástrico.'
    ],
    presentations: [
      {
        id: 'ibuprofeno-gotas-50',
        name: 'Gotas 50 mg/mL (1 gota = 2.5 mg)',
        concentrationMgPerMl: 50,
        dropsPerMl: 20,
        unit: 'gotas',
        bottleVolume: 'Frasco conta-gotas 30 mL',
        posologyGuidance: '1 a 2 gotas por kg por dose (máx 40 gotas).'
      },
      {
        id: 'ibuprofeno-gotas-100',
        name: 'Gotas 100 mg/mL (1 gota = 5 mg)',
        concentrationMgPerMl: 100,
        dropsPerMl: 20,
        unit: 'gotas',
        bottleVolume: 'Frasco conta-gotas 20 mL',
        posologyGuidance: '1 gota para cada 2 kg de peso (máx 20 gotas).'
      },
      {
        id: 'ibuprofeno-susp-20',
        name: 'Suspensão Oral 20 mg/mL (100 mg/5 mL)',
        concentrationMgPerMl: 20,
        unit: 'mL',
        bottleVolume: 'Frasco com 100 mL + copo/seringa medidora',
        posologyGuidance: 'Frasco deve ser bem agitado antes da administração.'
      }
    ],
    instructionsForParents: (doseText, freq, days = 3) => 
      `Administrar ${doseText} por via oral ${freq}, de preferência após as refeições ou mamadas, durante ${days} dias. Agite bem o frasco antes de dosar.`
  },

  // ANTI-INFLAMATÓRIOS E CORTICOIDES
  {
    id: 'dexametasona',
    name: 'Dexametasona (Pré-operatório)',
    substance: 'Fosfato dissódico de dexametasona',
    category: 'antiinflamatorios',
    commercialNames: ['Decadron', 'Dexametasona Genérica'],
    indication: 'Profilaxia de edema intenso e dor pós-operatória em cirurgias odontopediátricas invasivas (exodontia de inclusos, ulectomias múltiplas, freio). Dose única pré-operatória.',
    recommendedDoseMgPerKg: 0.1, // 0.1 a 0.15 mg/kg
    minDoseMgPerKg: 0.1,
    maxDoseMgPerKg: 0.15,
    doseCalculationType: 'per_dose',
    frequencyHours: 24,
    frequencyText: 'Dose única 1 hora antes do procedimento cirúrgico',
    durationDaysDefault: 1,
    maxSingleDoseMg: 4.0,
    maxDailyDoseMg: 4.0,
    minAgeMonths: 12,
    contraindications: [
      'Infecção fúngica sistêmica ou virose ativa (herpes simples ocular, varicela)',
      'Hipersensibilidade a corticosteroides',
      'Uso recente de vacinas de vírus vivos atenuados'
    ],
    clinicalTips: [
      'Administração 1 hora antes da cirurgia reduz significativamente a formação de mediadores inflamatórios.',
      'Dose única tem perfil de segurança excelente sem supressão adrenal clinicamente relevante.',
      'Decadron Elixir 0.1 mg/mL: 1 mL para cada 1 kg de peso (máx 40 mL ou substituir por comprimido).'
    ],
    presentations: [
      {
        id: 'dexametasona-elixir-01',
        name: 'Elixir 0.1 mg/mL',
        concentrationMgPerMl: 0.1,
        unit: 'mL',
        bottleVolume: 'Frasco com 120 mL',
        posologyGuidance: '1 mL por kg de peso (máximo de 40 mL ou 4 mg) dose única.'
      },
      {
        id: 'dexametasona-comp-4',
        name: 'Comprimido 4 mg (para crianças maiores/cooperativas)',
        concentrationMgPerMl: 4,
        unit: 'comprimido',
        bottleVolume: 'Blister com 10 comprimidos',
        posologyGuidance: 'Pode ser macerado se a criança tolerar o sabor.'
      }
    ],
    instructionsForParents: (doseText, freq) => 
      `Administrar ${doseText} por via oral ${freq} no consultório ou em casa exatamente 1 hora antes da intervenção agendada.`
  },
  {
    id: 'prednisolona',
    name: 'Prednisolona',
    substance: 'Fosfato sódico de prednisolona',
    category: 'antiinflamatorios',
    commercialNames: ['Prelone', 'Predsim', 'Prednisolona Solução'],
    indication: 'Controle de processos inflamatórios agudos severos e edema pós-trauma dentoalveolar.',
    recommendedDoseMgPerKg: 1.0, // 1 mg/kg/dia
    minDoseMgPerKg: 0.5,
    maxDoseMgPerKg: 1.5,
    doseCalculationType: 'per_day',
    frequencyHours: 24,
    frequencyText: '1 vez ao dia pela manhã (ou dividida de 12 em 12h) por 2 a 3 dias',
    durationDaysDefault: 3,
    maxSingleDoseMg: 20,
    maxDailyDoseMg: 40,
    minAgeMonths: 12,
    contraindications: [
      'Infecções sistêmicas não controladas',
      'Hipersensibilidade à prednisolona'
    ],
    clinicalTips: [
      'Administrar pela manhã (por volta das 8h) para respeitar o ciclo circadiano do cortisol.',
      'Uso curto de 3 dias não requer desmame gradual na odontopediatria.',
      'Solução 3 mg/mL é a mais comum e facilita volumes menores.'
    ],
    presentations: [
      {
        id: 'prednisolona-sol-3',
        name: 'Solução Oral 3 mg/mL',
        concentrationMgPerMl: 3,
        unit: 'mL',
        bottleVolume: 'Frasco com 60 mL ou 120 mL + seringa dosadora',
        posologyGuidance: '0.33 mL por kg de peso corporal 1x ao dia pela manhã.'
      },
      {
        id: 'prednisolona-sol-1',
        name: 'Solução Oral 1 mg/mL',
        concentrationMgPerMl: 1,
        unit: 'mL',
        bottleVolume: 'Frasco com 100 mL',
        posologyGuidance: '1 mL por kg 1x ao dia pela manhã.'
      }
    ],
    instructionsForParents: (doseText, freq, days = 3) => 
      `Administrar ${doseText} por via oral pela manhã, com o café da manhã, durante ${days} dias seguidos.`
  },

  // ANTIBIÓTICOS DE USO ODONTOPEDIÁTRICO
  {
    id: 'amoxicilina',
    name: 'Amoxicilina (Primeira Escolha)',
    substance: 'Amoxicilina tri-hidratada',
    category: 'antibioticos',
    commercialNames: ['Amoxil', 'Novocilin', 'Velamox', 'Amoxicilina Pó'],
    indication: 'Primeira escolha para infecções odontogênicas com manifestação sistêmica (celulite facial, febre, linfoadenopatia, trismo).',
    recommendedDoseMgPerKg: 50, // 40 a 50 mg/kg/dia
    minDoseMgPerKg: 40,
    maxDoseMgPerKg: 50,
    doseCalculationType: 'per_day',
    frequencyHours: 8,
    frequencyText: 'De 8 em 8 horas por 7 dias (ou até 48h após remissão)',
    durationDaysDefault: 7,
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 1500,
    minAgeMonths: 2,
    contraindications: [
      'Alergia conhecida a penicilinas ou beta-lactâmicos (risco de anafilaxia)',
      'Mononucleose infecciosa (risco de exantema maculopapular difuso)'
    ],
    clinicalTips: [
      'Infecções periapicais restritas ao dente sem febre ou edema difuso NÃO requerem antibiótico: o tratamento é a intervenção local (pulpotomia/pulpectomia ou exodontia)!',
      'Suspensão 250mg/5mL = 50 mg/mL. Portanto, para 50 mg/kg/dia em 3 tomadas, o volume por tomada em mL = (Peso em kg) / 3.',
      'Reconstituir a suspensão apenas com água filtrada até a marca e agitar vigorosamente antes de cada dose.'
    ],
    presentations: [
      {
        id: 'amoxicilina-susp-250',
        name: 'Suspensão 250 mg/5 mL (50 mg/mL)',
        concentrationMgPerMl: 50,
        unit: 'mL',
        bottleVolume: 'Frasco com 150 mL após reconstituição',
        posologyGuidance: 'Mais indicada para crianças de até 20 kg.'
      },
      {
        id: 'amoxicilina-susp-500',
        name: 'Suspensão 500 mg/5 mL (100 mg/mL)',
        concentrationMgPerMl: 100,
        unit: 'mL',
        bottleVolume: 'Frasco com 150 mL após reconstituição',
        posologyGuidance: 'Ideal para crianças maiores para reduzir o volume ingerido.'
      }
    ],
    instructionsForParents: (doseText, freq, days = 7) => 
      `Administrar ${doseText} por via oral rigorosamente ${freq} durante ${days} dias completos, mesmo que os sintomas desapareçam antes. Conservar em geladeira ou local fresco conforme a bula.`
  },
  {
    id: 'amoxicilina-clavulanato',
    name: 'Amoxicilina + Clavulanato de Potássio',
    substance: 'Amoxicilina + Clavulanato',
    category: 'antibioticos',
    commercialNames: ['Clavulin', 'Novamox 2X', 'Sinot Clav'],
    indication: 'Infecções odontogênicas severas refratárias à amoxicilina simples ou com suspeita de microrganismos produtores de beta-lactamase.',
    recommendedDoseMgPerKg: 40, // Baseado na amoxicilina: 40-50 mg/kg/dia
    minDoseMgPerKg: 30,
    maxDoseMgPerKg: 50,
    doseCalculationType: 'per_day',
    frequencyHours: 8,
    frequencyText: 'De 8 em 8 horas (apres. 250mg) ou de 12 em 12 horas (apres. 400mg)',
    durationDaysDefault: 7,
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 1500,
    minAgeMonths: 3,
    contraindications: [
      'Alergia a penicilinas',
      'Histórico prévio de icterícia colestática ou disfunção hepática associada ao clavulanato'
    ],
    clinicalTips: [
      'Apresentação 400 mg + 57 mg/5 mL é administrada a cada 12 horas, facilitando muito a adesão escolar das crianças.',
      'Efeito adverso comum: diarreia transitória. Administrar no início das refeições minimiza o desconforto.'
    ],
    presentations: [
      {
        id: 'amox-clav-250',
        name: 'Suspensão 250 mg + 62.5 mg/5 mL (8/8h)',
        concentrationMgPerMl: 50,
        unit: 'mL',
        bottleVolume: 'Frasco com 75 mL ou 150 mL',
        posologyGuidance: 'Administrar a cada 8 horas no início das refeições.'
      },
      {
        id: 'amox-clav-400',
        name: 'Suspensão 400 mg + 57 mg/5 mL (12/12h)',
        concentrationMgPerMl: 80,
        unit: 'mL',
        bottleVolume: 'Frasco com 70 mL',
        posologyGuidance: 'Tomada mais cômoda de 12 em 12 horas.'
      }
    ],
    instructionsForParents: (doseText, freq, days = 7) => 
      `Administrar ${doseText} por via oral ${freq} por ${days} dias. Oferecer sempre com as refeições para evitar enjoo ou fezes amolecidas.`
  },
  {
    id: 'azitromicina',
    name: 'Azitromicina (Alérgicos à Penicilina)',
    substance: 'Azitromicina di-hidratada',
    category: 'antibioticos',
    commercialNames: ['Astro', 'Zitromax', 'Azitrolab'],
    indication: 'Primeira escolha para infecções odontogênicas e profilaxia em pacientes alérgicos a penicilinas / beta-lactâmicos.',
    recommendedDoseMgPerKg: 10, // 10 mg/kg/dia em dose ÚNICA diária
    minDoseMgPerKg: 10,
    maxDoseMgPerKg: 10,
    doseCalculationType: 'per_day',
    frequencyHours: 24,
    frequencyText: '1 vez ao dia (a cada 24 horas) por 3 a 5 dias consecutivos',
    durationDaysDefault: 3,
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 500,
    minAgeMonths: 6,
    contraindications: [
      'Hipersensibilidade a macrolídeos (eritromicina, azitromicina, claritromicina)',
      'Disfunção hepática grave'
    ],
    clinicalTips: [
      'Posologia extraordinariamente cômoda para odontopediatria: APENAS 1 tomada por dia durante 3 a 5 dias.',
      'Permanência tecidual prolongada (meia-vida de até 68 horas nos tecidos orais).',
      'Administrar 1 hora antes ou 2 horas após as refeições para melhor absorção.'
    ],
    presentations: [
      {
        id: 'azitro-susp-200',
        name: 'Suspensão 200 mg/5 mL (40 mg/mL)',
        concentrationMgPerMl: 40,
        unit: 'mL',
        bottleVolume: 'Frasco com 600 mg (15 mL) ou 900 mg (22.5 mL)',
        posologyGuidance: 'Volume em mL = Peso em kg / 4 por dia.'
      }
    ],
    instructionsForParents: (doseText, freq, days = 3) => 
      `Administrar ${doseText} por via oral ${freq} no mesmo horário durante ${days} dias. Dar com estômago vazio ou 1 hora antes do almoço/jantar.`
  },
  {
    id: 'clindamicina',
    name: 'Clindamicina (Infecções Ósseas Severas)',
    substance: 'Cloridrato de clindamicina / Palmitato',
    category: 'antibioticos',
    commercialNames: ['Dalacin C', 'Clindamin-C'],
    indication: 'Infecções odontogênicas severas com comprometimento ósseo ou refratárias em pacientes alérgicos a penicilina.',
    recommendedDoseMgPerKg: 20, // 10 a 25 mg/kg/dia
    minDoseMgPerKg: 15,
    maxDoseMgPerKg: 25,
    doseCalculationType: 'per_day',
    frequencyHours: 8,
    frequencyText: 'De 8 em 8 horas (ou de 6 em 6 horas) por 7 a 10 dias',
    durationDaysDefault: 7,
    maxSingleDoseMg: 300,
    maxDailyDoseMg: 900,
    minAgeMonths: 1,
    contraindications: [
      'Histórico de colite pseudomembranosa associada a antibióticos',
      'Hipersensibilidade à clindamicina ou lincomicina'
    ],
    clinicalTips: [
      'Excelente penetração no tecido ósseo alveolar e mandibular.',
      'Alertar os pais para suspender o medicamento e contatar imediatamente em caso de diarreia aquosa intensa com muco ou sangue.'
    ],
    presentations: [
      {
        id: 'clindamicina-susp-75',
        name: 'Solução Oral 75 mg/5 mL (15 mg/mL)',
        concentrationMgPerMl: 15,
        unit: 'mL',
        bottleVolume: 'Frasco com 100 mL',
        posologyGuidance: 'Administrar acompanhado de um copo de água.'
      }
    ],
    instructionsForParents: (doseText, freq, days = 7) => 
      `Administrar ${doseText} por via oral ${freq} por ${days} dias. Oferecer bastante água durante o uso do medicamento.`
  }
];

// TABELA COMPLETA DE ANESTÉSICOS LOCAIS ODONTOPEDIÁTRICOS
// Fontes: Stanley F. Malamed (Handbook of Local Anesthesia), AAPD Guideline on Use of Local Anesthesia for Pediatric Dental Patients
export const ANESTHETICS_LIST: AnestheticLocal[] = [
  {
    id: 'lidocaina-2-epi',
    name: 'Lidocaína 2% com Epinefrina 1:100.000',
    substance: 'Cloridrato de Lidocaína 20 mg/mL',
    vasoconstrictor: 'Epinefrina 1:100.000 (0.01 mg/mL)',
    concentrationPercent: 2,
    mgPerMl: 20,
    mgPerCartridge: 36, // 1.8 mL x 20 mg/mL = 36 mg
    maxDoseMgPerKgMalamed: 4.4, // Malamed: 4.4 mg/kg (American Academy of Pediatrics / AAPD)
    absoluteMaxDoseMg: 300,
    minAgeYears: 0,
    clinicalIndication: 'Padrão-ouro em odontopediatria. Excelente hemostasia, eficácia profunda de polpa (60 min) e tecidos moles (3-5h).'
  },
  {
    id: 'articaina-4-epi-100',
    name: 'Articaína 4% com Epinefrina 1:100.000',
    substance: 'Cloridrato de Articaína 40 mg/mL',
    vasoconstrictor: 'Epinefrina 1:100.000 (0.01 mg/mL)',
    concentrationPercent: 4,
    mgPerMl: 40,
    mgPerCartridge: 72, // 1.8 mL x 40 mg/mL = 72 mg
    maxDoseMgPerKgMalamed: 7.0, // Malamed: 7.0 mg/kg
    absoluteMaxDoseMg: 500,
    minAgeYears: 4,
    warningNotice: 'Contraindicado pela FDA e fabricantes para menores de 4 anos de idade. Alta difusão óssea!',
    clinicalIndication: 'Excelente difusão em osso cortical. Frequentemente dispensa bloqueio mandibular em molares decíduos (infiltração por vestibular costuma ser suficiente).'
  },
  {
    id: 'mepivacaina-3-sem-vaso',
    name: 'Mepivacaína 3% sem Vasoconstritor',
    substance: 'Cloridrato de Mepivacaína 30 mg/mL',
    vasoconstrictor: 'Nenhum (Livre de sulfitos e catecolaminas)',
    concentrationPercent: 3,
    mgPerMl: 30,
    mgPerCartridge: 54, // 1.8 mL x 30 mg/mL = 54 mg
    maxDoseMgPerKgMalamed: 4.4, // Malamed: 4.4 mg/kg
    absoluteMaxDoseMg: 300,
    minAgeYears: 0,
    warningNotice: 'Duração curta de anestesia pulpar (cerca de 20 minutos). Pico plasmático mais rápido.',
    clinicalIndication: 'Indicada para procedimentos curtos ou em pacientes com alergia comprovada a sulfitos/conservantes ou com cardiopatias graves.'
  },
  {
    id: 'mepivacaina-2-com-vaso',
    name: 'Mepivacaína 2% com Adrenalina 1:100.000',
    substance: 'Cloridrato de Mepivacaína 20 mg/mL',
    vasoconstrictor: 'Adrenalina 1:100.000',
    concentrationPercent: 2,
    mgPerMl: 20,
    mgPerCartridge: 36,
    maxDoseMgPerKgMalamed: 4.4,
    absoluteMaxDoseMg: 300,
    minAgeYears: 0,
    clinicalIndication: 'Alternativa segura à lidocaína com perfil similar de latência e duração cirúrgica.'
  },
  {
    id: 'prilocaina-3-felipressina',
    name: 'Prilocaína 3% com Felipressina 0.03 UI/mL',
    substance: 'Cloridrato de Prilocaína 30 mg/mL',
    vasoconstrictor: 'Felipressina 0.03 UI/mL (análogo de vasopressina)',
    concentrationPercent: 3,
    mgPerMl: 30,
    mgPerCartridge: 54,
    maxDoseMgPerKgMalamed: 6.0,
    absoluteMaxDoseMg: 400,
    minAgeYears: 1,
    warningNotice: 'Risco de metemoglobinemia em lactentes e recém-nascidos. Evitar se anemia ou histórico.',
    clinicalIndication: 'Útil quando há contraindicação absoluta ao uso de aminas simpatomiméticas (adrenalina/noradrenalina).'
  }
];

// DIRETRIZES DA AHA / AAPD / SBP PARA PROFILAXIA DA ENDOCARDITE INFECCIOSA
export const PROPHYLAXIS_REGIMENS: ProphylaxisProtocol[] = [
  {
    situation: 'Padrão / Sem alergia à penicilina',
    medication: 'Amoxicilina',
    route: 'Oral (VO)',
    regimenChildren: '50 mg/kg em dose única',
    dosePerKg: 50,
    maxDose: 2000, // 2g
    timing: '30 a 60 minutos antes do procedimento',
    notes: 'Mais prescrito. Se o paciente esquecer, pode ser administrado até 2 horas após o procedimento.'
  },
  {
    situation: 'Alérgico a Penicilina (Opção A - Macrolídeo)',
    medication: 'Azitromicina ou Claritromicina',
    route: 'Oral (VO)',
    regimenChildren: '15 mg/kg em dose única',
    dosePerKg: 15,
    maxDose: 500, // 500 mg
    timing: '30 a 60 minutos antes do procedimento',
    notes: 'Primeira escolha para alérgicos imediatos/graves à penicilina.'
  },
  {
    situation: 'Alérgico a Penicilina (Opção B - Lincosamina)',
    medication: 'Clindamicina',
    route: 'Oral (VO)',
    regimenChildren: '20 mg/kg em dose única',
    dosePerKg: 20,
    maxDose: 600, // 600 mg
    timing: '30 a 60 minutos antes do procedimento',
    notes: 'Nota: Atualizações da AHA retiraram clindamicina como primeira linha devido ao risco de C. difficile, mas ainda utilizada.'
  },
  {
    situation: 'Alérgico a Penicilina sem histórico de anafilaxia',
    medication: 'Cefalexina ou Cefadroxila',
    route: 'Oral (VO)',
    regimenChildren: '50 mg/kg em dose única',
    dosePerKg: 50,
    maxDose: 2000,
    timing: '30 a 60 minutos antes do procedimento',
    notes: 'Não usar se histórico de anafilaxia, angioedema ou urticária com penicilinas.'
  }
];

// ESTIMATIVA DE PESO PELA IDADE (Fórmula de Nelson e percentil 50 OMS)
export interface AgeWeightReference {
  label: string;
  ageYears: number;
  weightKg: number;
  stage: 'lactente' | 'pre-escolar' | 'escolar';
}

export const AGE_WEIGHT_TABLE: AgeWeightReference[] = [
  { label: '3 meses', ageYears: 0.25, weightKg: 6.0, stage: 'lactente' },
  { label: '6 meses', ageYears: 0.5, weightKg: 7.5, stage: 'lactente' },
  { label: '9 meses', ageYears: 0.75, weightKg: 9.0, stage: 'lactente' },
  { label: '1 ano', ageYears: 1.0, weightKg: 10.0, stage: 'pre-escolar' },
  { label: '1 ano e meio', ageYears: 1.5, weightKg: 11.5, stage: 'pre-escolar' },
  { label: '2 anos', ageYears: 2.0, weightKg: 12.5, stage: 'pre-escolar' },
  { label: '3 anos', ageYears: 3.0, weightKg: 14.5, stage: 'pre-escolar' },
  { label: '4 anos', ageYears: 4.0, weightKg: 16.5, stage: 'pre-escolar' },
  { label: '5 anos', ageYears: 5.0, weightKg: 18.5, stage: 'pre-escolar' },
  { label: '6 anos', ageYears: 6.0, weightKg: 21.0, stage: 'escolar' },
  { label: '7 anos', ageYears: 7.0, weightKg: 23.5, stage: 'escolar' },
  { label: '8 anos', ageYears: 8.0, weightKg: 26.0, stage: 'escolar' },
  { label: '9 anos', ageYears: 9.0, weightKg: 29.5, stage: 'escolar' },
  { label: '10 anos', ageYears: 10.0, weightKg: 33.0, stage: 'escolar' },
  { label: '11 anos', ageYears: 11.0, weightKg: 37.0, stage: 'escolar' },
  { label: '12 anos', ageYears: 12.0, weightKg: 42.0, stage: 'escolar' }
];

export interface PrescriptionItem {
  id: string;
  medicationName: string;
  presentationName: string;
  posologyText: string;
  calculatedValue: string; // Ex: "15 gotas" ou "3.5 mL"
  notes?: string;
  timestamp: number;
}
