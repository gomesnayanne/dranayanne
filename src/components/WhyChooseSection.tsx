import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/5581998591848?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Li seu texto sobre acolhimento e gostaria de marcar uma consulta para meu filho(a).'
  )}`;

  return (
    <section id="por-que-escolher" className="py-16 sm:py-20 bg-teeth-pattern bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Photo with Autism Puzzle Heart Badge */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Colorful Autism/Inclusion Puzzle Heart Badge */}
              <div className="absolute -top-3 -left-3 z-10 w-12 h-12 bg-white rounded-2xl p-2 shadow-lg border border-slate-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  {/* 4-color puzzle heart */}
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#0284C7" />
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c.75 0 1.48.16 2.15.45V12h2.35v9.35z" fill="#EF4444" />
                  <path d="M12 3c1.74 0 3.41.81 4.5 2.09C17.06 4.39 17.75 3.9 18.5 3.55V12h-6.5V3z" fill="#FBBF24" />
                  <path d="M12 12h6.5v4.5l-3.25 3.25L12 18.2V12z" fill="#10B981" />
                </svg>
              </div>

              {/* Photo Frame */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="./assets/aistudio/WhatsApp_Image_2026-11-07_at_10.26.24_b7ce61de.jpeg"
                  alt="Dra. Nayanne Gomes no atendimento acolhedor no consultório"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[480px]"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Empathy Storytelling & Green CTA Button */}
          <div className="lg:col-span-6 space-y-5 text-left">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Por que me escolher como dentista infantil do seu filho?
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              <p>
                Eu sei que quando a família procura uma dentista para uma criança com necessidades especiais, em tratamento de saúde ou com medo, não está buscando apenas competência técnica. Está buscando alguém que entenda o momento, que tenha paciência de verdade e que cuide do filho de vocês com o mesmo carinho que eu gostaria que cuidassem do meu.
              </p>
              <p>
                É assim que eu atendo. Com calma, com clareza e com aquele acolhimento que faz a criança confiar e os pais respirarem aliviados. Eu explico tudo de um jeito simples, sem termos difíceis, e faço questão de que a família inteira saia do consultório segura e sem dúvidas.
              </p>
              <p>
                Sou cirurgiã-dentista especialista em Odontopediatria pelo IMIP, Capacitada em Pacientes com Necessidades Especiais (PNE) e Habilitada em Sedação Consciente Inalatória (Óxido Nitroso) e Laserterapia. Atendo bebês, crianças com e sem medo, pacientes especiais e crianças que precisam de atenção médica delicada. Mas o que eu mais gosto de ouvir é uma mãe dizendo que o filho saiu da consulta pedindo pra voltar.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-green w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base active:scale-95 shadow-md"
              >
                <span>Quero marcar uma consulta</span>
                <MessageCircle className="w-5 h-5 fill-white text-[#44D767]" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
