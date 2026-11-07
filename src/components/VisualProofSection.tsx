import React from 'react';
import { MessageCircle, Award, Heart, Sparkles, Smile, Star } from 'lucide-react';

export const VisualProofSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/5581998591848?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Vi as fotos dos pacientes no site e gostaria de agendar uma consulta para meu filho.'
  )}`;

  const moments = [
    {
      title: 'Arthur (4 anos)',
      tag: 'Diploma do Sorriso',
      badge: 'Sem Choro',
      quote: 'Chegou com medo de dentista e saiu mostrando o diploma com orgulho para o papai!',
      bgGradient: 'from-amber-100 to-amber-50',
      icon: Award
    },
    {
      title: 'Helena (2 aninhos)',
      tag: 'Primeira Consulta',
      badge: 'Bebê Feliz',
      quote: 'Adaptação lúdica com bichinhos e brincadeiras antes do exame da boquinha.',
      bgGradient: 'from-pink-100 to-rose-50',
      icon: Smile
    },
    {
      title: 'Bernardo (7 anos)',
      tag: 'Sedação Consciente',
      badge: 'Ar Mágico',
      quote: 'Tratamento de duas cáries assistindo o desenho favorito sem nenhuma dor.',
      bgGradient: 'from-sky-100 to-blue-50',
      icon: Sparkles
    },
    {
      title: 'Clarice (5 anos)',
      tag: 'Paciente PNE / TEA',
      badge: 'Respeito ao Tempo',
      quote: 'Tempo estendido, luzes suaves e total acolhimento sensorial adaptado para ela.',
      bgGradient: 'from-purple-100 to-pink-50',
      icon: Heart
    },
    {
      title: 'Gêmeos Pedro & Davi',
      tag: 'Higiene Divertida',
      badge: 'Super Dente',
      quote: 'Aprenderam a escovação correta e saíram pedindo para voltar semana que vem.',
      bgGradient: 'from-emerald-100 to-teal-50',
      icon: Star
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-teeth-pattern bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Heading from Reference Image */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Conheça um pouco dos nossos <span className="text-[#9F75B8]">pacientes</span>
          </h2>
        </div>

        {/* Happy Moments Strip / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {moments.slice(0, 3).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      {item.badge}
                    </span>
                  </div>

                  <div className={`w-full h-36 rounded-2xl bg-gradient-to-tr ${item.bgGradient} flex flex-col items-center justify-center p-4 text-center mb-4`}>
                    <Icon className="w-10 h-10 text-slate-700 mb-2" />
                    <span className="text-sm font-black text-slate-800">{item.title}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button from Reference Image (Centered Green Pill) */}
        <div className="text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-green w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base active:scale-95 shadow-md font-bold"
          >
            <span>Quero essa experiência</span>
            <MessageCircle className="w-5 h-5 fill-white text-[#44D767]" />
          </a>
        </div>

      </div>
    </section>
  );
};
