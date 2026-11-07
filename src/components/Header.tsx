import React from 'react';
import { FileText, Sparkles, HelpCircle } from 'lucide-react';

interface HeaderProps {
  prescriptionCount: number;
  onOpenPrescription: () => void;
  onOpenGuidelines: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  prescriptionCount,
  onOpenPrescription,
  onOpenGuidelines
}) => {
  return (
    <header className="w-full sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 transition-all">
      <div className="max-w-4xl mx-auto glass-panel rounded-2xl sm:rounded-3xl px-4 py-2.5 flex items-center justify-between gap-3 border border-white/70 shadow-[0_8px_30px_rgb(244,114,182,0.12)]">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-tr from-pink-200 via-rose-100 to-white rounded-2xl flex items-center justify-center shadow-md border border-white/90 shrink-0">
            <span className="text-xl sm:text-2xl drop-shadow-xs" role="img" aria-label="dente">
              🦷
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-800 uppercase leading-none">
                DR Nayanne
              </h1>
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs">
                Odontopediatria
              </span>
            </div>
            <p className="text-[11px] font-medium text-pink-900/80 mt-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-500" />
              Calculadora Pediátrica de Doses & Anestésicos
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenGuidelines}
            className="p-2 sm:px-3 sm:py-2 bg-white/70 hover:bg-white/90 border border-white/80 rounded-xl font-bold text-xs text-slate-700 flex items-center gap-1.5 shadow-xs hover:shadow-sm active:scale-95 transition-all"
            title="Diretrizes Clínicas"
          >
            <HelpCircle className="w-4 h-4 text-pink-500" />
            <span className="hidden sm:inline">Guia Clínico</span>
          </button>

          <button
            onClick={onOpenPrescription}
            className="relative px-3.5 py-2 glass-button-primary hover:opacity-95 text-white rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Receita</span>
            {prescriptionCount > 0 && (
              <span className="bg-white text-rose-600 text-[11px] font-black rounded-full w-5 h-5 flex items-center justify-center -ml-0.5 shadow-sm">
                {prescriptionCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
