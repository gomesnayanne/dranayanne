import React from 'react';

export const DifferentiatorsSection: React.FC = () => {
  const differentiators = [
    {
      bg: 'bg-[#C4A5D6]',
      textColor: 'text-slate-800',
      title: 'Capacitada em Pacientes com Necessidades Especiais.',
      desc: 'Crianças com síndromes, deficiências físicas, intelectuais ou sensoriais encontram aqui uma odontopediatra preparada para adaptar o atendimento a cada necessidade. O ambiente, a comunicação e os procedimentos são ajustados para garantir segurança e conforto.',
      icon: (
        <svg className="w-9 h-9 stroke-slate-800 mb-3" viewBox="0 0 36 36" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14" cy="10" r="5" />
          <path d="M6 26 C6 20 10 18 14 18 C18 18 22 20 22 26" />
          <circle cx="26" cy="14" r="3.5" />
          <path d="M22 26 C22 22 24 21 26 21 C28 21 30 22 30 26" />
          <path d="M12 24 L16 24" />
        </svg>
      )
    },
    {
      bg: 'bg-[#98DBCF]',
      textColor: 'text-slate-800',
      title: 'Habilitada em Laserterapia',
      desc: 'Utilizo o laser de baixa potência para acelerar cicatrizações, tratar aftas, mucosite e sensibilidade dentária. É um recurso que traz mais conforto e menos dor, especialmente para os pacientes mais sensíveis.',
      icon: (
        <svg className="w-9 h-9 stroke-slate-800 mb-3" viewBox="0 0 36 36" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 14 C7 14 5 18 5 22 C5 28 8 33 12 33 C14 33 15 30 18 30 C21 30 22 33 24 33 C28 33 31 28 31 22 C31 18 29 14 26 14" />
          <line x1="18" y1="4" x2="18" y2="10" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="13" y1="6" x2="15" y2="10" stroke="#F59E0B" strokeWidth="2" />
          <line x1="23" y1="6" x2="21" y2="10" stroke="#F59E0B" strokeWidth="2" />
        </svg>
      )
    },
    {
      bg: 'bg-[#F59292]',
      textColor: 'text-slate-800',
      title: 'Cuidado com Pacientes Oncológicos & Sem Dor',
      desc: 'Crianças em tratamento contra o câncer ou que enfrentam traumas e ansiedade extrema precisam de acompanhamento especializado. Cuido da saúde bucal antes, durante e depois do tratamento, prevenindo e tratando complicações como mucosite e infecções.',
      icon: (
        <svg className="w-9 h-9 stroke-slate-800 mb-3" viewBox="0 0 36 36" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="13" />
          <circle cx="14" cy="15" r="1.5" fill="currentColor" />
          <circle cx="22" cy="15" r="1.5" fill="currentColor" />
          <path d="M13 22 Q18 27 23 22" />
          <path d="M18 5 C16 3 14 5 13 6" />
        </svg>
      )
    },
    {
      bg: 'bg-[#F9BE82]',
      textColor: 'text-slate-800',
      title: 'Acolhimento',
      desc: 'O que considero mais especial no meu atendimento é quando a família se sente acolhida e a criança confia em mim, o tratamento flui naturalmente. Aqui, todo mundo é recebido com carinho, independente do diagnóstico ou da condição.',
      icon: (
        <svg className="w-9 h-9 stroke-slate-800 mb-3" viewBox="0 0 36 36" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="16" r="6" />
          <path d="M10 30 C10 24 14 22 18 22 C22 22 26 24 26 30" />
          <path d="M12 11 L10 9" />
          <path d="M24 11 L26 9" />
          <path d="M16 16 Q18 18 20 16" />
        </svg>
      )
    },
    {
      bg: 'bg-[#AE90C4]',
      textColor: 'text-slate-800',
      title: 'Especialista em Odontopediatria (IMIP)',
      desc: 'Residência e especialização dedicadas exclusivamente ao sorriso infantil pelo IMIP. De bebês a crianças com necessidades especiais, cada paciente que passa pela minha cadeira leva um pouquinho de toda a experiência e dedicação que construí na minha formação.',
      icon: (
        <svg className="w-9 h-9 stroke-slate-800 mb-3" viewBox="0 0 36 36" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 28 L22 14" strokeWidth="3" />
          <path d="M20 12 L24 8 C25 7 27 7 28 8 L30 10 C31 11 31 13 30 14 L26 18" fill="#F8FAFC" />
          <line x1="22" y1="10" x2="26" y2="14" stroke="#F43F5E" strokeWidth="2" />
        </svg>
      )
    }
  ];

  return (
    <section id="diferenciais" className="py-16 sm:py-20 bg-teeth-pattern bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title from Reference Image */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            Diferenciais
          </h2>
        </div>

        {/* 5 Distinct Pastel Cards (Exact match to Reference Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {differentiators.map((card, idx) => (
            <div
              key={idx}
              className={`${card.bg} ${card.textColor} rounded-3xl p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
            >
              <div>
                {card.icon}
                <h3 className="text-lg sm:text-xl font-black mb-3 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-95">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
