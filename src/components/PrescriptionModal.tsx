import React, { useState } from 'react';
import { PrescriptionItem } from '../data/medications';
import { X, Trash2, Printer, Check, FileText, Send, Sparkles, HeartHandshake } from 'lucide-react';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: PrescriptionItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  patientWeightKg: number;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  patientWeightKg
}) => {
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [includeCareInstructions, setIncludeCareInstructions] = useState(true);

  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const generateWhatsappText = () => {
    let text = `🦷 *RECEITUÁRIO ODONTOPEDIÁTRICO - DR NAYANNE*\n`;
    text += `⚖️ *Peso da Criança:* ${patientWeightKg} kg\n`;
    text += `📆 *Data:* ${todayStr}\n\n`;
    text += `📋 *PRESCRIÇÃO MEDICAMENTOSA:*\n`;
    text += `------------------------------------\n`;

    items.forEach((item, index) => {
      text += `*${index + 1}. ${item.medicationName}*\n`;
      text += `   Apresentação: ${item.presentationName}\n`;
      text += `   👉 *Como administrar:* ${item.posologyText}\n\n`;
    });

    if (includeCareInstructions) {
      text += `------------------------------------\n`;
      text += `⚠️ *CUIDADOS IMPORTANTES PÓS-PROCEDIMENTO:*\n`;
      text += `• Cuidado com a anestesia: Não deixe a criança morder os lábios ou bochechas enquanto estiver dormente!\n`;
      text += `• Alimentação: Preferir alimentos frios, líquidos ou pastosos no dia de hoje (sorvete, iogurte, gelatina, sopinha morna).\n`;
      text += `• Não faça bochechos fortes hoje.\n`;
      text += `• Qualquer dúvida, entre em contato conosco!\n\n`;
    }

    text += `✨ _Dra. Nayanne · Cirurgiã-Dentista · Odontopediatria_`;
    return text;
  };

  const handleCopyWhatsapp = () => {
    const text = generateWhatsappText();
    navigator.clipboard.writeText(text);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/30 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="glass-card-elevated rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-white/90 overflow-hidden">
        
        {/* Modal Header Glass */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-100/90 via-rose-50/80 to-white/90 border-b border-white/60 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-none">
                Receituário Odontológico
              </h2>
              <span className="text-[11px] font-semibold text-pink-700">Dra. Nayanne · Odontopediatria</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs border border-white/80 transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Printable Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 print-area space-y-4">
          
          {/* Printable Header */}
          <div className="border-b border-pink-100 pb-3 text-center">
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight uppercase">
              Dra. Nayanne
            </h1>
            <p className="text-xs sm:text-sm font-bold text-pink-600 uppercase tracking-wider">
              Cirurgiã-Dentista · Odontopediatria Especializada
            </p>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Atendimento Odontológico Humanizado para Bebês, Crianças e Adolescentes
            </div>
          </div>

          {/* Patient Info Card */}
          <div className="glass-panel rounded-2xl p-3.5 text-xs font-semibold grid grid-cols-2 gap-3 border border-white/80">
            <div>
              <span className="text-[10px] font-black uppercase text-pink-600 block">Peso da Criança:</span>
              <strong className="text-base font-black text-slate-800 block">
                {patientWeightKg} kg
              </strong>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-pink-600 block">Data de Emissão:</span>
              <strong className="text-base font-black text-slate-800 block">
                {todayStr}
              </strong>
            </div>
          </div>

          {/* Prescription Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Medicamentos Prescritos ({items.length}):
              </span>
              {items.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-[11px] text-rose-500 hover:text-rose-700 hover:underline font-bold no-print"
                >
                  Limpar todos
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="glass-pill rounded-2xl p-6 text-center border border-dashed border-pink-200">
                <p className="text-xs sm:text-sm font-bold text-slate-700 mb-1">
                  Nenhum medicamento adicionado ainda.
                </p>
                <p className="text-[11px] text-slate-500">
                  Clique no botão <strong>"+ Adicionar na Receita"</strong> em qualquer medicação para gerar a prescrição.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl p-3.5 border border-white/90 relative shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-pink-100 text-pink-700 text-xs font-black rounded-lg w-5 h-5 flex items-center justify-center">
                            {index + 1}
                          </span>
                          <strong className="text-sm font-black text-slate-800">
                            {item.medicationName}
                          </strong>
                          <span className="text-xs font-medium text-slate-500">
                            — {item.presentationName}
                          </span>
                        </div>

                        <div className="mt-2 text-xs font-medium text-slate-700 bg-white/70 p-2.5 rounded-xl border border-white/80 leading-relaxed">
                          <strong className="text-slate-900">Uso Oral:</strong> {item.posologyText}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 no-print transition-colors"
                        title="Remover medicamento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Care Instructions Toggle & Box */}
          <div>
            <div className="flex items-center gap-2 mb-2 no-print">
              <input
                type="checkbox"
                id="care-toggle-glass"
                checked={includeCareInstructions}
                onChange={(e) => setIncludeCareInstructions(e.target.checked)}
                className="w-4 h-4 accent-pink-500 rounded cursor-pointer"
              />
              <label htmlFor="care-toggle-glass" className="text-xs font-bold text-slate-700 cursor-pointer">
                Incluir Cuidados e Recomendações Pós-Atendimento Pediátrico
              </label>
            </div>

            {includeCareInstructions && (
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-3.5 text-xs text-rose-900">
                <span className="font-black text-rose-800 uppercase block mb-1">
                  Cuidados Pós-Procedimento para os Pais:
                </span>
                <ul className="text-rose-900/90 space-y-1 list-disc pl-4 font-medium leading-relaxed">
                  <li>
                    <strong>Atenção com a boca dormente:</strong> Vigie a criança para não morder os lábios, língua ou bochechas enquanto a anestesia estiver ativa.
                  </li>
                  <li>
                    <strong>Alimentação no primeiro dia:</strong> Dê preferência a alimentos pastosos e frios (sorvete, caldos mornos, iogurtes). Evite alimentos quentes e duros.
                  </li>
                  <li>
                    <strong>Higiene bucal:</strong> Mantenha a limpeza cuidadosa dos dentinhos, evitando bochechos fortes hoje.
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Signature Line for Print */}
          <div className="hidden print:block mt-12 text-center">
            <div className="w-64 border-t border-slate-800 mx-auto mb-1"></div>
            <strong className="text-sm font-black block text-slate-900">Dra. Nayanne</strong>
            <span className="text-xs text-slate-600">Cirurgiã-Dentista · Odontopediatria</span>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-3.5 sm:p-4 bg-white/70 border-t border-white/60 flex flex-wrap items-center justify-between gap-2 no-print">
          <div className="text-xs font-bold text-slate-500">
            {items.length} item(ns) incluído(s)
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyWhatsapp}
              disabled={items.length === 0}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                copiedWhatsapp
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#25D366] hover:bg-[#20bd5a] text-white'
              }`}
            >
              {copiedWhatsapp ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copiado p/ WhatsApp!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Copiar para WhatsApp</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              disabled={items.length === 0}
              className="px-4 py-2 sm:px-4 sm:py-2.5 glass-button-primary hover:opacity-95 text-white rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
