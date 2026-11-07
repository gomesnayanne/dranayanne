import React from 'react';
import { Star, MessageCircle, Heart, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/5581988887777?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Li os depoimentos de outras famílias e gostaria de agendar uma consulta para meu filho.'
  )}`;

  const testimonials = [
    {
      parent: 'Mariana Silveira',
      child: 'Mãe do Theo (4 anos)',
      text: 'O Theo tinha pavor de dentista após uma experiência terrível em outra clínica. Ele chorava só de ver o prédio. Com a Dra. Nayanne e a sedação com óxido nitroso, ele fez duas restaurações rindo, assistindo desenho! Ela tem um dom inacreditável com crianças.',
      city: 'Recife - PE'
    },
    {
      parent: 'Carlos Eduardo Mendes',
      child: 'Pai da Sofia (6 anos)',
      text: 'A paciência da Dra. Nayanne é fora do comum. Ela explicou cada etapa para a Sofia, mostrou o "espelhinho mágico" e a deixou confortável antes de começar. Hoje a Sofia pede para ir ao dentista para ganhar o diploma do sorriso!',
      city: 'Olinda - PE'
    },
    {
      parent: 'Renata Albuquerque',
      child: 'Mãe dos gêmeos Lucas e Davi (2 anos)',
      text: 'Excelente profissional! Levei os meninos para a primeira consulta de rotina e ela nos deu uma verdadeira aula de higiene e prevenção de cáries para a fase de mamadeiras. Consultório impecável, cheiroso e acolhedor.',
      city: 'Jaboatão dos Guararapes - PE'
    }
  ];

  return (
    <section id="depoimentos" className="py-14 sm:py-20 bg-gradient-to-br from-[#FFF9FA] via-[#FFF5F7] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-black uppercase text-rose-500 tracking-wider">
            O que dizem as famílias
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Depoimentos de quem confiou o sorriso dos filhos
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Histórias reais de tranquilidade, carinho e superação do medo infantil.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-rose-200 absolute top-5 right-5" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-rose-100/70 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 font-black text-sm flex items-center justify-center shrink-0">
                  {t.parent[0]}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {t.parent}
                  </h4>
                  <p className="text-[11px] text-rose-600 font-semibold">
                    {t.child} · {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Post-Testimonials */}
        <div className="mt-12 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-sm sm:text-base shadow-md hover:shadow-lg active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span>Agendar Consulta no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
