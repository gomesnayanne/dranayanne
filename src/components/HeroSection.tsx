import React from 'react';
import { MessageCircle, Calculator, Sparkles, Heart } from 'lucide-react';

interface HeroSectionProps {
  onOpenCalculator?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCalculator }) => {
  const whatsappUrl = `https://wa.me/5581998591848?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Vi seu site e gostaria de agendar uma consulta odontopediátrica para meu filho(a).'
  )}`;

  return (
    <section id="inicio" className="relative pt-8 sm:pt-12 overflow-hidden bg-white bg-teeth-pattern">
      

      {/* ============================================================== */}
      {/* 2. PLAYFUL DOODLES IN THE WHITE MARGINS (Ultra-wide screens)   */}
      {/* ============================================================== */}
      
      {/* Left Margin: Cute Smiling Tooth Doodle with sparkles */}
      <div className="absolute top-44 left-6 sm:left-12 lg:left-16 xl:left-24 z-0 pointer-events-none opacity-40 hidden md:block">
        <svg width="72" height="72" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Molar outline */}
          <path 
            d="M50 18 C35 18 24 24 22 36 C20 48 24 68 32 82 C36 88 42 86 45 74 C47 65 53 65 55 74 C58 86 64 88 68 82 C76 68 80 48 78 36 C76 24 65 18 50 18 Z" 
            stroke="#0284C7" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="#E0F2FE"
            fillOpacity="0.5"
          />
          {/* Friendly Smiling Face */}
          <circle cx="40" cy="40" r="3" fill="#0369A1" />
          <circle cx="60" cy="40" r="3" fill="#0369A1" />
          <circle cx="35" cy="46" r="3.5" fill="#FDA4AF" />
          <circle cx="65" cy="46" r="3.5" fill="#FDA4AF" />
          <path d="M42 48 Q50 56 58 48" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Sparkle top right */}
          <path d="M82 18 L84 24 L90 26 L84 28 L82 34 L80 28 L74 26 L80 24 Z" fill="#FBBF24" />
        </svg>
      </div>

      {/* Left Margin lower: Dotted wavy trail + star */}
      <div className="absolute top-80 left-4 sm:left-8 lg:left-20 z-0 pointer-events-none opacity-50 hidden lg:block">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <path d="M10 40 Q35 10 65 35 T115 20" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 6" strokeLinecap="round" />
          <polygon points="110,12 112,17 117,18 113,21 114,26 110,23 106,26 107,21 103,18 108,17" fill="#F43F5E" />
        </svg>
      </div>

      {/* Right Margin: Floating pastel bubbles & stars */}
      <div className="absolute top-72 right-12 lg:right-28 z-0 pointer-events-none opacity-45 hidden xl:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-pink-300/60 ring-2 ring-pink-400/40" />
          <div className="w-3 h-3 rounded-full bg-amber-300/70" />
          <svg className="w-6 h-6 text-sky-400 fill-current" viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN HERO CONTENT CONTAINER                                 */}
      {/* ============================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Subtle decorative in-grid touches */}
        {/* Floating playful sparkle near top subtitle */}
        <div className="absolute top-1 left-1/3 pointer-events-none opacity-70 hidden sm:block">
          <span className="text-amber-400 text-xl font-bold animate-pulse">✦</span>
        </div>
        <div className="absolute top-28 left-1/2 pointer-events-none opacity-60 hidden md:block">
          <span className="text-pink-400 text-sm font-bold">✦</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          
          {/* Left Column: Copy & Action (Aligned with reference) */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left pb-10 sm:pb-16 pt-2 relative">
            
            {/* Playful Floating Mini-Badges / Doodles above copy */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <span className="text-xs sm:text-sm font-bold text-slate-500 tracking-wider block uppercase">
                CRO/PE 9949 · Especialista IMIP
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-100/90 px-2.5 py-0.5 rounded-full border border-sky-200/80 shadow-2xs">
                <Sparkles className="w-3 h-3 text-sky-500" />
                Odontopediatria & PNE
              </span>
            </div>

            {/* Headline from Reference Image */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-[1.18] text-balance relative">
              Cuidamos do sorriso de quem você mais ama!
              {/* Cute little heart doodle next to exclamation mark */}
              <span className="inline-block ml-2 text-rose-500 transform rotate-12 hover:scale-125 transition-transform align-middle">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-rose-500 text-rose-500 inline" />
              </span>
            </h1>

            {/* ============================================================== */}
            {/* MOBILE ONLY: DOCTOR SPOTLIGHT CARD (Aparece logo no início!)  */}
            {/* ============================================================== */}
            <div className="block lg:hidden my-3 relative">
              <div className="relative mx-auto max-w-[310px] sm:max-w-[340px] rounded-3xl bg-gradient-to-b from-rose-100/70 via-amber-50/50 to-white p-3.5 pt-5 border-2 border-rose-200/70 shadow-lg">
                
                {/* Playful Stickers on Mobile Photo */}
                <div className="absolute top-2 left-2 z-20 flex flex-col items-center pointer-events-none drop-shadow-xs">
                  <svg className="w-8 h-8 text-[#F43F5E] fill-current transform -rotate-12" viewBox="0 0 24 24">
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                  </svg>
                  <svg className="w-5 h-5 text-[#8B5CF6] fill-current -ml-5 -mt-1 transform rotate-12" viewBox="0 0 24 24">
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                  </svg>
                  <svg className="w-6 h-6 text-[#3B82F6] fill-current ml-4 -mt-1" viewBox="0 0 24 24">
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                  </svg>
                </div>

                <div className="absolute top-2 right-2 z-20 pointer-events-none drop-shadow-xs">
                  <svg className="w-11 h-11 text-[#FBBF24]" viewBox="0 0 40 40" fill="none">
                    <path d="M12 10 C6 6 4 18 16 20 C4 22 6 34 12 30 C16 28 18 24 18 20 C18 16 16 12 12 10 Z" fill="#FBBF24" />
                    <path d="M28 10 C34 6 36 18 24 20 C36 22 34 34 28 30 C24 28 22 24 22 20 C22 16 24 12 28 10 Z" fill="#FBBF24" />
                    <rect x="18" y="12" width="4" height="16" rx="2" fill="#38BDF8" />
                    <circle cx="20" cy="10" r="2.5" fill="#38BDF8" />
                  </svg>
                </div>

                {/* Cutout Photo */}
                <div className="relative z-10 flex justify-center">
                  <img
                    src="./assets/aistudio/Gemini_Generated_Image_vrczgqvrczgqvrcz_281ea0c9.jpeg"
                    alt="Dra. Nayanne Gomes Odontopediatra"
                    className="w-full max-w-[230px] sm:max-w-[260px] h-auto object-cover object-top mix-blend-multiply drop-shadow-xs"
                  />
                </div>

                {/* Mobile Floating Trust Pill */}
                <div className="relative z-20 -mt-3 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-slate-200/80 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-xs font-black text-slate-800">
                    <span className="text-amber-500">★★★★★</span>
                    <span>Dra. Nayanne Gomes</span>
                  </div>
                  <p className="text-[11px] font-bold text-rose-600">
                    Especialista IMIP · Atendimento sem Medo
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold">
                    📍 Recife · São Lourenço · Jaboatão
                  </p>
                </div>

              </div>
            </div>

            {/* Subtitle from Reference Image */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
              Atendimento para crianças, pacientes especiais e adultos com medo. Acolhimento, paciência e técnicas para que se sintam tranquilos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-green w-full sm:w-auto px-8 py-3.5 sm:py-3.5 text-sm sm:text-base flex items-center justify-center gap-2.5 active:scale-95 shadow-md font-extrabold"
              >
                <span>Agendar Consulta</span>
                <MessageCircle className="w-5 h-5 fill-white text-[#44D767]" />
              </a>

              <button
                type="button"
                onClick={onOpenCalculator}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200/90 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-rose-500" />
                <span>Calculadora de Doses</span>
              </button>
            </div>

            {/* Little reassuring tags in the white space below buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200/60">
                ✨ Sedação Consciente (Óxido Nitroso)
              </span>
              <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full border border-rose-200/60">
                🦷 Laserterapia & Frenectomia
              </span>
            </div>

          </div>

          {/* Right Column (Desktop Only): Dra. Nayanne Integrated Seamlessly Into Background */}
          <div className="hidden lg:flex lg:col-span-6 relative justify-center items-end">
            
            {/* Cutout Portrait Container with Attached Doodles (Locks them to her silhouette on all viewports) */}
            <div className="relative w-full max-w-sm sm:max-w-md flex justify-center items-end -mb-14 sm:-mb-20 md:-mb-24 lg:-mb-28 z-10">
              
              {/* Playful Floating Stars (from reference image: above her right shoulder) */}
              <div className="absolute top-2 sm:top-6 -left-3 sm:left-2 z-20 flex flex-col items-center pointer-events-none drop-shadow-sm">
                {/* Large Pink/Coral Star */}
                <svg className="w-9 h-9 sm:w-11 sm:h-11 text-[#F43F5E] fill-current transform -rotate-12 hover:rotate-6 transition-transform" viewBox="0 0 24 24">
                  <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                </svg>
                {/* Medium Purple Star */}
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B5CF6] fill-current -ml-7 -mt-1 transform rotate-12" viewBox="0 0 24 24">
                  <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                </svg>
                {/* Blue Star */}
                <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#3B82F6] fill-current ml-6 -mt-1 transform -rotate-6" viewBox="0 0 24 24">
                  <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                </svg>
              </div>

              {/* Playful Butterfly (from reference image: above her left shoulder) */}
              <div className="absolute top-0 sm:top-4 -right-2 sm:right-4 z-20 pointer-events-none drop-shadow-sm">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-[#FBBF24]" viewBox="0 0 40 40" fill="none">
                  <path d="M12 10 C6 6 4 18 16 20 C4 22 6 34 12 30 C16 28 18 24 18 20 C18 16 16 12 12 10 Z" fill="#FBBF24" />
                  <path d="M28 10 C34 6 36 18 24 20 C36 22 34 34 28 30 C24 28 22 24 22 20 C22 16 24 12 28 10 Z" fill="#FBBF24" />
                  <rect x="18" y="12" width="4" height="16" rx="2" fill="#38BDF8" />
                  <circle cx="20" cy="10" r="2.5" fill="#38BDF8" />
                </svg>
              </div>

              {/* Playful Purple Swirl Doodle (from reference image: near her left side/elbow) */}
              <div className="absolute bottom-28 sm:bottom-36 -left-6 sm:-left-4 z-20 pointer-events-none">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#7C3AED] drop-shadow-xs" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                  <path d="M18 6 C12 6 8 11 8 16 C8 21 12 26 17 26 C22 26 25 21 24 17 C23 13 19 12 17 14 C15 16 16 19 18 19" />
                </svg>
              </div>

              {/* Little cute tooth sparkle near doctor */}
              <div className="absolute top-24 -right-6 z-20 pointer-events-none hidden sm:block opacity-75">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z" fill="#38BDF8" />
                </svg>
              </div>

              {/* Doctor Cutout Photo */}
              <img
                src="./assets/aistudio/Gemini_Generated_Image_vrczgqvrczgqvrcz_281ea0c9.jpeg"
                alt="Dra. Nayanne Gomes Odontopediatra IMIP"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-top max-h-[500px] sm:max-h-[580px] mix-blend-multiply relative z-10"
              />

            </div>

          </div>

        </div>
      </div>

      {/* Scalloped Blue Cloud Waves Divider (Seamlessly overlapping and covering the bottom of the photo) */}
      <div className="w-full overflow-hidden leading-none text-[#2B78C8] -mb-1 relative z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 md:h-32 block preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 L0,55 Q40,15 90,50 Q150,15 210,55 Q270,15 330,50 Q400,10 470,55 Q540,15 610,52 Q680,10 750,50 Q820,15 890,58 Q960,10 1030,52 Q1100,15 1170,50 Q1240,10 1310,55 Q1380,15 1440,50 L1440,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  );
};
