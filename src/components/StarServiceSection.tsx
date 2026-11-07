import React from 'react';
import { MessageCircle, CheckCircle2, ShieldCheck, Wind, Heart, Sparkles, Smile } from 'lucide-react';

export const StarServiceSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/5581988887777?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Gostaria de agendar uma consulta com Sedação Consciente (Óxido Nitroso) para meu filho(a).'
  )}`;

  const sedationSteps = [
    {
      num: '01',
      title: 'Máscara Aromatizada',
      desc: 'A criança escolhe o cheirinho (morango, chiclete ou tutti-frutti) e respira suavemente a mistura segura de oxigênio e óxido nitroso.'
    },
    {
      num: '02',
      title: 'Sensação de Leveza e Calma',
      desc: 'Em apenas 3 a 5 minutos, a sensação de ansiedade desaparece. A criança fica sorridente, descontraída e confortável.'
    },
    {
      num: '03',
      title: 'Consciente o Tempo Todo',
      desc: 'Seu filho não dorme! Ele conversa, escuta músicas e historinhas infantis, respondendo aos estímulos com total tranquilidade.'
    },
    {
      num: '04',
      title: 'Recuperação Imediata',
      desc: 'Ao finalizar, inala-se oxigênio puro por alguns minutos. O efeito passa 100% e a criança pode voltar para casa e brincar normalmente.'
    }
  ];

  return (
    <section id="sedacao" className="py-14 sm:py-20 bg-gradient-to-br from-[#FFF5F7] via-[#FDF2F8] to-[#FFF0F5] relative overflow-hidden">
      
      {/* Background Soft Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-rose-600 rounded-full text-xs font-black uppercase tracking-wider shadow-xs border border-rose-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Serviço Estrela · Odontologia Sem Trauma</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Sedação Consciente com Óxido Nitroso: O &ldquo;Ar Mágico&rdquo; que elimina o medo
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            A técnica mais segura e moderna do mundo para transformar o pavor de dentista em momentos de tranquilidade, carinho e sorrisos leves.
          </p>
        </div>

        {/* 2-Column Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Deep Explanation & Safety Credentials */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                Muitas crianças sofrem de ansiedade extrema, choro incontrolável ou traumas decorrentes de tratamentos odontológicos passados. A <strong>Sedação Consciente por Óxido Nitroso e Oxigênio</strong> é a solução padrão-ouro recomendada pela Associação Americana de Odontopediatria (AAPD).
              </p>
              <p>
                Durante a consulta, a criança respira um gás de aroma doce e agradável através de uma máscara infantil colorida. Em poucos minutos, o estresse diminui, o limiar de dor aumenta e a sensação é de profundo bem-estar — <strong>sem anestesia geral e sem perda de consciência</strong>.
              </p>
            </div>

            {/* Checklist of Safety Points */}
            <div className="space-y-3 pt-2">
              {[
                '100% Seguro: Monitoramento contínuo de saturação de oxigênio e pulso.',
                'A criança permanece acordada, consciente e cooperativa o tempo todo.',
                'Eliminação rápida pelo pulmão — zero ressaca, sem náuseas ou sonolência residual.',
                'Dra. Nayanne é habilitada e capacitada em Sedação Consciente Inalatória.'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA specific to Sedation */}
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-sm sm:text-base shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Agendar Consulta com Sedação Consciente</span>
              </a>
              <span className="block text-[11px] text-slate-500 mt-2">
                * Avaliação prévia detalhada com a Dra. Nayanne antes de qualquer procedimento.
              </span>
            </div>

          </div>

          {/* Right: Step-by-Step Experience Card */}
          <div className="lg:col-span-6">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-rose-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center shadow-xs">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Como funciona no consultório
                    </h3>
                    <p className="text-xs text-rose-600 font-semibold">
                      Passo a passo lúdico e sem lágrimas
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Sem Dor
                </span>
              </div>

              {/* Steps timeline */}
              <div className="space-y-4">
                {sedationSteps.map((step) => (
                  <div key={step.num} className="flex items-start gap-3.5 group">
                    <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 font-black text-xs flex items-center justify-center shrink-0 border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Parent reassurance footer */}
              <div className="mt-4 p-3.5 bg-rose-50/70 rounded-2xl border border-rose-100/90 flex items-center gap-3 text-xs text-rose-900 font-medium">
                <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Os pais podem acompanhar tudo de pertinho dentro do consultório durante todo o atendimento!</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
