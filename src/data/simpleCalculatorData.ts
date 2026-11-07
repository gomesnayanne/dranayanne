export interface PediatricMedDose {
  id: string;
  name: string;
  classType: 'analgesicos' | 'antiinflamatorios' | 'antibioticos' | 'anestesicos' | 'antifungicos' | 'sedacao';
  presentationTitle: string;
  calculateDose: (weightKg: number) => {
    doseDisplay: string;
    posology: string;
    details: string;
    maxWarning?: string;
  };
}

export interface AdultMed {
  id: string;
  name: string;
  classType: 'analgesicos' | 'antiinflamatorios' | 'antibioticos' | 'benzodiazepinicos' | 'corticosteroides' | 'antifungicos' | 'anestesicos' | 'antivirais';
  commercialNames: string;
  posology: string;
  instructions: string;
  warning?: string;
}

export const PEDIATRIC_CLASSES = [
  { id: 'analgesicos', label: 'Analgésicos' },
  { id: 'antiinflamatorios', label: 'Anti-inflamatórios' },
  { id: 'antibioticos', label: 'Antibióticos' },
  { id: 'anestesicos', label: 'Anestésicos locais' },
  { id: 'antifungicos', label: 'Antifúngicos' },
  { id: 'sedacao', label: 'Sedação' }
] as const;

export const PEDIATRIC_DOSES: PediatricMedDose[] = [
  // Analgésicos
  {
    id: 'dipirona-500',
    name: 'Dipirona 500 mg/mL',
    classType: 'analgesicos',
    presentationTitle: 'Dipirona 500 mg/mL (solução gotas)',
    calculateDose: (w) => {
      // 1 gota por kg até 35-40 gotas máx
      const drops = Math.max(1, Math.min(40, Math.round(w)));
      return {
        doseDisplay: `${drops} gotas`,
        posology: 'A cada 6/8 horas (se dor ou febre)',
        details: `Cada gota contém 25 mg. Regra prática pediátrica: 1 gota por cada 1 kg de peso da criança a cada 6 a 8 horas. Dose máxima pediátrica recomendada por tomada: 40 gotas (~1000 mg). A duração do tratamento dependerá da avaliação individual do profissional.`,
        maxWarning: w > 40 ? 'Dose limitada ao teto máximo seguro de 40 gotas por tomada.' : undefined
      };
    }
  },
  {
    id: 'dipirona-50',
    name: 'Dipirona 50 mg/mL',
    classType: 'analgesicos',
    presentationTitle: 'Dipirona 50 mg/mL (solução oral)',
    calculateDose: (w) => {
      // Dose: 10-25 mg/kg => ~15 mg/kg / 50 mg/ml = 0.3 ml/kg
      const ml = Math.round((w * 0.3) * 10) / 10;
      const safeMl = Math.min(20, ml);
      return {
        doseDisplay: `${safeMl} mL`,
        posology: 'A cada 6/8 horas (se dor ou febre)',
        details: `Solução oral 50 mg/mL (acompanha seringa/copo dosador). Dose baseada em 15 mg/kg por tomada. Ideal para crianças que rejeitam o sabor amargo das gotas concentradas.`
      };
    }
  },
  {
    id: 'paracetamol-200',
    name: 'Paracetamol 200 mg/mL',
    classType: 'analgesicos',
    presentationTitle: 'Paracetamol 200 mg/mL (solução gotas)',
    calculateDose: (w) => {
      // 1 gota/kg (10 mg/kg) até 35-40 gotas
      const drops = Math.max(1, Math.min(35, Math.round(w)));
      return {
        doseDisplay: `${drops} gotas`,
        posology: 'A cada 6 horas (máximo 4 a 5 tomadas/dia)',
        details: `Cada gota contém 10 mg de paracetamol. Dose recomendada: 1 gota por kg de peso corporal a cada 6 horas. Respeitar o intervalo mínimo de 6 horas para proteção hepática.`
      };
    }
  },
  {
    id: 'paracetamol-32',
    name: 'Paracetamol 32 mg/mL',
    classType: 'analgesicos',
    presentationTitle: 'Paracetamol 32 mg/mL (160 mg/5 mL suspensão)',
    calculateDose: (w) => {
      // 12 mg/kg / 32 mg/ml = 0.375 ml/kg
      const ml = Math.round((w * 0.375) * 10) / 10;
      return {
        doseDisplay: `${Math.min(25, ml)} mL`,
        posology: 'A cada 6 horas (se dor ou febre)',
        details: `Suspensão oral sabor frutas (32 mg/mL). Excelente aceitação infantil. Administrar com seringa dosadora graduada.`
      };
    }
  },
  {
    id: 'paracetamol-100',
    name: 'Paracetamol 100 mg/mL',
    classType: 'analgesicos',
    presentationTitle: 'Paracetamol Bebê 100 mg/mL (solução oral)',
    calculateDose: (w) => {
      // 12 mg/kg / 100 mg/ml = 0.12 ml/kg
      const ml = Math.round((w * 0.12) * 10) / 10;
      return {
        doseDisplay: `${Math.max(0.3, Math.min(10, ml))} mL`,
        posology: 'A cada 6 horas',
        details: `Tylenol Bebê 100 mg/mL (acompanha seringa dosadora). Agite antes de usar. Atenção: concentração diferente das gotas comuns de 200 mg/mL!`
      };
    }
  },
  {
    id: 'ibuprofeno-50',
    name: 'Ibuprofeno 50 mg/mL',
    classType: 'analgesicos',
    presentationTitle: 'Ibuprofeno 50 mg/mL (solução gotas)',
    calculateDose: (w) => {
      // 1 a 2 gotas por kg (Dose 5-10 mg/kg; 1 gota = 2.5 mg => 2 gotas/kg = 5 mg/kg)
      const drops = Math.max(2, Math.min(40, Math.round(w * 1.5)));
      return {
        doseDisplay: `${drops} gotas`,
        posology: 'A cada 6/8 horas após as refeições',
        details: `1 gota = 2.5 mg. Dose pediátrica padrão: 1 a 2 gotas por kg por tomada. Máximo de 40 gotas por dose. Uso preferencial após alimentação para evitar desconforto gástrico. Indicado para maiores de 6 meses.`
      };
    }
  },
  {
    id: 'ibuprofeno-100',
    name: 'Ibuprofeno 100 mg/mL',
    classType: 'analgesicos',
    presentationTitle: 'Ibuprofeno 100 mg/mL (gotas concentradas)',
    calculateDose: (w) => {
      // 1 gota a cada 2 kg (1 gota = 5 mg)
      const drops = Math.max(1, Math.min(20, Math.round(w / 2)));
      return {
        doseDisplay: `${drops} gotas`,
        posology: 'A cada 6/8 horas',
        details: `Atenção: apresentação concentrada! 1 gota = 5 mg (o dobro da concentração). Administrar 1 gota para cada 2 kg de peso da criança. Máximo de 20 gotas por dose.`
      };
    }
  },

  // Anti-inflamatórios
  {
    id: 'dexametasona-elixir',
    name: 'Dexametasona 0.1 mg/mL',
    classType: 'antiinflamatorios',
    presentationTitle: 'Dexametasona Elixir 0.1 mg/mL',
    calculateDose: (w) => {
      // 0.1 mg/kg => 1 mL por kg, máx 40 mL (4 mg)
      const ml = Math.max(1, Math.min(40, Math.round(w)));
      return {
        doseDisplay: `${ml} mL (${(ml * 0.1).toFixed(1)} mg)`,
        posology: 'Dose única 1 hora antes do procedimento cirúrgico',
        details: `Pré-operatório em cirurgias invasivas infantis (exodontias múltiplas, dentes inclusos, ulectomias). 1 mL de elixir por kg de peso (máximo de 40 mL / 4 mg). Reduz drasticamente o edema pós-operatório.`
      };
    }
  },
  {
    id: 'prednisolona-3',
    name: 'Prednisolona 3 mg/mL',
    classType: 'antiinflamatorios',
    presentationTitle: 'Prednisolona 3 mg/mL (solução oral)',
    calculateDose: (w) => {
      // 1 mg/kg/dia / 3 mg/ml = 0.33 ml/kg
      const ml = Math.round((w * 0.33) * 10) / 10;
      return {
        doseDisplay: `${Math.min(10, ml)} mL`,
        posology: '1 vez ao dia pela manhã por 3 dias',
        details: `Dose calculada em 1 mg/kg/dia. Administrar preferencialmente pela manhã com o café da manhã. Tratamentos curtos de até 3 dias na odontologia não necessitam de desmame gradual.`
      };
    }
  },

  // Antibióticos
  {
    id: 'amoxicilina-250',
    name: 'Amoxicilina 250 mg/5 mL',
    classType: 'antibioticos',
    presentationTitle: 'Amoxicilina 250 mg/5 mL (50 mg/mL suspensão)',
    calculateDose: (w) => {
      // 50 mg/kg/dia dividido em 3 tomadas (8/8h) => (w * 50 / 3) / 50 = w / 3 mL por tomada
      const ml = Math.round((w / 3) * 10) / 10;
      return {
        doseDisplay: `${Math.min(15, ml)} mL`,
        posology: 'De 8 em 8 horas por 7 dias',
        details: `Dose calculada: 50 mg/kg/dia divididos de 8 em 8 horas. Reconstituir o pó com água filtrada até a marca indicada no frasco e agitar bem antes de cada administração. Conservar conforme orientação da bula.`
      };
    }
  },
  {
    id: 'amoxicilina-500',
    name: 'Amoxicilina 500 mg/5 mL',
    classType: 'antibioticos',
    presentationTitle: 'Amoxicilina 500 mg/5 mL (100 mg/mL suspensão)',
    calculateDose: (w) => {
      // w / 6 mL por tomada
      const ml = Math.round((w / 6) * 10) / 10;
      return {
        doseDisplay: `${Math.min(10, ml)} mL`,
        posology: 'De 8 em 8 horas por 7 dias',
        details: `Apresentação mais concentrada indicada para crianças maiores para diminuir o volume ingerido. Administrar rigorosamente a cada 8 horas.`
      };
    }
  },
  {
    id: 'amox-clav-250',
    name: 'Amox + Clavulanato 250 mg',
    classType: 'antibioticos',
    presentationTitle: 'Amoxicilina + Clavulanato 250 mg + 62.5 mg/5 mL',
    calculateDose: (w) => {
      const ml = Math.round((w / 3) * 10) / 10;
      return {
        doseDisplay: `${Math.min(15, ml)} mL`,
        posology: 'De 8 em 8 horas junto às refeições',
        details: `Indicada para infecções odontogênicas severas ou resistentes. Administrar no início das refeições para diminuir o risco de náuseas ou desconforto gastrointestinal.`
      };
    }
  },
  {
    id: 'azitromicina-200',
    name: 'Azitromicina 200 mg/5 mL',
    classType: 'antibioticos',
    presentationTitle: 'Azitromicina 200 mg/5 mL (40 mg/mL suspensão)',
    calculateDose: (w) => {
      // 10 mg/kg em tomada única diária => w * 10 / 40 = w / 4 mL
      const ml = Math.round((w / 4) * 10) / 10;
      return {
        doseDisplay: `${Math.min(12.5, ml)} mL (Dose única diária)`,
        posology: '1 vez ao dia durante 3 a 5 dias consecutivos',
        details: `Primeira escolha para pacientes alérgicos à penicilina. Dose de 10 mg/kg em tomada ÚNICA diária no mesmo horário. Oferecer 1 hora antes ou 2 horas após as refeições.`
      };
    }
  },
  {
    id: 'amox-profilaxia',
    name: 'Profilaxia Amoxicilina (Dose Única)',
    classType: 'antibioticos',
    presentationTitle: 'Profilaxia Endocardite: Amoxicilina 250 mg/5 mL',
    calculateDose: (w) => {
      // 50 mg/kg dose única máx 2000mg => w * 50 / 50 = w mL
      const mg = Math.min(2000, Math.round(w * 50));
      const ml = Math.round((mg / 50) * 10) / 10;
      return {
        doseDisplay: `${mg} mg (${ml} mL)`,
        posology: 'Dose única 30 a 60 minutos antes do procedimento',
        details: `Diretriz AHA/AAPD para prevenção de Endocardite Infecciosa em cardiopatas de risco. Administrar de 30 a 60 minutos antes de procedimentos com manipulação gengival ou periapical. Teto máximo: 2000 mg (40 mL).`
      };
    }
  },

  // Anestésicos Locais
  {
    id: 'lidocaina-2-epi',
    name: 'Lidocaína 2% com Epi 1:100.000',
    classType: 'anestesicos',
    presentationTitle: 'Lidocaína 2% com Epinefrina 1:100.000 (Tubete 1.8 mL)',
    calculateDose: (w) => {
      // Malamed: 4.4 mg/kg, máx 300mg. Tubete = 36 mg
      const maxMg = Math.min(300, Math.round(w * 4.4 * 10) / 10);
      const cartridges = Math.floor((maxMg / 36) * 10) / 10;
      return {
        doseDisplay: `${cartridges} tubete(s) no máximo`,
        posology: 'Dose máxima por sessão clínica',
        details: `Padrão-ouro em odontopediatria. Malamed: 4.4 mg/kg (máx absoluto 300 mg). Cada tubete de 1.8 mL contém 36 mg de sal. Dose máxima em mg permitida para ${w} kg: ${maxMg} mg. Injetar sempre lentamente (mínimo de 60 segundos por tubete).`
      };
    }
  },
  {
    id: 'articaina-4-epi',
    name: 'Articaína 4% com Epi 1:100.000',
    classType: 'anestesicos',
    presentationTitle: 'Articaína 4% com Epinefrina 1:100.000 (Tubete 1.8 mL)',
    calculateDose: (w) => {
      // Malamed: 7 mg/kg, máx 500mg. Tubete = 72 mg
      const isUnderAge = w < 15;
      const maxMg = Math.min(500, Math.round(w * 7.0 * 10) / 10);
      const cartridges = Math.floor((maxMg / 72) * 10) / 10;
      return {
        doseDisplay: isUnderAge ? 'CONTRAINDICADO (< 4 anos / < 15 kg)' : `${cartridges} tubete(s) no máximo`,
        posology: 'Dose máxima por sessão clínica',
        details: `Cada tubete de 1.8 mL contém 72 mg de cloridrato de articaína. Limite de Malamed: 7.0 mg/kg (teto máximo absoluto de 500 mg). Contraindicada por fabricantes e FDA para crianças menores de 4 anos de idade.`,
        maxWarning: isUnderAge ? 'Articaína 4% não é aprovada para crianças com menos de 4 anos ou peso inferior a 15 kg.' : undefined
      };
    }
  },
  {
    id: 'mepivacaina-3-sem',
    name: 'Mepivacaína 3% sem Vaso',
    classType: 'anestesicos',
    presentationTitle: 'Mepivacaína 3% sem Vasoconstritor (Tubete 1.8 mL)',
    calculateDose: (w) => {
      // Malamed: 4.4 mg/kg, máx 300mg. Tubete = 54 mg
      const maxMg = Math.min(300, Math.round(w * 4.4 * 10) / 10);
      const cartridges = Math.floor((maxMg / 54) * 10) / 10;
      return {
        doseDisplay: `${cartridges} tubete(s) no máximo`,
        posology: 'Dose máxima por sessão clínica',
        details: `Livre de sulfitos. Cada tubete de 1.8 mL contém 54 mg de sal mepivacaína. Anestesia pulpar curta (aprox. 20 min). Absorção vascular mais rápida pelo efeito vasodilatador intrínseco.`
      };
    }
  },
  {
    id: 'mepivacaina-2-com',
    name: 'Mepivacaína 2% com Adrenalina',
    classType: 'anestesicos',
    presentationTitle: 'Mepivacaína 2% com Epinefrina 1:100.000 (Tubete 1.8 mL)',
    calculateDose: (w) => {
      const maxMg = Math.min(300, Math.round(w * 4.4 * 10) / 10);
      const cartridges = Math.floor((maxMg / 36) * 10) / 10;
      return {
        doseDisplay: `${cartridges} tubete(s) no máximo`,
        posology: 'Dose máxima por sessão clínica',
        details: `Cada tubete contém 36 mg de sal. Alternativa eficaz e com perfil semelhante à lidocaína 2% com epinefrina.`
      };
    }
  },

  // Antifúngicos
  {
    id: 'nistatina-susp',
    name: 'Nistatina 100.000 UI/mL',
    classType: 'antifungicos',
    presentationTitle: 'Nistatina 100.000 UI/mL (suspensão oral)',
    calculateDose: () => {
      return {
        doseDisplay: '1 a 2 mL por aplicação',
        posology: 'Aplicar na cavidade oral de 6 em 6 horas',
        details: `Para tratamento de candidíase pseudomembranosa ("sapinho"). Pingar metade da dose em cada lado da bochecha e manter na boca o maior tempo possível antes de engolir. Manter o tratamento por 48 horas após o desaparecimento completo das placas brancas. Higienizar bicos, chupetas e mamadeiras.`
      };
    }
  },
  {
    id: 'miconazol-gel',
    name: 'Miconazol Gel Oral 20 mg/g',
    classType: 'antifungicos',
    presentationTitle: 'Miconazol Gel Oral 20 mg/g (Daktarin)',
    calculateDose: (w) => {
      const isInfant = w < 10;
      return {
        doseDisplay: isInfant ? '1/4 de colher medidora (1.25 mL)' : '1/2 colher medidora (2.5 mL)',
        posology: 'Aplicar 4 vezes ao dia após as mamadas/refeições',
        details: `Aplicar o gel diretamente sobre as lesões com o dedo limpo ou gaze. Não aplicar na parte posterior da garganta para evitar risco de asfixia em lactentes. Indicado para crianças acima de 6 meses.`
      };
    }
  },

  // Sedação
  {
    id: 'midazolam-solucao',
    name: 'Midazolam 2 mg/mL (Oral)',
    classType: 'sedacao',
    presentationTitle: 'Midazolam Solução Oral 2 mg/mL',
    calculateDose: (w) => {
      // 0.3 a 0.5 mg/kg oral => usar 0.3 mg/kg padrão
      const mg = Math.round(w * 0.3 * 10) / 10;
      const ml = Math.round((mg / 2) * 10) / 10;
      const safeMl = Math.min(7.5, ml); // máx 15mg
      return {
        doseDisplay: `${safeMl} mL (${(safeMl * 2).toFixed(1)} mg)`,
        posology: 'Dose única 20 a 30 minutos antes da intervenção',
        details: `Sedação consciente ambulatorial por profissional habilitado. Dose padrão: 0.3 a 0.5 mg/kg por via oral (máx 15 mg). Monitorar continuamente oximetria de pulso, frequência cardíaca e nível de consciência. Paciente deve estar em jejum obrigatório conforme protocolo anestésico.`
      };
    }
  }
];

export const ADULT_CLASSES = [
  { id: 'analgesicos', label: 'Analgésicos', color: 'bg-[#FFD1DC]', activeColor: 'bg-[#FF94B4]' },
  { id: 'antiinflamatorios', label: 'Anti-inflamatórios', color: 'bg-[#FFE4BC]', activeColor: 'bg-[#FFB86C]' },
  { id: 'antibioticos', label: 'Antibióticos', color: 'bg-[#BAE6FD]', activeColor: 'bg-[#7DD3FC]' },
  { id: 'benzodiazepinicos', label: 'Benzodiazepínicos', color: 'bg-[#FECDD3]', activeColor: 'bg-[#FDA4AF]' },
  { id: 'corticosteroides', label: 'Corticosteróides', color: 'bg-[#E9D5FF]', activeColor: 'bg-[#D8B4FE]' },
  { id: 'antifungicos', label: 'Antifúngicos', color: 'bg-[#FED7AA]', activeColor: 'bg-[#FDBA74]' },
  { id: 'anestesicos', label: 'Cálculo Anestésico', color: 'bg-[#A7F3D0]', activeColor: 'bg-[#6EE7B7]' },
  { id: 'antivirais', label: 'Antivirais', color: 'bg-[#FBCFE8]', activeColor: 'bg-[#F472B6]' }
] as const;

export const ADULT_MEDICATIONS: AdultMed[] = [
  // Anti-inflamatórios
  {
    id: 'diclofenaco-sodico',
    name: 'Diclofenaco Sódico',
    classType: 'antiinflamatorios',
    commercialNames: 'Voltaren® 50mg, 100mg | Cataflam® 50mg | Torsilax® | Biofenac® | Artren® | Diclac®',
    posology: '1 comprimido de 50 mg de 8 em 8 horas por 3 dias (ou 1 comprimido de 100 mg 1x ao dia).',
    instructions: 'Tomar após as refeições com um copo cheio de água. Contraindicado em casos de úlcera péptica ativa, insuficiência renal severa ou histórico de alergia a AINEs/AAS.'
  },
  {
    id: 'trometamol-cetorolaco',
    name: 'Trometamol Cetorolaco',
    classType: 'antiinflamatorios',
    commercialNames: 'Toragesic® 10mg sublingual | Deocil® | Cetorolaco genérico',
    posology: '1 comprimido sublingual de 10 mg a cada 6 ou 8 horas. Máximo de 40 mg ao dia por até 5 dias.',
    instructions: 'Colocar o comprimido sob a língua e aguardar a dissolução completa sem mastigar. Excelente potência analgésica para pós-operatório cirúrgico imediato.'
  },
  {
    id: 'ibuprofeno-adulto',
    name: 'Ibuprofeno',
    classType: 'antiinflamatorios',
    commercialNames: 'Advil® 400mg, 600mg | Alivium® 600mg | Motrin® | Ibumax®',
    posology: '1 comprimido de 600 mg a cada 8 horas (ou 400 mg a cada 6 horas) por 3 dias.',
    instructions: 'Administrar junto ou logo após as refeições. Bom perfil de segurança inflamatória com ação analgésica expressiva.'
  },
  {
    id: 'nimesulida',
    name: 'Nimesulida',
    classType: 'antiinflamatorios',
    commercialNames: 'Nisulid® 100mg | Cimelide® | Scaflam® | Nimesil®',
    posology: '1 comprimido de 100 mg a cada 12 horas por no máximo 3 a 5 dias.',
    instructions: 'Uso restrito a curto prazo pelo potencial de hepatotoxicidade. Contraindicado em pacientes com hepatopatias prévias.'
  },
  {
    id: 'cetoprofeno',
    name: 'Cetoprofeno',
    classType: 'antiinflamatorios',
    commercialNames: 'Profenid® 100mg, 150mg | Bi-Profenid® 150mg | Artrosil®',
    posology: '1 comprimido de 150 mg 1x ao dia (ou 100 mg a cada 12 horas) por 3 dias.',
    instructions: 'Tomar com água durante ou após o almoço/jantar.'
  },

  // Analgésicos Adultos
  {
    id: 'dipirona-adulto',
    name: 'Dipirona Monoidratada',
    classType: 'analgesicos',
    commercialNames: 'Novalgina® 500mg, 1g | Anador® | Maxalgina®',
    posology: '1 comprimido de 500 mg a 1 g por via oral de 6 em 6 horas se houver dor.',
    instructions: 'Padrão-ouro em analgesia odontológica. Não ultrapassar 4 g ao dia.'
  },
  {
    id: 'paracetamol-adulto',
    name: 'Paracetamol',
    classType: 'analgesicos',
    commercialNames: 'Tylenol® 500mg, 750mg | Parador®',
    posology: '1 comprimido de 750 mg a cada 6 horas se dor ou febre.',
    instructions: 'Alternativa em pacientes com contraindicação à dipirona. Teto máximo diário de 3 g a 4 g.'
  },

  // Antibióticos Adultos
  {
    id: 'amoxicilina-adulto',
    name: 'Amoxicilina 500 mg',
    classType: 'antibioticos',
    commercialNames: 'Amoxil® 500mg, 875mg | Velamox® | Novocilin®',
    posology: '1 cápsula de 500 mg de 8 em 8 horas durante 7 dias (ou 875 mg de 12/12h).',
    instructions: 'Primeira escolha para infecções odontogênicas com manifestação sistêmica (febre, edema disseminado).'
  },
  {
    id: 'amox-clav-adulto',
    name: 'Amoxicilina + Clavulanato 875/125 mg',
    classType: 'antibioticos',
    commercialNames: 'Clavulin BD® 875mg | Sinot Clav®',
    posology: '1 comprimido de 12 em 12 horas por 7 dias.',
    instructions: 'Indicado em infecções bacterianas resistentes ou falha de resposta inicial à amoxicilina simples.'
  },
  {
    id: 'azitromicina-adulto',
    name: 'Azitromicina 500 mg',
    classType: 'antibioticos',
    commercialNames: 'Astro® 500mg | Zitromax®',
    posology: '1 comprimido de 500 mg uma vez ao dia durante 3 dias consecutivos.',
    instructions: 'Primeira escolha para pacientes adultos alérgicos a penicilinas.'
  },

  // Benzodiazepínicos
  {
    id: 'midazolam-adulto',
    name: 'Midazolam 7.5 mg / 15 mg',
    classType: 'benzodiazepinicos',
    commercialNames: 'Dormonid® 7.5mg, 15mg',
    posology: '1 comprimido de 7.5 mg a 15 mg por via oral 30 a 45 minutos antes da cirurgia.',
    instructions: 'Sedação consciente ansiolítica. O paciente deve obrigatoriamente estar acompanhado de um adulto responsável.'
  },
  {
    id: 'diazepam-adulto',
    name: 'Diazepam 5 mg / 10 mg',
    classType: 'benzodiazepinicos',
    commercialNames: 'Valium® 5mg, 10mg | Compaz®',
    posology: '1 comprimido de 5 mg a 10 mg na noite anterior e/ou 1 hora antes do atendimento.',
    instructions: 'Ação ansiolítica com meia-vida prolongada. Proibido dirigir após a tomada.'
  },

  // Corticosteróides Adultos
  {
    id: 'dexametasona-adulto',
    name: 'Dexametasona 4 mg',
    classType: 'corticosteroides',
    commercialNames: 'Decadron® 4mg | Dexametasona genérica',
    posology: '1 a 2 comprimidos (4 mg a 8 mg) em dose única 1 hora antes do procedimento cirúrgico.',
    instructions: 'Excelente controle preventivo de trismo e edema em cirurgias de terceiros molares.'
  },

  // Antifúngicos Adultos
  {
    id: 'fluconazol-adulto',
    name: 'Fluconazol 150 mg',
    classType: 'antifungicos',
    commercialNames: 'Zoltec® 150mg | Fluconazol cápsula',
    posology: '1 cápsula de 150 mg em dose única semanal por 2 a 4 semanas (conforme o caso clínico).',
    instructions: 'Tratamento de candidíase eritematosa / estomatite protética refratária ao tratamento tópico.'
  },

  // Antivirais Adultos
  {
    id: 'aciclovir-adulto',
    name: 'Aciclovir 200 mg / 400 mg',
    classType: 'antivirais',
    commercialNames: 'Zovirax® 200mg | Aciclovir comprimidos',
    posology: '1 comprimido de 200 mg 5 vezes ao dia (a cada 4 horas, pulando a dose da madrugada) por 5 dias.',
    instructions: 'Iniciar idealmente no pródromo (primeiros sinais de formigamento ou queimação) do Herpes Simples Recorrente.'
  },

  // Anestésicos Adultos
  {
    id: 'anestesicos-adulto-guia',
    name: 'Protocolo de Anestésicos Locais (Malamed)',
    classType: 'anestesicos',
    commercialNames: 'Lidocaína 2% (máx 8 tubetes) | Articaína 4% (máx 7 tubetes) | Mepivacaína 2% (máx 8 tubetes)',
    posology: 'Consultar tabela máxima absoluta de 500 mg para Articaína e 300 mg para Lidocaína/Mepivacaína.',
    instructions: 'Para um adulto hígido de 70 kg, a dose máxima de Lidocaína 2% com Epinefrina 1:100.000 é de aproximadamente 8 tubetes de 1.8 mL.'
  }
];
