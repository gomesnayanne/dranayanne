import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  BookOpen, 
  MessageCircle, 
  ShieldCheck, 
  Baby, 
  User, 
  Sparkles,
  Scale
} from 'lucide-react';
import { CalculatorSection } from './CalculatorSection';
import { PrescriptionItem } from '../data/medications';

interface CalculatorPageProps {
  onBackToHome: () => void;
  onAddToPrescription: (item: PrescriptionItem) => void;
  onOpenGuidelines: () => void;
  onOpenPrescription: () => void;
  prescriptionCount: number;
  childWeightKg: number;
  setChildWeightKg: React.Dispatch<React.SetStateAction<number>>;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onBackToHome,
  onAddToPrescription,
  onOpenGuidelines,
  onOpenPrescription,
  prescriptionCount,
  childWeightKg,
  setChildWeightKg
}) => {
  // Ensure top of page is visible when mounted
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const whatsappUrl = `https://wa.me/5581998591848?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Estou utilizando sua calculadora clínica e gostaria de tirar uma dúvida.'
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans selection:bg-pink-300 selection:text-pink-950 pb-16">
      
      {/* ============================================================== */}
      {/* STICKY TOP APP BAR FOR THE CALCULATOR PAGE                     */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Back to Home Button */}
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer shadow-2xs border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Voltar ao Site</span>
          </button>

          {/* Center Brand / Doctor Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-center sm:text-left">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-rose-300 shadow-xs shrink-0 hidden xs:block">
              <img
                src="./assets/aistudio/Gemini_Generated_Image_vrczgqvrczgqvrcz_281ea0c9.jpeg"
                alt="Dra. Nayanne Gomes"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="font-extrabold text-slate-800 text-xs sm:text-base leading-tight">
                  Dra. Nayanne Gomes
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  CRO/PE 9949
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold hidden sm:block">
                Calculadora Clínica de Doses & Prescrição Pediátrica
              </p>
            </div>
          </div>

          {/* Quick Actions (Receituário & Guia) */}
          <div className="flex items-center gap-2">
            
            {/* Pocket Guidelines Modal Trigger */}
            <button
              type="button"
              onClick={onOpenGuidelines}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Guia Clínico</span>
            </button>

            {/* Prescription Button with Live Count Badge */}
            <button
              type="button"
              onClick={onOpenPrescription}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm border border-rose-200 transition-all shadow-2xs active:scale-95"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span className="hidden xs:inline">Receita</span>
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center">
                {prescriptionCount}
              </span>
            </button>

            {/* Direct WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#44D767] fill-emerald-500" />
              <span>Dúvidas</span>
            </a>

          </div>

        </div>
      </header>

      {/* ============================================================== */}
      {/* CALCULATOR PAGE HERO HEADER                                    */}
      {/* ============================================================== */}
      <section className="bg-white border-b border-slate-200/70 pt-8 pb-10 px-4 sm:px-6 relative overflow-hidden bg-teeth-pattern">
        
        {/* Soft background accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-800 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Ferramenta Clínica Oficial · Odontopediatria IMIP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Calculadora de Doses <span className="text-rose-500">Pediátricas</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Prescrição precisa calculada automaticamente pelo peso corporal da criança (mg/kg/dose), com conversão de gotas, suspensões orais e alertas de dose máxima de segurança.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Doses padronizadas (CFO/SPSP)
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <Baby className="w-3.5 h-3.5 text-sky-600" />
              Lactentes a Jovens (3kg a 60kg)
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <User className="w-3.5 h-3.5 text-purple-600" />
              Módulo Adulto incluído
            </span>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* THE MAIN CALCULATOR ENGINE                                     */}
      {/* ============================================================== */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-6">
        <CalculatorSection
          onAddToPrescription={onAddToPrescription}
          onOpenGuidelines={onOpenGuidelines}
          onOpenPrescription={onOpenPrescription}
          childWeightKg={childWeightKg}
          setChildWeightKg={setChildWeightKg}
          showHeader={false}
        />
      </main>

      {/* ============================================================== */}
      {/* PAGE BOTTOM NAVIGATION & MEDICAL DISCLAIMER                    */}
      {/* ============================================================== */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 text-center space-y-6">
        
        {/* Return Button */}
        <div>
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
            <span>Voltar para a Página Principal do Consultório</span>
          </button>
        </div>

        {/* Clinical Disclaimer */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-left sm:text-center text-xs text-amber-800 leading-relaxed max-w-2xl mx-auto">
          <p className="font-bold flex items-center justify-center gap-1.5 mb-1 text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Aviso de Uso Clínico e Responsabilidade Profissional
          </p>
          <p>
            Esta calculadora é uma ferramenta auxiliar para agilizar os cálculos posológicos de rotina em Odontopediatria. A decisão terapêutica final, conferência de doses, histórico de alergias e assinatura da receita são de responsabilidade exclusiva do cirurgião-dentista prescritor.
          </p>
        </div>

        <p className="text-xs text-slate-400 font-semibold">
          © {new Date().getFullYear()} Dra. Nayanne Gomes · Especialista em Odontopediatria IMIP · Recife, São Lourenço e Jaboatão dos Guararapes (PE)
        </p>

      </footer>

    </div>
  );
};
