import React, { useState, useMemo } from 'react';
import { 
  PEDIATRIC_CLASSES, 
  PEDIATRIC_DOSES, 
  ADULT_CLASSES, 
  ADULT_MEDICATIONS, 
  PediatricMedDose, 
  AdultMed 
} from '../data/simpleCalculatorData';
import { PrescriptionItem } from '../data/medications';
import { 
  Check, 
  FileText, 
  Share2, 
  Sparkles, 
  AlertCircle, 
  ShieldAlert, 
  Plus, 
  Minus, 
  Scale, 
  Clock, 
  Pill, 
  Search, 
  Baby, 
  User, 
  HelpCircle,
  Calculator as CalcIcon
} from 'lucide-react';

interface CalculatorSectionProps {
  onAddToPrescription: (item: PrescriptionItem) => void;
  onOpenGuidelines: () => void;
  onOpenPrescription: () => void;
  childWeightKg: number;
  setChildWeightKg: React.Dispatch<React.SetStateAction<number>>;
  showHeader?: boolean;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  onAddToPrescription,
  onOpenGuidelines,
  onOpenPrescription,
  childWeightKg,
  setChildWeightKg,
  showHeader = true
}) => {
  // Mode: 'odontopediatria' or 'adultos'
  const [activeMode, setActiveMode] = useState<'odontopediatria' | 'adultos'>('odontopediatria');

  // Odontopediatria state
  const [pedSearchQuery, setPedSearchQuery] = useState<string>('');
  const [selectedPedClass, setSelectedPedClass] = useState<string>('analgesicos');
  const [selectedPedMedId, setSelectedPedMedId] = useState<string>('dipirona-500');

  // Adultos state
  const [adultSearchQuery, setAdultSearchQuery] = useState<string>('');
  const [selectedAdultClass, setSelectedAdultClass] = useState<string>('antiinflamatorios');
  const [selectedAdultMedId, setSelectedAdultMedId] = useState<string>('diclofenaco-sodico');

  // Copy notification
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Quick weight presets
  const weightPresets = [5, 8, 10, 12, 15, 18, 20, 25, 30, 40];

  // Filtered Pediatric Meds
  const filteredPedMeds = useMemo(() => {
    return PEDIATRIC_DOSES.filter(m => {
      const matchClass = selectedPedClass === 'todos' || m.classType === selectedPedClass;
      const q = pedSearchQuery.toLowerCase().trim();
      const matchQuery = !q || m.name.toLowerCase().includes(q) || m.presentationTitle.toLowerCase().includes(q);
      return matchClass && matchQuery;
    });
  }, [selectedPedClass, pedSearchQuery]);

  // Selected Pediatric Med
  const activePedMed = useMemo(() => {
    const found = filteredPedMeds.find(m => m.id === selectedPedMedId);
    return found || filteredPedMeds[0] || PEDIATRIC_DOSES[0];
  }, [filteredPedMeds, selectedPedMedId]);

  // Calculated Pediatric Result
  const pedResult = activePedMed.calculateDose(childWeightKg);

  // Filtered Adult Meds
  const filteredAdultMeds = useMemo(() => {
    return ADULT_MEDICATIONS.filter(m => {
      const matchClass = selectedAdultClass === 'todos' || m.classType === selectedAdultClass;
      const q = adultSearchQuery.toLowerCase().trim();
      const matchQuery = !q || m.name.toLowerCase().includes(q) || m.commercialNames.toLowerCase().includes(q);
      return matchClass && matchQuery;
    });
  }, [selectedAdultClass, adultSearchQuery]);

  // Selected Adult Med
  const activeAdultMed = useMemo(() => {
    const found = filteredAdultMeds.find(m => m.id === selectedAdultMedId);
    return found || filteredAdultMeds[0] || ADULT_MEDICATIONS[0];
  }, [filteredAdultMeds, selectedAdultMedId]);

  // Handle Weight Adjustment
  const handleAdjustWeight = (delta: number) => {
    setChildWeightKg(prev => Math.max(3, Math.min(70, Math.round((prev + delta) * 10) / 10)));
  };

  const handleAddCurrentToPrescription = () => {
    const isPed = activeMode === 'odontopediatria';
    const newItem: PrescriptionItem = {
      id: `${isPed ? activePedMed.id : activeAdultMed.id}-${Date.now()}`,
      medicationName: isPed ? activePedMed.name : activeAdultMed.name,
      presentationName: isPed ? activePedMed.presentationTitle : activeAdultMed.commercialNames,
      posologyText: isPed ? `${pedResult.doseDisplay} — ${pedResult.posology}` : activeAdultMed.posology,
      calculatedValue: isPed ? pedResult.doseDisplay : 'Dose Adulto',
      notes: isPed ? pedResult.details : activeAdultMed.instructions,
      timestamp: Date.now()
    };

    onAddToPrescription(newItem);
  };

  const handleCopyQuickWhatsapp = () => {
    let text = '';
    if (activeMode === 'odontopediatria') {
      text = `🦷 *Dra. Nayanne Gomes · Odontopediatria IMIP*\n\n`;
      text += `⚖️ *Peso da criança:* ${childWeightKg} kg\n`;
      text += `💊 *Medicamento:* ${activePedMed.presentationTitle}\n`;
      text += `👉 *Dose Calculada:* ${pedResult.doseDisplay}\n`;
      text += `⏰ *Posologia:* ${pedResult.posology}\n\n`;
      text += `ℹ️ *Orientações:* ${pedResult.details}\n`;
    } else {
      text = `🦷 *Dra. Nayanne Gomes · Prescrição Odontológica*\n\n`;
      text += `💊 *Medicamento:* ${activeAdultMed.name}\n`;
      text += `🏷️ *Nomes Comerciais:* ${activeAdultMed.commercialNames}\n`;
      text += `⏰ *Posologia:* ${activeAdultMed.posology}\n\n`;
      text += `ℹ️ *Orientações:* ${activeAdultMed.instructions}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <section id="calculadora" className={showHeader ? "py-16 sm:py-20 bg-teeth-pattern bg-[#FAF8F5] scroll-mt-14 border-t border-slate-100" : "py-4 sm:py-6 bg-transparent"}>
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        
        {/* Section Heading only if showHeader */}
        {showHeader && (
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#2B78C8] rounded-full text-xs font-black uppercase tracking-wider shadow-xs border border-sky-100">
              <CalcIcon className="w-3.5 h-3.5" />
              <span>Ferramenta Clínica de Bolso</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Calculadora de Doses Clínicas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Calcule dosagens precisas por peso da criança em gotas ou mL, confira limites máximos e gere receitas em segundos.
            </p>
          </div>
        )}

        {/* Action Header for Tools (Guidelines & Recipe) */}
        <div className="flex items-center justify-between gap-3 mb-6 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white shadow-xs">
          <span className="text-xs font-bold text-slate-600">
            Dra. Nayanne Gomes · Protocolos Clínicos
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenGuidelines}
              className="px-3 py-1.5 bg-white hover:bg-rose-50 text-slate-700 text-xs font-bold rounded-xl border border-rose-100 shadow-xs flex items-center gap-1.5 transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Guia Clínico & SOS</span>
            </button>
            <button
              onClick={onOpenPrescription}
              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Receituário</span>
            </button>
          </div>
        </div>

        {/* 1. SELETOR DE PÚBLICO (Segmented Glass Switch) */}
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-1.5 mb-6 shadow-sm max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setActiveMode('odontopediatria')}
              className={`py-2.5 px-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeMode === 'odontopediatria'
                  ? 'glass-button-primary text-white shadow-md'
                  : 'text-slate-600 hover:text-pink-700 hover:bg-white/40'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>Odontopediatria</span>
            </button>

            <button
              onClick={() => setActiveMode('adultos')}
              className={`py-2.5 px-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeMode === 'adultos'
                  ? 'glass-button-primary text-white shadow-md'
                  : 'text-slate-600 hover:text-pink-700 hover:bg-white/40'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Adultos</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SEÇÃO ODONTOPEDIATRIA                                    */}
        {/* ======================================================== */}
        {activeMode === 'odontopediatria' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* ETAPA 1: CONTROLE DE PESO */}
            <div className="glass-card rounded-3xl p-4 sm:p-5 shadow-md relative">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-sm">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider block">
                      Passo 1
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-800 leading-none">
                      Qual é o peso da criança?
                    </h3>
                  </div>
                </div>

                {/* Display Numérico */}
                <div className="flex items-center gap-1.5 glass-input rounded-2xl px-2.5 py-1.5 shadow-xs border border-white/90">
                  <button
                    onClick={() => handleAdjustWeight(-1)}
                    className="w-7 h-7 bg-white/90 hover:bg-white text-slate-700 hover:text-pink-600 rounded-xl font-black text-sm flex items-center justify-center shadow-xs active:scale-95 transition-all"
                    title="-1 kg"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-baseline px-1">
                    <input
                      type="number"
                      min="3"
                      max="70"
                      step="0.5"
                      value={childWeightKg}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) setChildWeightKg(Math.max(1, Math.min(80, val)));
                      }}
                      className="w-14 text-center font-black text-xl text-pink-900 bg-transparent focus:outline-none"
                    />
                    <span className="text-xs font-black text-pink-600">kg</span>
                  </div>

                  <button
                    onClick={() => handleAdjustWeight(1)}
                    className="w-7 h-7 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-black text-sm flex items-center justify-center shadow-xs active:scale-95 transition-all"
                    title="+1 kg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider de toque */}
              <div className="pt-1 pb-2">
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="0.5"
                  value={childWeightKg}
                  onChange={(e) => setChildWeightKg(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500 shadow-inner"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1.5 px-0.5">
                  <span>3 kg</span>
                  <span>15 kg</span>
                  <span>30 kg</span>
                  <span>45 kg</span>
                  <span>60 kg</span>
                </div>
              </div>

              {/* Atalhos Rápidos de Peso (Presets com flex-wrap sem cortar) */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-pink-100/60">
                <span className="text-[10px] font-black uppercase text-slate-400 shrink-0 mr-0.5">
                  Atalhos:
                </span>
                {weightPresets.map((w) => {
                  const isCur = Math.abs(childWeightKg - w) < 0.2;
                  return (
                    <button
                      key={w}
                      onClick={() => setChildWeightKg(w)}
                      className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-black transition-all shrink-0 ${
                        isCur
                          ? 'glass-pill-active text-slate-900 shadow-xs scale-105'
                          : 'glass-pill text-slate-600 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      {w} kg
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ETAPA 2: ESCOLHA DO MEDICAMENTO */}
            <div className="glass-card rounded-3xl p-4 sm:p-5 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-400 text-white flex items-center justify-center shadow-sm shrink-0">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider block">
                      Passo 2
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-800 leading-none">
                      Escolha o medicamento
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-500 bg-white/70 px-2.5 py-0.5 rounded-full border border-white shrink-0 shadow-xs">
                  {filteredPedMeds.length} disponível(is)
                </span>
              </div>

              {/* Barra de Busca */}
              <div className="relative mb-3.5">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pedSearchQuery}
                  onChange={(e) => setPedSearchQuery(e.target.value)}
                  placeholder="Buscar: dipirona, paracetamol, amoxicilina..."
                  className="w-full glass-input rounded-2xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                />
                {pedSearchQuery && (
                  <button
                    onClick={() => setPedSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-slate-700 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Categorias (flex-wrap sem cortar) */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                {PEDIATRIC_CLASSES.map((cls) => {
                  const isSel = selectedPedClass === cls.id;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => {
                        setSelectedPedClass(cls.id);
                        const firstInClass = PEDIATRIC_DOSES.find(m => m.classType === cls.id);
                        if (firstInClass) setSelectedPedMedId(firstInClass.id);
                      }}
                      className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-black transition-all ${
                        isSel
                          ? 'glass-pill-active text-slate-900 shadow-xs scale-[1.02]'
                          : 'glass-pill text-slate-600 hover:bg-white/80'
                      }`}
                    >
                      {cls.label}
                    </button>
                  );
                })}
              </div>

              {/* Medicamentos Disponíveis (flex-wrap responsivo) */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {filteredPedMeds.map((med) => {
                  const isAct = activePedMed.id === med.id;
                  return (
                    <button
                      key={med.id}
                      onClick={() => setSelectedPedMedId(med.id)}
                      className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl text-xs font-bold transition-all active:scale-95 text-left ${
                        isAct
                          ? 'bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-950 font-black shadow-xs border border-amber-300'
                          : 'bg-white/70 hover:bg-white text-slate-700 border border-white/80 shadow-xs'
                      }`}
                    >
                      {med.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ETAPA 3: CARTÃO DE RESULTADO IMEDIATO */}
            <div className="glass-card-elevated rounded-3xl p-5 sm:p-7 shadow-xl border border-white/95">
              <div className="flex items-start justify-between gap-3 mb-4 border-b border-pink-100/60 pb-3.5">
                <div>
                  <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider block mb-0.5">
                    Dose Calculada em Tempo Real
                  </span>
                  <h4 className="text-base sm:text-xl font-black text-slate-800 leading-tight">
                    {activePedMed.presentationTitle}
                  </h4>
                </div>

                <div className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-200 px-3 py-1 rounded-full text-xs font-black shrink-0 shadow-xs">
                  {childWeightKg} kg
                </div>
              </div>

              {/* Destaque Glass da Dose */}
              <div className="glass-panel rounded-2xl p-4 sm:p-5 mb-4 shadow-sm border border-white/80">
                <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-1">
                  Quantidade recomendada por tomada:
                </div>

                <div className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight tabular-nums drop-shadow-xs">
                  {pedResult.doseDisplay}
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-200/50 flex items-center gap-2 text-xs sm:text-sm font-bold text-pink-900">
                  <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                  <span><strong>Posologia:</strong> {pedResult.posology}</span>
                </div>
              </div>

              {/* Alerta de Dose Máxima */}
              {pedResult.maxWarning && (
                <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-800 font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{pedResult.maxWarning}</span>
                </div>
              )}

              {/* Orientação Clínica */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 text-xs text-emerald-900 font-medium leading-relaxed mb-4">
                <strong className="block text-emerald-800 mb-0.5 font-bold">Orientações de Administração:</strong>
                {pedResult.details}
              </div>

              {/* Ações em 1 Toque */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={handleCopyQuickWhatsapp}
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Copiado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Copiar p/ WhatsApp dos Pais</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddCurrentToPrescription}
                  className="py-3 px-4 glass-button-primary hover:opacity-95 text-white rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>+ Incluir no Receituário</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* SEÇÃO ADULTOS                                            */}
        {/* ======================================================== */}
        {activeMode === 'adultos' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* ETAPA 1 ADULTOS */}
            <div className="glass-card rounded-3xl p-4 sm:p-5 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-400 to-pink-400 text-white flex items-center justify-center shadow-sm shrink-0">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider block">
                      Consulta Rápida
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-800 leading-none">
                      Medicamentos para Adultos
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-500 bg-white/70 px-2.5 py-0.5 rounded-full border border-white shrink-0 shadow-xs">
                  {filteredAdultMeds.length} disponível(is)
                </span>
              </div>

              {/* Barra de Busca Adultos */}
              <div className="relative mb-3.5">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={adultSearchQuery}
                  onChange={(e) => setAdultSearchQuery(e.target.value)}
                  placeholder="Buscar: diclofenaco, amoxicilina, nimesulida..."
                  className="w-full glass-input rounded-2xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                />
                {adultSearchQuery && (
                  <button
                    onClick={() => setAdultSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-slate-700 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Grid das Classes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {ADULT_CLASSES.map((cls) => {
                  const isSel = selectedAdultClass === cls.id;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => {
                        setSelectedAdultClass(cls.id);
                        const firstInClass = ADULT_MEDICATIONS.find(m => m.classType === cls.id);
                        if (firstInClass) setSelectedAdultMedId(firstInClass.id);
                      }}
                      className={`p-2.5 rounded-2xl font-bold text-xs transition-all text-center ${
                        isSel
                          ? 'glass-pill-active text-slate-900 font-black shadow-xs scale-102'
                          : 'glass-pill text-slate-700 hover:bg-white/80'
                      }`}
                    >
                      {cls.label}
                    </button>
                  );
                })}
              </div>

              {/* Pílulas de Medicamentos Adultos */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {filteredAdultMeds.map((med) => {
                  const isAct = activeAdultMed.id === med.id;
                  return (
                    <button
                      key={med.id}
                      onClick={() => setSelectedAdultMedId(med.id)}
                      className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl text-xs font-bold transition-all active:scale-95 text-left ${
                        isAct
                          ? 'bg-emerald-200/90 text-emerald-950 font-black shadow-xs border border-emerald-300'
                          : 'bg-white/70 hover:bg-white text-slate-700 border border-white/80 shadow-xs'
                      }`}
                    >
                      {med.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ETAPA 2 ADULTOS */}
            <div className="glass-card-elevated rounded-3xl p-5 sm:p-7 shadow-xl border border-white/95">
              <div className="border-b border-pink-100/60 pb-3 mb-4">
                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">
                  Protocolo Adulto
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-800">
                  {activeAdultMed.name}
                </h4>
              </div>

              {/* Nomes Comerciais */}
              <div className="mb-3.5">
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                  Nomes Comerciais de Referência:
                </span>
                <div className="glass-panel rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-800 border border-white/80">
                  {activeAdultMed.commercialNames}
                </div>
              </div>

              {/* Posologia Recomendada */}
              <div className="mb-3.5">
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                  Posologia Recomendada:
                </span>
                <div className="glass-panel rounded-2xl p-3.5 text-sm sm:text-base font-black text-slate-900 border border-white/90 shadow-xs">
                  {activeAdultMed.posology}
                </div>
              </div>

              {/* Orientações Clínicas */}
              <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-3.5 text-xs text-sky-900 font-medium leading-relaxed mb-4">
                <strong className="block text-sky-800 mb-0.5 font-bold">Orientações Clínicas Dra. Nayanne:</strong>
                {activeAdultMed.instructions}
              </div>

              {/* Botões de Ação */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={handleCopyQuickWhatsapp}
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Copiado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Copiar p/ WhatsApp</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddCurrentToPrescription}
                  className="py-3 px-4 glass-button-primary hover:opacity-95 text-white rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>+ Incluir no Receituário</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mt-6 border border-rose-100 flex items-start gap-3 text-xs text-slate-500">
          <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <p>
            <strong>Aviso Clínico:</strong> Esta calculadora é de suporte profissional para Cirurgiões-Dentistas e pais sob orientação. A posologia final deve sempre considerar a avaliação individual do paciente e eventuais alergias.
          </p>
        </div>

      </div>
    </section>
  );
};
