import React, { useState } from 'react';
import { ANESTHETICS_LIST, AnestheticLocal } from '../data/medications';
import { calculateAnestheticDose } from '../utils/calculator';
import { Syringe, AlertTriangle, ShieldCheck, Plus, Minus, Info, AlertOctagon } from 'lucide-react';

interface AnestheticCalculatorProps {
  weightKg: number;
}

export const AnestheticCalculator: React.FC<AnestheticCalculatorProps> = ({
  weightKg
}) => {
  const [selectedAnestheticId, setSelectedAnestheticId] = useState<string>(ANESTHETICS_LIST[0].id);
  const [cartridgesUsed, setCartridgesUsed] = useState<number>(0.5);

  const currentAnesthetic = ANESTHETICS_LIST.find((a) => a.id === selectedAnestheticId) || ANESTHETICS_LIST[0];
  const calc = calculateAnestheticDose(currentAnesthetic, weightKg);

  // Calculate percentage used
  const percentageUsed = Math.min(150, Math.round((cartridgesUsed / calc.maxCartridges) * 100));

  const getSafetyStatus = () => {
    if (percentageUsed <= 50) {
      return {
        label: 'Zona Segura',
        color: 'bg-[#A7F3D0] text-[#064E3B] border-[#059669]',
        barColor: 'bg-[#10B981]',
        icon: ShieldCheck
      };
    } else if (percentageUsed <= 80) {
      return {
        label: 'Atenção (Margem Moderada)',
        color: 'bg-[#FEF08A] text-[#854D0E] border-[#D97706]',
        barColor: 'bg-[#F59E0B]',
        icon: AlertTriangle
      };
    } else if (percentageUsed <= 100) {
      return {
        label: 'Alerta: Próximo à Dose Máxima',
        color: 'bg-[#FED7AA] text-[#9A3412] border-[#EA580C]',
        barColor: 'bg-[#EA580C]',
        icon: AlertTriangle
      };
    } else {
      return {
        label: 'PERIGO: Ultrapassou a Dose Máxima!',
        color: 'bg-[#FECDD3] text-[#9F1239] border-[#E11D48]',
        barColor: 'bg-[#E11D48]',
        icon: AlertOctagon
      };
    }
  };

  const status = getSafetyStatus();
  const StatusIcon = status.icon;

  const handleAdjustCartridges = (delta: number) => {
    const nextVal = Math.max(0, Math.round((cartridgesUsed + delta) * 10) / 10);
    setCartridgesUsed(nextVal);
  };

  return (
    <div className="bg-white border-3 border-[#18181B] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#18181B] mb-5">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[#18181B]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#67E8F9] border-2 border-[#18181B] flex items-center justify-center shadow-[2px_2px_0px_#18181B]">
            <Syringe className="w-5 h-5 text-[#18181B]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#18181B] uppercase tracking-tight">
              Anestésicos Locais · Cálculo de Tubetes
            </h2>
            <p className="text-[11px] font-semibold text-[#52525B]">
              Diretrizes de Segurança Pediátrica (Malamed / AAPD)
            </p>
          </div>
        </div>
        <span className="bg-[#FFE500] border border-[#18181B] px-2 py-0.5 rounded-lg text-[10px] font-black uppercase shadow-[1px_1px_0px_#18181B]">
          Tubete 1.8 mL
        </span>
      </div>

      {/* Anesthetic Selector Dropdown/Cards */}
      <div className="mb-4">
        <label className="block text-xs font-black text-[#18181B] uppercase tracking-wider mb-2">
          Selecione a Solução Anestésica:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ANESTHETICS_LIST.map((anes) => {
            const isSelected = anes.id === selectedAnestheticId;
            return (
              <button
                key={anes.id}
                type="button"
                onClick={() => setSelectedAnestheticId(anes.id)}
                className={`p-3 rounded-xl text-left border-2 transition-all relative ${
                  isSelected
                    ? 'bg-[#18181B] text-white border-[#18181B] shadow-[3px_3px_0px_#FFE500]'
                    : 'bg-[#F8F5EE] hover:bg-[#F4F4F5] text-[#18181B] border-[#18181B]/50'
                }`}
              >
                <div className="font-extrabold text-xs leading-snug">{anes.name}</div>
                <div className="text-[10px] opacity-80 mt-0.5">
                  {anes.mgPerCartridge} mg por tubete · Máx {anes.maxDoseMgPerKgMalamed} mg/kg
                </div>
                {anes.minAgeYears > 0 && (
                  <span
                    className={`inline-block text-[9px] font-black uppercase mt-1 px-1.5 py-0.2 rounded border ${
                      isSelected
                        ? 'bg-[#FFE500] text-black border-black'
                        : 'bg-white text-black border-[#18181B]'
                    }`}
                  >
                    Idade ≥ {anes.minAgeYears} anos
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Age Warning Banner if needed */}
      {calc.isAgeRestricted && (
        <div className="bg-[#FEF2F2] border-2 border-[#EF4444] rounded-xl p-3 mb-4 text-xs font-bold text-[#991B1B] flex items-start gap-2 shadow-[2px_2px_0px_#EF4444]">
          <AlertOctagon className="w-5 h-5 shrink-0 text-[#DC2626]" />
          <div>
            <strong>ALERTA CRÍTICO:</strong> A Articaína 4% não é recomendada para crianças menores de 4 anos de idade devido à escassez de dados clínicos de segurança pediátrica nessa faixa etária. Opte por Lidocaína 2% com vasoconstritor.
          </div>
        </div>
      )}

      {/* Safety Cap Box */}
      <div className="bg-[#FFFBEB] border-2.5 border-[#18181B] rounded-2xl p-4 mb-4 shadow-[3px_3px_0px_#18181B]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          {/* Max Cartridges */}
          <div className="sm:col-span-1 text-center sm:text-left bg-white border-2 border-[#18181B] rounded-xl p-3 shadow-[2px_2px_0px_#18181B]">
            <span className="text-[10px] font-black uppercase text-[#71717A] block">
              Máximo Seguro para {weightKg} kg:
            </span>
            <div className="text-3xl font-black text-[#18181B] mt-0.5 tabular-nums">
              {calc.maxCartridges} <span className="text-xs font-bold text-[#52525B]">tubetes</span>
            </div>
            <p className="text-[10px] font-bold text-[#16A34A] mt-0.5">
              (Arredondado p/ margem de segurança)
            </p>
          </div>

          {/* mg calculation details */}
          <div className="sm:col-span-2 space-y-1.5 text-xs text-[#18181B] bg-white border border-[#18181B] rounded-xl p-3">
            <div className="flex justify-between">
              <span className="font-bold text-[#52525B]">Dose máx. permitida:</span>
              <strong className="font-extrabold">{calc.maxDoseTotalMg} mg</strong>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#52525B]">Fórmula de Malamed:</span>
              <span>{weightKg} kg × {currentAnesthetic.maxDoseMgPerKgMalamed} mg/kg</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#52525B]">Sal por tubete (1.8mL):</span>
              <span>{currentAnesthetic.mgPerCartridge} mg</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span className="font-bold text-[#52525B]">Teto máximo absoluto:</span>
              <span>{currentAnesthetic.absoluteMaxDoseMg} mg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Session Infiltration Tracker */}
      <div className="bg-[#F8F5EE] border-2 border-[#18181B] rounded-xl p-3.5 sm:p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-black uppercase text-[#18181B] block">
              Simulador / Monitor de Tubetes da Sessão:
            </span>
            <p className="text-[11px] text-[#52525B]">
              Registre a quantidade aplicada durante o procedimento:
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => handleAdjustCartridges(-0.5)}
              className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 border border-[#18181B] font-bold flex items-center justify-center shadow-[1px_1px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
              title="-0.5 tubete"
            >
              <Minus className="w-3.5 h-3.5 text-[#18181B]" />
            </button>
            <div className="px-3 py-1 bg-white border border-[#18181B] rounded-lg font-black text-sm tabular-nums shadow-[1px_1px_0px_#18181B] min-w-[70px] text-center">
              {cartridgesUsed} tub.
            </div>
            <button
              onClick={() => handleAdjustCartridges(0.5)}
              className="w-8 h-8 rounded-lg bg-[#FFE500] hover:bg-[#FACC15] border border-[#18181B] font-bold flex items-center justify-center shadow-[1px_1px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
              title="+0.5 tubete"
            >
              <Plus className="w-3.5 h-3.5 text-[#18181B]" />
            </button>
            <button
              onClick={() => setCartridgesUsed(0)}
              className="text-[10px] text-[#71717A] hover:text-[#18181B] font-bold px-1.5 py-1 underline ml-1"
            >
              Zerar
            </button>
          </div>
        </div>

        {/* Safety Gauge Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center text-xs font-black mb-1">
            <span className="flex items-center gap-1">
              <StatusIcon className="w-3.5 h-3.5" />
              {status.label}
            </span>
            <span className="tabular-nums">{percentageUsed}% da dose máx.</span>
          </div>

          <div className="w-full h-4 bg-white border-2 border-[#18181B] rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${status.barColor}`}
              style={{ width: `${Math.min(100, percentageUsed)}%` }}
            />
          </div>
        </div>

        {/* Breakdown of Injected Content */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#18181B] mt-2">
          <div className="bg-white p-2 rounded-lg border border-[#18181B]/30">
            <span className="text-[#52525B] font-medium block">Sal Infiltrado:</span>
            <strong className="text-xs">
              {(cartridgesUsed * currentAnesthetic.mgPerCartridge).toFixed(1)} mg
            </strong>{' '}
            / {calc.maxDoseTotalMg} mg
          </div>
          <div className="bg-white p-2 rounded-lg border border-[#18181B]/30">
            <span className="text-[#52525B] font-medium block">Tubetes Restantes:</span>
            <strong className={`text-xs ${calc.maxCartridges - cartridgesUsed < 0 ? 'text-red-600 font-black' : ''}`}>
              {(calc.maxCartridges - cartridgesUsed).toFixed(1)} tubete(s)
            </strong>
          </div>
        </div>
      </div>

      {/* Clinical Pearls Dra. Nayanne */}
      <div className="bg-[#F0FDF4] border-2 border-[#18181B] rounded-xl p-3 text-xs">
        <h4 className="font-black text-[#166534] uppercase mb-1 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#166534]" />
          Recomendações Práticas Dra. Nayanne:
        </h4>
        <ul className="text-[#14532D] space-y-1 list-disc pl-4 font-medium leading-relaxed">
          <li>
            <strong>Infiltração Lenta:</strong> Injete 1 tubete em no mínimo 60 segundos. Injeção rápida aumenta drasticamente o risco de convulsão e toxicidade do SNC.
          </li>
          <li>
            <strong>Agulha Curta ou Extracurta (30G):</strong> Recomendada para crianças para evitar penetrações ósseas acidentais profundas.
          </li>
          <li>
            <strong>Prevenção de Automutilação:</strong> Oriente os pais insistentemente para vigiar a criança não morder os lábios, bochecha ou língua enquanto durar o efeito anestésico (rolinho de algodão entre dentes e bochecha pode ajudar no trajeto de volta para casa).
          </li>
        </ul>
      </div>
    </div>
  );
};
