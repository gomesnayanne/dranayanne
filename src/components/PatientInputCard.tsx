import React from 'react';
import { Scale, Sparkles, Plus, Minus } from 'lucide-react';

interface PatientInputCardProps {
  weightKg: number;
  setWeightKg: (w: number) => void;
}

export const PatientInputCard: React.FC<PatientInputCardProps> = ({
  weightKg,
  setWeightKg
}) => {
  const handleAdjustWeight = (delta: number) => {
    const newWeight = Math.max(3, Math.min(70, Math.round((weightKg + delta) * 10) / 10));
    setWeightKg(newWeight);
  };

  const commonWeights = [
    { label: '5 kg', val: 5 },
    { label: '8 kg', val: 8 },
    { label: '10 kg', val: 10 },
    { label: '12 kg', val: 12 },
    { label: '15 kg', val: 15 },
    { label: '18 kg', val: 18 },
    { label: '20 kg', val: 20 },
    { label: '25 kg', val: 25 },
    { label: '30 kg', val: 30 },
    { label: '35 kg', val: 35 },
    { label: '40 kg', val: 40 }
  ];

  return (
    <div className="bg-white border-3 border-[#18181B] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#18181B] mb-5">
      {/* Weight Hero Section */}
      <div className="bg-[#FFFBEB] border-2.5 border-[#18181B] rounded-xl p-3.5 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFE500] border-2 border-[#18181B] flex items-center justify-center font-bold shadow-[2px_2px_0px_#18181B] shrink-0">
              <Scale className="w-5 h-5 text-[#18181B]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#18181B] block">
                Peso Corporal do Paciente
              </span>
              <p className="text-[11px] text-[#52525B] font-medium leading-tight">
                Insira o peso para calcular doses e tubetes automaticamente
              </p>
            </div>
          </div>

          {/* Direct Input & Big Display */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="relative inline-flex items-center bg-[#18181B] text-[#FFE500] px-3.5 py-1.5 rounded-xl border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
              <input
                type="number"
                min="3"
                max="70"
                step="0.5"
                value={weightKg}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) setWeightKg(Math.max(1, Math.min(80, val)));
                }}
                className="w-20 bg-transparent text-2xl sm:text-3xl font-black tracking-tight tabular-nums text-center text-[#FFE500] focus:outline-none"
              />
              <span className="text-xs font-black uppercase text-white ml-0.5">kg</span>
            </div>
          </div>
        </div>

        {/* Tactile Range Slider */}
        <div className="py-2">
          <input
            type="range"
            min="3"
            max="60"
            step="0.5"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value))}
            className="w-full h-3.5 bg-[#E4E4E7] rounded-lg appearance-none cursor-pointer accent-[#18181B] border-2 border-[#18181B]"
          />
          <div className="flex justify-between text-[10px] font-extrabold text-[#71717A] px-1 mt-1.5">
            <span>Bebê (3 kg)</span>
            <span>15 kg</span>
            <span>30 kg</span>
            <span>45 kg</span>
            <span>60 kg</span>
          </div>
        </div>

        {/* Stepper Increment/Decrement Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-3 border-t-2 border-[#18181B]/15">
          <span className="text-[11px] font-black text-[#18181B] uppercase">Ajuste fino:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => handleAdjustWeight(-5)}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border-2 border-[#18181B] rounded-lg text-xs font-black shadow-[1.5px_1.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
            >
              -5kg
            </button>
            <button
              onClick={() => handleAdjustWeight(-1)}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border-2 border-[#18181B] rounded-lg text-xs font-black shadow-[1.5px_1.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
            >
              -1kg
            </button>
            <button
              onClick={() => handleAdjustWeight(-0.5)}
              className="px-2 py-1.5 bg-white hover:bg-slate-100 border-2 border-[#18181B] rounded-lg text-xs font-black shadow-[1.5px_1.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
            >
              -0.5
            </button>
            <button
              onClick={() => handleAdjustWeight(0.5)}
              className="px-2 py-1.5 bg-[#A7F3D0] hover:bg-[#6EE7B7] border-2 border-[#18181B] rounded-lg text-xs font-black shadow-[1.5px_1.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
            >
              +0.5
            </button>
            <button
              onClick={() => handleAdjustWeight(1)}
              className="px-2.5 py-1.5 bg-[#A7F3D0] hover:bg-[#6EE7B7] border-2 border-[#18181B] rounded-lg text-xs font-black shadow-[1.5px_1.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
            >
              +1kg
            </button>
            <button
              onClick={() => handleAdjustWeight(5)}
              className="px-2.5 py-1.5 bg-[#A7F3D0] hover:bg-[#6EE7B7] border-2 border-[#18181B] rounded-lg text-xs font-black shadow-[1.5px_1.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
            >
              +5kg
            </button>
          </div>
        </div>
      </div>

      {/* Quick Select Weight Pills */}
      <div className="mt-3">
        <span className="text-[10px] font-black uppercase text-[#71717A] block mb-1.5">
          Pesos Frequentes em Odontopediatria:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {commonWeights.map((w) => {
            const isSelected = Math.abs(weightKg - w.val) < 0.3;
            return (
              <button
                key={w.label}
                onClick={() => setWeightKg(w.val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all whitespace-nowrap active:scale-95 shrink-0 ${
                  isSelected
                    ? 'bg-[#18181B] text-white border-[#18181B] shadow-[2px_2px_0px_#FFE500]'
                    : 'bg-[#F4F4F5] hover:bg-[#FFE500] text-[#18181B] border-[#18181B]/50'
                }`}
              >
                {w.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
