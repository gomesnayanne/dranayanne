import React from 'react';
import { Phone, MapPin, Instagram, ExternalLink, MessageCircle } from 'lucide-react';

interface FooterSectionProps {
  onOpenCalculator?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenCalculator }) => {
  const whatsappUrl = `https://wa.me/5581998591848?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Gostaria de agendar uma consulta odontopediátrica.'
  )}`;

  const locations = [
    { city: 'Recife - PE', detail: 'Consultório Odontopediátrico & Sedação Consciente' },
    { city: 'Jaboatão dos Guararapes - PE', detail: 'Atendimento Infantil, Bebês & Pacientes Especiais (PNE/TEA)' },
    { city: 'São Lourenço da Mata - PE', detail: 'Consultório Odontopediátrico Acolhedor & Sem Medo' }
  ];

  return (
    <footer id="contato" className="relative text-slate-850">
      
      {/* Scalloped Coral/Pink Cloud Waves Divider (Exact match to Reference Image 4) */}
      <div className="w-full overflow-hidden leading-none text-[#F48B8B] -mb-1">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-18 md:h-22 block preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M0,90 L0,50 Q40,15 90,45 Q150,10 210,50 Q270,15 330,45 Q400,10 470,50 Q540,15 610,48 Q680,10 750,45 Q820,15 890,52 Q960,10 1030,48 Q1100,15 1170,45 Q1240,10 1310,50 Q1380,15 1440,45 L1440,90 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Coral/Pink Footer Container from Reference Image 4 */}
      <div className="bg-[#F48B8B] pt-8 pb-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Contato Info */}
            <div className="md:col-span-6 space-y-4 text-slate-900">
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Contato & Atendimento
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm font-semibold">
                {/* Phone / WhatsApp */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/40 flex items-center justify-center text-slate-900 shrink-0 shadow-2xs">
                    <MessageCircle className="w-4 h-4 fill-slate-900 text-[#F48B8B]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider">WhatsApp</span>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-extrabold text-sm sm:text-base">
                      +55 (81) 99859-1848
                    </a>
                  </div>
                </div>

                {/* Locations list */}
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/40 flex items-center justify-center text-slate-900 shrink-0 mt-0.5 shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider">Locais de Atendimento</span>
                    <p className="font-extrabold text-slate-900 text-sm">
                      Recife · Jaboatão dos Guararapes · São Lourenço da Mata
                    </p>
                    <p className="text-[12px] text-slate-800 font-normal leading-relaxed pt-0.5">
                      Região Metropolitana do Recife (PE) · CRO/PE 18440 · Hora marcada
                    </p>
                  </div>
                </div>

                {/* Instagram Button */}
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/nayanne.gomess/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-slate-900 shadow-md hover:scale-105 transition-transform font-bold text-xs sm:text-sm"
                    aria-label="Instagram @nayanne.gomess"
                  >
                    <Instagram className="w-4 h-4 text-[#F48B8B] stroke-[2.5]" />
                    <span>@nayanne.gomess</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:scale-105 transition-transform font-bold text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Agendar pelo WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Attendance Cities Card */}
            <div className="md:col-span-6">
              <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-white overflow-hidden relative space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                      Cidades de Atendimento (PE)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Região Metropolitana do Recife (RMR)
                    </p>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <span>Consultar Horários</span>
                  </a>
                </div>

                {/* Cities Pills / Cards */}
                <div className="space-y-2.5">
                  {locations.map((loc, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-150 hover:bg-rose-50/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        📍
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-slate-800 text-sm block">
                          {loc.city}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {loc.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 bg-sky-50 text-sky-800 p-2.5 rounded-xl border border-sky-100 flex items-center gap-2">
                  <span>ℹ️</span>
                  <span>Agendamentos centralizados pelo WhatsApp oficial da Dra. Nayanne Gomes.</span>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Copyright & Calculator link */}
          <div className="pt-10 text-center text-xs text-slate-900/80 font-semibold border-t border-white/20 mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Dra. Nayanne Gomes · Cirurgiã-Dentista · CRO/PE 18440 · Especialização em Odontopediatria pelo IMIP</p>
            {onOpenCalculator && (
              <button
                type="button"
                onClick={onOpenCalculator}
                className="text-slate-900/90 hover:text-white underline font-bold transition-colors cursor-pointer"
              >
                Acessar Calculadora de Doses Pediátricas →
              </button>
            )}
          </div>
        </div>
      </div>

    </footer>
  );
};
