import React from 'react';

export const SpecialtiesSection: React.FC = () => {
  const cards = [
    {
      title: 'Ortodontia Infantil',
      desc: 'Acompanhamos de forma personalizada e cuidadosa o desenvolvimento dos dentes e da arcada, ajudando a prevenir problemas futuros ou corrigindo, buscando segurança e tranquilidade para a criança e pais.',
      icon: (
        <svg className="w-12 h-12 mx-auto stroke-slate-800" viewBox="0 0 48 48" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Tooth with cute glasses */}
          <path d="M14 10 C10 10 6 15 6 22 C6 30 9 40 14 40 C17 40 18 34 24 34 C30 34 31 40 34 40 C39 40 42 30 42 22 C42 15 38 10 34 10 C29 10 27 14 24 14 C21 14 19 10 14 10 Z" />
          <circle cx="16" cy="20" r="4.5" />
          <circle cx="32" cy="20" r="4.5" />
          <line x1="20.5" y1="20" x2="27.5" y2="20" />
        </svg>
      )
    },
    {
      title: 'Laserterapia',
      desc: 'Tecnologia segura e indolor utilizada para aliviar dores, reduzir inflamações e acelerar a cicatrização, proporcionando mais conforto e bem-estar durante e após os procedimentos odontológicos.',
      icon: (
        <svg className="w-12 h-12 mx-auto stroke-slate-800" viewBox="0 0 48 48" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Tooth with sparkle */}
          <path d="M14 12 C10 12 7 16 7 23 C7 31 10 40 15 40 C18 40 19 34 24 34 C29 34 30 40 33 40 C38 40 41 31 41 23 C41 16 38 12 34 12 C29 12 27 16 24 16 C21 16 19 12 14 12 Z" />
          <path d="M38 6 L39 10 L43 11 L39 12 L38 16 L37 12 L33 11 L37 10 Z" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1" />
        </svg>
      )
    },
    {
      title: 'Reabilitação Oral',
      desc: 'Planejamos de forma individualizada para devolver função, conforto e saúde ao sorriso. Cada tratamento é pensado para restabelecer a mastigação, a estética e o bem-estar, respeitando as necessidades de cada paciente e promovendo mais qualidade de vida no dia a dia.',
      icon: (
        <svg className="w-12 h-12 mx-auto stroke-slate-800" viewBox="0 0 48 48" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Dental instruments */}
          <line x1="16" y1="8" x2="16" y2="40" />
          <path d="M12 10 Q16 6 20 10" />
          <line x1="24" y1="8" x2="24" y2="40" />
          <circle cx="24" cy="8" r="3.5" />
          <line x1="32" y1="8" x2="32" y2="40" />
          <path d="M32 14 L36 8" />
        </svg>
      )
    },
    {
      title: 'Cirurgia da Linguinha a Laser (Frenectomia)',
      desc: 'Proporciona um procedimento mais tranquilo para a criança, com maior conforto e uma recuperação mais rápida. A tecnologia permite uma abordagem delicada, reduzindo o estresse durante e após o atendimento.',
      icon: (
        <svg className="w-12 h-12 mx-auto stroke-slate-800" viewBox="0 0 48 48" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Mouth and tongue */}
          <ellipse cx="24" cy="24" rx="16" ry="14" />
          <path d="M12 24 Q24 34 36 24" />
          <path d="M18 25 C18 32 30 32 30 25" fill="#FDA4AF" stroke="#E11D48" />
          <line x1="24" y1="26" x2="24" y2="30" stroke="#E11D48" />
        </svg>
      )
    },
    {
      title: 'Sedação Consciente (Óxido Nitroso)',
      desc: 'Técnica padrão-ouro com o "ar mágico", permitindo que crianças ansiosas ou com fobia de dentista realizem seus procedimentos de forma leve, relaxada e sem dor, permanecendo conscientes.',
      icon: (
        <svg className="w-12 h-12 mx-auto stroke-slate-800" viewBox="0 0 48 48" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Cloud / smiling mask */}
          <path d="M14 28 C10 28 8 24 9 20 C10 16 14 14 17 15 C19 11 25 10 29 13 C32 10 38 12 39 16 C42 18 42 24 38 27 C36 29 15 29 14 28 Z" fill="#E0F2FE" />
          <path d="M18 21 Q24 26 30 21" stroke="#2563EB" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: 'Prevenção & Cárie Zero',
      desc: 'Abordagem precoce com aplicação de selantes biológicos, vernizes com flúor e educação lúdica de escovação para que seu pequeno cresça com dentes fortes e sem cáries.',
      icon: (
        <svg className="w-12 h-12 mx-auto stroke-slate-800" viewBox="0 0 48 48" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Shield with smiling star */}
          <path d="M24 6 L36 11 V22 C36 31 24 38 24 38 C24 38 12 31 12 22 V11 L24 6 Z" fill="#FEF3C7" stroke="#F59E0B" />
          <circle cx="21" cy="20" r="1.5" fill="#D97706" />
          <circle cx="27" cy="20" r="1.5" fill="#D97706" />
          <path d="M21 24 Q24 27 27 24" stroke="#D97706" strokeWidth="1.5" />
        </svg>
      )
    }
  ];

  return (
    <section id="especialidades" className="bg-[#2B78C8] text-white pt-6 pb-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading from Reference Image */}
        <div className="text-center mb-10 sm:mb-14 space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            Odontopediatria Completa
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium max-w-2xl mx-auto">
            Tratamentos odontológicos infantis humanizados, preventivos e sem dor em Recife e Região Metropolitana
          </p>
        </div>

        {/* 2-Column Grid with Stitched Dashed White Cards (Exact match to reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#8ec7f5] shadow-lg hover:shadow-xl transition-all duration-200 text-center flex flex-col items-center justify-between group"
            >
              <div className="space-y-4">
                {/* Line Icon */}
                <div className="group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed text-justify sm:text-center">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
