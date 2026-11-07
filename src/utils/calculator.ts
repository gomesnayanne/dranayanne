import { Medication, Presentation, AnestheticLocal, ProphylaxisProtocol } from '../data/medications';

export interface CalculationResult {
  mgPerDose: number;
  mgPerDay: number;
  value: number; // Quantidade numérica (ex: 15 para gotas, 3.5 para mL)
  unit: 'gotas' | 'mL' | 'comprimido';
  formattedResult: string; // Ex: "15 gotas" ou "3.5 mL"
  isCapped: boolean;
  alert?: string;
  posologyText: string;
}

export function calculateMedicationDose(
  med: Medication,
  pres: Presentation,
  weightKg: number
): CalculationResult {
  let isCapped = false;
  let alert: string | undefined;

  // Verificação de peso mínimo de segurança
  if (med.id === 'dipirona' && weightKg < 5) {
    alert = 'Atenção: Dipirona é contraindicada para bebês com menos de 5 kg.';
  } else if (med.id === 'ibuprofeno' && weightKg < 7) {
    alert = 'Atenção: Ibuprofeno não é recomendado rotineiramente para bebês com menos de 6 meses (~7 kg). Prefira Paracetamol.';
  }

  let mgPerDose = 0;
  let mgPerDay = 0;

  if (med.doseCalculationType === 'per_dose') {
    const rawMgPerDose = weightKg * med.recommendedDoseMgPerKg;
    if (rawMgPerDose > med.maxSingleDoseMg) {
      mgPerDose = med.maxSingleDoseMg;
      isCapped = true;
    } else {
      mgPerDose = rawMgPerDose;
    }
    const dosesPerDay = Math.floor(24 / med.frequencyHours);
    mgPerDay = Math.min(mgPerDose * dosesPerDay, med.maxDailyDoseMg);
  } else {
    // per_day
    const rawMgPerDay = weightKg * med.recommendedDoseMgPerKg;
    if (rawMgPerDay > med.maxDailyDoseMg) {
      mgPerDay = med.maxDailyDoseMg;
      isCapped = true;
    } else {
      mgPerDay = rawMgPerDay;
    }
    const dosesPerDay = Math.floor(24 / med.frequencyHours);
    const rawSingle = mgPerDay / dosesPerDay;
    if (rawSingle > med.maxSingleDoseMg) {
      mgPerDose = med.maxSingleDoseMg;
      isCapped = true;
    } else {
      mgPerDose = rawSingle;
    }
  }

  let value = 0;
  let formattedResult = '';

  if (pres.unit === 'gotas') {
    const dropsPerMl = pres.dropsPerMl || 20;
    const mgPerDrop = pres.concentrationMgPerMl / dropsPerMl;
    const rawDrops = Math.round(mgPerDose / mgPerDrop);

    // Ajustes práticos de odontopediatria:
    // Dipirona 500mg/ml: 1 gota/kg (máx 35-40 gotas)
    // Paracetamol 200mg/ml: 1 gota/kg (máx 35-40 gotas)
    // Ibuprofeno 50mg/ml: 1 a 2 gotas/kg (máx 40 gotas)
    let finalDrops = rawDrops;
    if (finalDrops > 40) {
      finalDrops = 40;
      isCapped = true;
    }
    value = Math.max(1, finalDrops);
    formattedResult = `${value} gotas`;
  } else if (pres.unit === 'mL') {
    const rawMl = mgPerDose / pres.concentrationMgPerMl;
    // Arredondar para 1 casa decimal (ex: 3.2 mL, 5.0 mL)
    const roundedMl = Math.round(rawMl * 10) / 10;
    value = Math.max(0.2, roundedMl);
    formattedResult = `${value} mL`;
  } else {
    // comprimido
    const tabs = Math.round((mgPerDose / pres.concentrationMgPerMl) * 10) / 10;
    value = tabs;
    formattedResult = `${value} comp.`;
  }

  const posologyText = med.instructionsForParents(
    formattedResult,
    med.frequencyText,
    med.durationDaysDefault
  );

  return {
    mgPerDose: Math.round(mgPerDose * 10) / 10,
    mgPerDay: Math.round(mgPerDay * 10) / 10,
    value,
    unit: pres.unit,
    formattedResult,
    isCapped,
    alert,
    posologyText
  };
}

export interface AnestheticCalculation {
  anesthetic: AnestheticLocal;
  weightKg: number;
  maxDoseTotalMg: number;
  maxCartridges: number;
  maxCartridgesDisplay: string;
  isAgeRestricted: boolean;
  warning?: string;
}

export function calculateAnestheticDose(
  anesthetic: AnestheticLocal,
  weightKg: number
): AnestheticCalculation {
  const maxMgByWeight = weightKg * anesthetic.maxDoseMgPerKgMalamed;
  const maxDoseTotalMg = Math.min(maxMgByWeight, anesthetic.absoluteMaxDoseMg);
  const rawCartridges = maxDoseTotalMg / anesthetic.mgPerCartridge;
  
  // Arredondar para 1 decimal de forma conservadora (para baixo para segurança)
  const maxCartridges = Math.floor(rawCartridges * 10) / 10;

  // Em pediatria, Articaína 4% é contraindicada para crianças muito pequenas (< 15-16 kg ou < 4 anos)
  const isWeightRestricted = anesthetic.id.includes('articaina') && weightKg < 15;
  let warning: string | undefined;

  if (isWeightRestricted) {
    warning = 'Contraindicado pela FDA/AAPD para crianças menores de 4 anos (~15 kg)!';
  } else if (anesthetic.warningNotice) {
    warning = anesthetic.warningNotice;
  }

  return {
    anesthetic,
    weightKg,
    maxDoseTotalMg: Math.round(maxDoseTotalMg * 10) / 10,
    maxCartridges,
    maxCartridgesDisplay: `${maxCartridges.toFixed(1)} tubete${maxCartridges !== 1 ? 's' : ''}`,
    isAgeRestricted: isWeightRestricted,
    warning
  };
}

export function calculateProphylaxisDose(
  protocol: ProphylaxisProtocol,
  weightKg: number
): { mg: number; text: string; details: string } {
  const rawMg = weightKg * protocol.dosePerKg;
  const mg = Math.min(rawMg, protocol.maxDose);
  
  let text = `${mg} mg`;
  let details = '';

  if (protocol.medication.includes('Amoxicilina')) {
    // Geralmente suspensão 250mg/5ml (50mg/ml)
    const ml250 = Math.round((mg / 50) * 10) / 10;
    // Ou suspensão 500mg/5ml (100mg/ml)
    const ml500 = Math.round((mg / 100) * 10) / 10;
    text = `${mg} mg (${ml250} mL de susp. 250mg/5mL)`;
    details = `Ou ${ml500} mL se usada apresentação concentrada de 500mg/5mL. Administrar 30 a 60 min antes.`;
  } else if (protocol.medication.includes('Azitromicina')) {
    // Suspensão 200mg/5ml (40mg/ml)
    const ml = Math.round((mg / 40) * 10) / 10;
    text = `${mg} mg (${ml} mL de susp. 200mg/5mL)`;
    details = `Dose única 30 a 60 min antes do procedimento.`;
  } else if (protocol.medication.includes('Clindamicina')) {
    // Solução 75mg/5ml (15mg/ml)
    const ml = Math.round((mg / 15) * 10) / 10;
    text = `${mg} mg (${ml} mL de solução 75mg/5mL)`;
    details = `Dose única 30 a 60 min antes.`;
  }

  return { mg, text, details };
}
