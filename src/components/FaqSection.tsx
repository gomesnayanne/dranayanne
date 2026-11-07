import React, { useState } from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const whatsappUrl = `https://wa.me/5581998591848?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Gostaria de agendar uma consulta odontopediátrica.'
  )}`;

  const faqs = [
    {
      q: 'Onde a Dra. Nayanne Gomes atende como odontopediatra em Recife e Região?',
      a: 'A Dra. Nayanne Gomes (CRO/PE 18440) atende em consultórios preparados e acolhedores em Recife - PE, Jaboatão dos Guararapes - PE e São Lourenço da Mata - PE, recebendo famílias de toda a Região Metropolitana do Recife. Os agendamentos são centralizados pelo WhatsApp oficial (81) 99859-1848.'
    },
    {
      q: 'A Dra. Nayanne atende crianças autistas (TEA) e com necessidades especiais (PNE)?',
      a: 'Sim. A odontopediatria para pacientes com necessidades especiais (PNE), autismo (TEA), TDAH e síndromes exige preparo específico, manejo sensorial (controle de luzes e sons), tempo estendido e comunicação afetiva para respeitar o ritmo de cada criança.'
    },
    {
      q: 'Como é o atendimento para crianças com medo de dentista e sedação consciente?',
      a: 'Trabalhamos com consultas sem pressa, linguagem lúdica e dessensibilização gradual. Quando indicado, utilizamos a sedação consciente inalatória com óxido nitroso ("ar mágico"), que relaxa a criança em minutos de forma segura e sem anestesia geral.'
    },
    {
      q: 'Com que idade levar o bebê ao odontopediatra e fazer avaliação da linguinha?',
      a: 'O ideal é já nos primeiros meses de vida (para avaliação do freio lingual / cirurgia da linguinha a laser e amamentação) ou no nascimento do primeiro dentinho, por volta dos 6 meses, garantindo prevenção precoce Cárie Zero.'
    },
    {
      q: 'Por que crianças em tratamento oncológico precisam de acompanhamento odontopediátrico?',
      a: 'Durante tratamentos médicos delicados como quimioterapia ou radioterapia, a imunidade cai e podem surgir lesões dolorosas como a mucosite oral. A odontopediatra previne focos de infecção e aplica laserterapia indolor para alívio rápido e cicatrização.'
    },
    {
      q: 'O que é laserterapia odontológica infantil e para que serve?',
      a: 'É a aplicação de luz terapêutica totalmente indolor que acelera a cicatrização dos tecidos, alivia aftas, estomatites, herpes e pós-operatório de frenectomia, com ação anti-inflamatória e analgésica imediata.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-teeth-pattern bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Title from Reference Image */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            Perguntas Frequentes
          </h2>
        </div>

        {/* Lilac Rounded Pill Accordion Bars (Exact match to Reference Image 4) */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#BFA4CF] text-slate-900 rounded-3xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm hover:opacity-95 transition-opacity"
                >
                  <div className="flex items-center gap-2.5">
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                    <span>{faq.q}</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-800/90 leading-relaxed font-medium bg-[#B89AC7]/40">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Green CTA Pill Button below FAQ (from Reference Image 4) */}
        <div className="mt-10 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-green w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base active:scale-95 shadow-md font-bold"
          >
            <span>Agendar minha consulta</span>
            <MessageCircle className="w-5 h-5 fill-white text-[#44D767]" />
          </a>
        </div>

      </div>
    </section>
  );
};
