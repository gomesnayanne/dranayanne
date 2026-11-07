import React from 'react';
import { X, BookOpen, AlertCircle, Award, ShieldCheck } from 'lucide-react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/30 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="glass-card-elevated rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-white/90 overflow-hidden">
        
        {/* Header Glass */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-100/90 via-rose-50/80 to-white/90 border-b border-white/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-none">
                Diretrizes & Referências Clínicas
              </h2>
              <span className="text-[11px] font-semibold text-pink-700">Evidências em Odontopediatria</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs border border-white/80 transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Glass */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 shadow-xs">
            <h3 className="font-black text-sm uppercase text-amber-800 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Critérios Adotados pela Dra. Nayanne
            </h3>
            <p className="text-xs text-amber-900/90 leading-relaxed font-medium">
              Esta calculadora foi estruturada com base nas mais recentes evidências científicas da <strong>AAPD (American Academy of Pediatric Dentistry)</strong>, <strong>Sociedade Brasileira de Pediatria (SBP)</strong> e os tratados clássicos de Anestesiologia de <strong>Stanley F. Malamed</strong>.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-1.5 border border-white/80">
            <h4 className="font-extrabold uppercase text-xs text-pink-600 tracking-wider">
              1. Por que calcular por Peso (mg/kg) e não apenas por idade?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Crianças da mesma idade cronológica podem apresentar variações ponderais de mais de 100%. A farmacocinética (volume de distribuição, depuração hepática e filtração glomerular) em pediatria é diretamente proporcional à massa corporal magra. Portanto, o cálculo por <strong>mg/kg/dose</strong> ou <strong>mg/kg/dia</strong> é a única conduta segura contra subdosagem ineficaz ou superdosagem tóxica.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-1.5 border border-white/80">
            <h4 className="font-extrabold uppercase text-xs text-pink-600 tracking-wider">
              2. Regra de Ouro dos Anestésicos Locais (Malamed)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A toxicidade por anestésico local é uma das emergências mais graves em odontopediatria. Nunca ultrapasse a dose máxima permitida para o peso da criança calculada nesta aplicação. Sempre aspire antes de injetar e infiltre lentamente (mínimo de 1 minuto por tubete de 1.8 mL).
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-1.5 border border-white/80">
            <h4 className="font-extrabold uppercase text-xs text-pink-600 tracking-wider">
              3. Princípio do Uso Racional de Antibióticos
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dores dentárias por pulpite, pericoronarite inicial ou abcessos circunscritos sem febre e sem envolvimento fascial <strong>NÃO</strong> devem ser tratados com antibióticos sistêmicos. O tratamento curativo é a remoção da causa local (pulpotomia, pulpectomia, drenagem ou exodontia).
            </p>
          </div>

          <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-800 font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <strong>Aviso Legal & Ético:</strong> Este aplicativo destina-se ao suporte de decisão clínica e agilidade operacional para cirurgiões-dentistas. A avaliação física do paciente e a decisão posológica final cabem exclusivamente ao profissional responsável.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-white/70 border-t border-white/60 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 glass-button-primary hover:opacity-95 text-white rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-all"
          >
            Entendido, fechar
          </button>
        </div>

      </div>
    </div>
  );
};
