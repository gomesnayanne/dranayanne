import React, { useState } from 'react';
import { Sparkles, MessageCircle, Menu, X, FileText, HelpCircle } from 'lucide-react';

interface NavbarProps {
  prescriptionCount: number;
  onOpenPrescription: () => void;
  onOpenGuidelines: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  prescriptionCount,
  onOpenPrescription,
  onOpenGuidelines
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    'Olá, Dra. Nayanne! Gostaria de agendar uma consulta odontopediátrica.'
  );
  const whatsappUrl = `https://wa.me/5581998591848?text=${whatsappMessage}`;

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Especialidades', href: '#especialidades' },
    { label: 'Acolhimento', href: '#por-que-escolher' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Sobre a Dra.', href: '#sobre' },
    { label: 'Calculadora', href: '#calculadora' },
    { label: 'Dúvidas', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-rose-100/80 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Zone (Clean Wordmark, single line) */}
        <a href="#inicio" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl" role="img" aria-label="sorriso">✨</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-800 leading-none group-hover:text-rose-600 transition-colors whitespace-nowrap">
              Dra. Nayanne Gomes
            </span>
            <span className="text-[11px] font-semibold text-rose-500 tracking-wide mt-0.5">
              Odontopediatria · IMIP
            </span>
          </div>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-rose-600 transition-colors whitespace-nowrap py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Zone (1 Primary CTA + Fast Access to Rx) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Prescription Counter Button */}
          <button
            onClick={onOpenPrescription}
            className="relative px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
            title="Ver Receituário Odontopediátrico"
          >
            <FileText className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Receita</span>
            {prescriptionCount > 0 && (
              <span className="bg-rose-600 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {prescriptionCount}
              </span>
            )}
          </button>

          {/* Primary WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Agendar Consulta</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-rose-100 px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-rose-100 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onOpenGuidelines();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-slate-600 hover:text-rose-600 flex items-center gap-1.5 p-2 rounded-lg"
            >
              <HelpCircle className="w-4 h-4 text-rose-500" />
              <span>Guia Clínico</span>
            </button>
            <button
              onClick={() => {
                onOpenPrescription();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-rose-600 flex items-center gap-1.5 p-2 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Receituário ({prescriptionCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
