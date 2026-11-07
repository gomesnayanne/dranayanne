import React from 'react';
import { MessageCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/5581998591848?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Gostaria de agendar uma consulta odontopediátrica para meu filho(a).'
  )}`;

  return (
    <section id="sobre" className="py-16 sm:py-20 bg-teeth-pattern bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Photo + Cute Colorful Hand Icon with Smile */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              
              {/* Cute Colorful Hand with Smiley Face (exact element from reference Image 3) */}
              <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-white rounded-2xl p-1.5 shadow-md border border-slate-100 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-9 h-9">
                  {/* Colorful hand icon with smile */}
                  <rect x="6" y="10" width="4" height="12" rx="2" fill="#F43F5E" />
                  <rect x="12" y="6" width="4" height="16" rx="2" fill="#FBBF24" />
                  <rect x="18" y="4" width="4" height="18" rx="2" fill="#38BDF8" />
                  <rect x="24" y="8" width="4" height="14" rx="2" fill="#A855F7" />
                  <path d="M4 18 C4 18 4 28 16 30 C28 28 28 18 28 18 Z" fill="#38BDF8" />
                  {/* Smiley face */}
                  <circle cx="12" cy="22" r="1.5" fill="#1E293B" />
                  <circle cx="20" cy="22" r="1.5" fill="#1E293B" />
                  <path d="M13 25 Q16 28 19 25" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              {/* Photo Frame */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="./assets/aistudio/WhatsApp_Image_2026-11-07_at_10.24.36_3e1f84bb.jpeg"
                  alt="Dra. Nayanne Gomes Odontopediatra Especialista IMIP"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[480px]"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Bio & Storytelling */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Conheça a Dra. <span className="text-rose-500">Nayanne Gomes</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              <p>
                Sou cirurgiã-dentista com especialização e residência em Odontopediatria pelo <strong>Instituto de Medicina Integral Professor Fernando Figueira (IMIP)</strong>, centro hospitalar de excelência nacional.
              </p>
              <p>
                Possuo capacitação dedicada a <strong>Pacientes com Necessidades Especiais (PNE)</strong> e habilitação certificada em <strong>Sedação Consciente Inalatória com Óxido Nitroso</strong> e <strong>Laserterapia</strong>.
              </p>
              <p>
                Atendimento clínico em consultórios estruturados em <strong>Recife</strong>, <strong>São Lourenço</strong> e <strong>Jaboatão dos Guararapes (PE)</strong>. Minha missão é transformar a consulta odontológica em um espaço de acolhimento seguro, onde o medo não tem lugar e cada criança descobre o prazer de sorrir com saúde.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-green w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base active:scale-95 shadow-md font-bold"
              >
                <span>Quero agendar uma consulta</span>
                <MessageCircle className="w-5 h-5 fill-white text-[#44D767]" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
