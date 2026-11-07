import React, { useState } from 'react';
import { PROPHYLAXIS_REGIMENS, ProphylaxisProtocol, PrescriptionItem } from '../data/medications';
import { calculateProphylaxisDose } from '../utils/calculator';
import { ShieldAlert, Heart, CheckCircle2, XCircle, Plus, Check, Clock } from 'lucide-react';

interface ProphylaxisGuideProps {
  weightKg: number;
  onAddToPrescription: (item: PrescriptionItem) => void;
}

export const ProphylaxisGuide: React.FC<ProphylaxisGuideProps> = ({
  weightKg,
  onAddToPrescription
}) => {
  const [selectedRegimenIndex, setSelectedRegimenIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const currentProtocol: ProphylaxisProtocol = PROPHYLAXIS_REGIMENS[selectedRegimenIndex];
  const calc = calculateProphylaxisDose(currentProtocol, weightKg);

  const handleAdd = () => {
    onAddToPrescription({
      id: `profilaxia-${selectedRegimenIndex}-${Date.now()}`,
      medicationName: `${currentProtocol.medication} (Profilaxia Antibiótica)`,
      presentationName: `${calc.text}`,
      posologyText: `Tomar ${calc.text} em dose única por via oral exatamente de 30 a 60 minutos antes do procedimento odontológico programado.`,
      calculatedValue: `${calc.mg} mg`,
      notes: currentProtocol.timing,
      timestamp: Date.now()
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="bg-white border-3 border-[#18181B] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#18181B] mb-5">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[#18181B]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#FDA4AF] border-2 border-[#18181B] flex items-center justify-center shadow-[2px_2px_0px_#18181B]">
            <Heart className="w-5 h-5 text-[#9F1239]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#18181B] uppercase tracking-tight">
              Profilaxia da Endocardite Infecciosa
            </h2>
            <p className="text-[11px] font-semibold text-[#52525B]">
              Diretrizes AHA (American Heart Association) & AAPD
            </p>
          </div>
        </div>
        <span className="bg-[#FFE500] border border-[#18181B] px-2 py-0.5 rounded-lg text-[10px] font-black uppercase shadow-[1px_1px_0px_#18181B]">
          Dose Única
        </span>
      </div>

      {/* Protocol Selection Tabs */}
      <div className="mb-4">
        <label className="block text-xs font-black text-[#18181B] uppercase tracking-wider mb-2">
          Selecione a Condição do Paciente:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PROPHYLAXIS_REGIMENS.map((regimen, idx) => (
            <button
              key={regimen.situation}
              type="button"
              onClick={() => setSelectedRegimenIndex(idx)}
              className={`p-2.5 rounded-xl text-left border-2 transition-all ${
                selectedRegimenIndex === idx
                  ? 'bg-[#18181B] text-white border-[#18181B] shadow-[2px_2px_0px_#FFE500]'
                  : 'bg-[#F8F5EE] text-[#18181B] border-[#18181B]/40 hover:border-[#18181B]'
              }`}
            >
              <div className="font-extrabold text-xs">{regimen.medication}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{regimen.situation}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Dose Highlight */}
      <div className="bg-[#FFFBEB] border-2.5 border-[#18181B] rounded-2xl p-4 mb-4 shadow-[3px_3px_0px_#18181B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-black uppercase text-[#71717A] block">
              Dose Calculada para {weightKg} kg (Dose Única Pré-Procedimento):
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight mt-0.5">
              {calc.text}
            </div>
            <div className="text-xs font-bold text-[#18181B] flex items-center gap-1 mt-1">
              <Clock className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{currentProtocol.timing}</span>
            </div>
            {calc.details && (
              <p className="text-[11px] text-[#52525B] mt-1 font-medium">{calc.details}</p>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={justAdded}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm border-2 border-[#18181B] flex items-center gap-1.5 shadow-[2px_2px_0px_#18181B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all shrink-0 ${
              justAdded
                ? 'bg-[#A7F3D0] text-[#064E3B]'
                : 'bg-[#FFE500] hover:bg-[#FACC15] text-[#18181B]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Adicionar à Receita</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-3 pt-2 border-t border-[#18181B]/15 text-[11px] text-[#71717A] flex items-center justify-between">
          <span>Regra pediátrica: {currentProtocol.regimenChildren}</span>
          <span>Dose teto máxima: {currentProtocol.maxDose} mg</span>
        </div>
      </div>

      {/* Two Column Checklists: Who Needs & Which Procedures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Conditions */}
        <div className="bg-[#F8F5EE] border-2 border-[#18181B] rounded-xl p-3">
          <h3 className="font-black text-[#18181B] uppercase mb-2 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#E11D48]" />
            Cardiopatias com Indicação Formal:
          </h3>
          <ul className="space-y-1.5 text-[#334155] font-medium">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
              <span>Prótese valvar cardíaca mecânica ou biológica</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
              <span>Histórico prévio de Endocardite Infecciosa</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
              <span>Cardiopatia congênita cianótica não reparada ou com shunt residual</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
              <span>Cardiopatia congênita reparada com material protético nos primeiros 6 meses</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
              <span>Transplante cardíaco com desenvolvimento de valvopatia</span>
            </li>
          </ul>
        </div>

        {/* Procedures */}
        <div className="bg-[#F8F5EE] border-2 border-[#18181B] rounded-xl p-3">
          <h3 className="font-black text-[#18181B] uppercase mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#D97706]" />
            Procedimentos Odontológicos:
          </h3>
          <div className="space-y-2">
            <div>
              <span className="text-[10px] font-black uppercase text-[#065F46] block mb-1">
                ✓ REQUEREM Profilaxia (Manipulação de mucosa/gengiva/ápice):
              </span>
              <p className="text-[11px] text-[#334155] leading-relaxed">
                Exodontias, procedimentos periodontais cirúrgicos/raspagem, drenagem de abcesso, instrumentação endodôntica além do ápice, biópsias, instalação inicial de bandas ortodônticas.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-300">
              <span className="text-[10px] font-black uppercase text-[#991B1B] block mb-1">
                ✕ NÃO Requerem Profilaxia:
              </span>
              <p className="text-[11px] text-[#334155] leading-relaxed">
                Restaurações simples sem invasão gengival, anestesia infiltrativa local em tecido não inflamado, radiografias odontológicas, moldagens, colocação ou ajuste de aparelhos removíveis, esfoliação natural de dentes de leite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
