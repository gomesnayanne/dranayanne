import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { VisualProofSection } from './components/VisualProofSection';
import { DifferentiatorsSection } from './components/DifferentiatorsSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PrescriptionModal } from './components/PrescriptionModal';
import { GuidelinesModal } from './components/GuidelinesModal';
import { CalculatorPage } from './components/CalculatorPage';
import { PrescriptionItem } from './data/medications';

export default function App() {
  // Page Routing State: 'landing' or 'calculator'
  const [currentPage, setCurrentPage] = useState<'landing' | 'calculator'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#calculadora' || window.location.hash === '#calcular-doses'
        ? 'calculator'
        : 'landing';
    }
    return 'landing';
  });

  // Shared state for child weight in calculator
  const [childWeightKg, setChildWeightKg] = useState<number>(12);

  // Shared Prescription / Receita items
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItem[]>(() => {
    try {
      const saved = localStorage.getItem('dr_nayanne_rx');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);

  // Listen to hash changes (browser back/forward buttons or direct hash links)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#calculadora' || window.location.hash === '#calcular-doses') {
        setCurrentPage('calculator');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!window.location.hash || window.location.hash === '#inicio') {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToCalculator = () => {
    setCurrentPage('calculator');
    window.location.hash = '#calculadora';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
    try {
      history.pushState(null, '', window.location.pathname);
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToPrescription = (item: PrescriptionItem) => {
    setPrescriptionItems(prev => {
      const updated = [...prev, item];
      try {
        localStorage.setItem('dr_nayanne_rx', JSON.stringify(updated));
      } catch {
        // LocalStorage fallback
      }
      return updated;
    });
    setIsPrescriptionModalOpen(true);
  };

  const handleRemovePrescriptionItem = (id: string) => {
    setPrescriptionItems(prev => {
      const updated = prev.filter(i => i.id !== id);
      try {
        localStorage.setItem('dr_nayanne_rx', JSON.stringify(updated));
      } catch {
        // LocalStorage fallback
      }
      return updated;
    });
  };

  const handleClearPrescription = () => {
    setPrescriptionItems([]);
    try {
      localStorage.removeItem('dr_nayanne_rx');
    } catch {
      // LocalStorage fallback
    }
  };

  return (
    <>
      {currentPage === 'calculator' ? (
        /* ============================================================== */
        /* PÁGINA DEDICADA DA CALCULADORA (Aparece ao clicar em calcular) */
        /* ============================================================== */
        <CalculatorPage
          onBackToHome={navigateToLanding}
          onAddToPrescription={handleAddToPrescription}
          onOpenGuidelines={() => setIsGuidelinesModalOpen(true)}
          onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
          prescriptionCount={prescriptionItems.length}
          childWeightKg={childWeightKg}
          setChildWeightKg={setChildWeightKg}
        />
      ) : (
        /* ============================================================== */
        /* LANDING PAGE PRINCIPAL DO CONSULTÓRIO                          */
        /* ============================================================== */
        <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans selection:bg-pink-300 selection:text-pink-950 scroll-smooth">
          <main>
            {/* Imagem 1: Hero Section com CTA para abrir a página da calculadora */}
            <HeroSection onOpenCalculator={navigateToCalculator} />

            {/* Imagem 1: Odontopediatria Completa (Fundo azul #2B78C8 com cards brancos pontilhados) */}
            <SpecialtiesSection />

            {/* Imagem 2: Por que me escolher como dentista infantil do seu filho? (Com badge coração autismo) */}
            <WhyChooseSection />

            {/* Imagem 2 & 3: Conheça um pouco dos nossos pacientes + Quero essa experiência */}
            <VisualProofSection />

            {/* Imagem 3: Diferenciais (5 cards pastéis sólidos) */}
            <DifferentiatorsSection />

            {/* Imagem 3 & 4: Conheça a Dra. Nayanne Gomes (Com ícone mãozinha colorida sorridente) */}
            <AboutSection />

            {/* Imagem 4: Perguntas Frequentes (Barras lilases arredondadas + CTA verde) */}
            <FaqSection />
          </main>

          {/* Imagem 4: Rodapé e Contato com divisor de nuvem rosa coral, mapa do RioMar e dados */}
          <FooterSection onOpenCalculator={navigateToCalculator} />

          {/* Floating WhatsApp Action Button */}
          <FloatingWhatsApp />
        </div>
      )}

      {/* Modais Globais Funcionais */}
      <PrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        items={prescriptionItems}
        onRemoveItem={handleRemovePrescriptionItem}
        onClearAll={handleClearPrescription}
        patientWeightKg={childWeightKg}
      />

      <GuidelinesModal
        isOpen={isGuidelinesModalOpen}
        onClose={() => setIsGuidelinesModalOpen(false)}
      />
    </>
  );
}
