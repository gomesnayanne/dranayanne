import React, { useState } from 'react';
import { Medication, Presentation, PrescriptionItem } from '../data/medications';
import { calculateMedicationDose } from '../utils/calculator';
import { Plus, Check, Info, AlertTriangle, ChevronDown, ChevronUp, Clock, Sparkles } from 'lucide-react';

interface MedicationCardProps {
  medication: Medication;
  weightKg: number;
  onAddToPrescription: (item: PrescriptionItem) => void;
  isAlreadyInPrescription?: boolean;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  weightKg,
  onAddToPrescription,
  isAlreadyInPrescription = false
}) => {
  const [selectedPresIndex, setSelectedPresIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const selectedPresentation: Presentation = medication.presentations[selectedPresIndex] || medication.presentations[0];

  const calc = calculateMedicationDose(
    medication,
    selectedPresentation,
    weightKg
  );

  const handleAdd = () => {
    onAddToPrescription({
      id: `${medication.id}-${selectedPresentation.id}-${Date.now()}`,
      medicationName: medication.name,
      presentationName: selectedPresentation.name,
      posologyText: calc.posologyText,
      calculatedValue: calc.formattedResult,
      notes: selectedPresentation.bottleVolume,
      timestamp: Date.now()
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Color theme by category
  const categoryTheme = {
    analgesicos: {
      bgAccent: 'bg-[#FFE500]', // Yellow
      badgeBg: 'bg-[#FEF08A]',
      badgeText: 'text-[#854D0E]',
      border: 'border-[#18181B]',
      tag: 'Analgésico & Antitérmico'
    },
    antiinflamatorios: {
      bgAccent: 'bg-[#DDD6FE]', // Lilac/Purple
      badgeBg: 'bg-[#EDE9FE]',
      badgeText: 'text-[#5B21B6]',
      border: 'border-[#18181B]',
      tag: 'Anti-inflamatório / Corticoide'
    },
    antibioticos: {
      bgAccent: 'bg-[#67E8F9]', // Cyan/Teal
      badgeBg: 'bg-[#CFFAFE]',
      badgeText: 'text-[#155E75]',
      border: 'border-[#18181B]',
      tag: 'Antibiótico Odontopediátrico'
    },
    emergencia: {
      bgAccent: 'bg-[#FDA4AF]', // Rose
      badgeBg: 'bg-[#FFE4E6]',
      badgeText: 'text-[#9F1239]',
      border: 'border-[#18181B]',
      tag: 'Sedação / Emergência'
    }
  }[medication.category];

  return (
    <div className="bg-white border-3 border-[#18181B] rounded-2xl overflow-hidden shadow-[4px_4px_0px_#18181B] mb-4 transition-all">
      {/* Header Accent Bar */}
      <div className={`p-3.5 sm:p-4 ${categoryTheme.bgAccent} border-b-2.5 border-[#18181B] flex items-start justify-between gap-2`}>
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="bg-white text-[#18181B] border border-[#18181B] text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-[1px_1px_0px_#18181B]">
              {categoryTheme.tag}
            </span>
            {medication.commercialNames.length > 0 && (
              <span className="text-[11px] font-bold text-[#18181B]/80">
                ({medication.commercialNames.slice(0, 3).join(', ')})
              </span>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-black text-[#18181B] tracking-tight leading-tight">
            {medication.name}
          </h2>
          <p className="text-xs font-medium text-[#18181B]/85 mt-0.5">
            {medication.indication}
          </p>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-1.5 bg-white hover:bg-slate-100 border border-[#18181B] rounded-lg shadow-[1px_1px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0"
          title="Ver dicas clínicas e contraindicações"
        >
          {showDetails ? (
            <ChevronUp className="w-4 h-4 text-[#18181B]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#18181B]" />
          )}
        </button>
      </div>

      {/* Main Body */}
      <div className="p-3.5 sm:p-4">
        {/* Presentation Selector */}
        <div className="mb-3">
          <label className="block text-[11px] font-black text-[#18181B] uppercase tracking-wider mb-1.5">
            Apresentação Farmacêutica:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {medication.presentations.map((pres, idx) => (
              <button
                key={pres.id}
                type="button"
                onClick={() => setSelectedPresIndex(idx)}
                className={`p-2 rounded-xl text-left border-2 transition-all ${
                  selectedPresIndex === idx
                    ? 'bg-[#18181B] text-white border-[#18181B] shadow-[2px_2px_0px_#18181B]'
                    : 'bg-[#F8F5EE] text-[#18181B] border-[#18181B]/40 hover:border-[#18181B]'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{pres.name}</div>
                <div className="text-[10px] opacity-80 mt-0.5">{pres.posologyGuidance}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Result Hero Display */}
        <div className="bg-[#F8F5EE] border-2 border-[#18181B] rounded-xl p-3 sm:p-4 mb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold text-[#71717A] uppercase tracking-wider block">
                Dose Pediátrica Calculada:
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight tabular-nums">
                  {calc.formattedResult}
                </span>
                <span className="text-xs font-bold text-[#52525B]">por tomada</span>
              </div>
            </div>

            {/* Quick Add to Prescription Button */}
            <button
              onClick={handleAdd}
              disabled={justAdded}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm border-2 border-[#18181B] flex items-center gap-1.5 shadow-[2px_2px_0px_#18181B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ${
                justAdded
                  ? 'bg-[#A7F3D0] text-[#064E3B]'
                  : isAlreadyInPrescription
                  ? 'bg-[#FEF08A] hover:bg-[#FDE047] text-[#18181B]'
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
                  <span>Receitar</span>
                </>
              )}
            </button>
          </div>

          {/* Posology Detail & Frequency */}
          <div className="mt-2.5 pt-2.5 border-t border-[#18181B]/15 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5">
            <div className="flex items-center gap-1 text-[#18181B] font-bold">
              <Clock className="w-3.5 h-3.5 text-[#18181B]" />
              <span>{medication.frequencyText}</span>
            </div>
            <div className="text-[11px] text-[#52525B] font-semibold">
              Dose em mg: <strong className="text-[#18181B]">{calc.mgPerDose} mg</strong> por tomada
              {medication.doseCalculationType === 'per_day' && (
                <span> ({calc.mgPerDay} mg/dia)</span>
              )}
            </div>
          </div>
        </div>

        {/* Warning if capped or age restriction */}
        {calc.isCapped && (
          <div className="bg-[#FEF2F2] border-2 border-[#EF4444] rounded-xl p-2.5 mb-2.5 text-xs text-[#991B1B] font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#DC2626]" />
            <span>Dose limitada ao teto máximo de segurança pediátrica ({medication.maxSingleDoseMg} mg).</span>
          </div>
        )}

        {calc.alert && (
          <div className="bg-[#FFFBEB] border-2 border-[#F59E0B] rounded-xl p-2.5 mb-2.5 text-xs text-[#92400E] font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#D97706]" />
            <span>{calc.alert}</span>
          </div>
        )}

        {/* Parent-facing Prescription Preview */}
        <div className="bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg p-2 text-[11px] text-[#334155] leading-relaxed">
          <span className="font-bold text-[#0F172A] block mb-0.5">Orientações para os Pais:</span>
          {calc.posologyText}
        </div>

        {/* Collapsible Clinical Notes */}
        {showDetails && (
          <div className="mt-3 pt-3 border-t-2 border-dashed border-[#18181B]/20 animate-in fade-in">
            <div className="bg-[#FEFCE8] border border-[#FDE047] rounded-xl p-3 mb-2">
              <h4 className="text-xs font-black text-[#854D0E] uppercase mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Dicas Clínicas Dra. Nayanne:
              </h4>
              <ul className="text-xs text-[#713F12] space-y-1 list-disc pl-4 font-medium">
                {medication.clinicalTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            {medication.contraindications.length > 0 && (
              <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-3">
                <h4 className="text-xs font-black text-[#9F1239] uppercase mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Contraindicações & Cuidados:
                </h4>
                <ul className="text-xs text-[#881337] space-y-1 list-disc pl-4 font-medium">
                  {medication.contraindications.map((contra, idx) => (
                    <li key={idx}>{contra}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
