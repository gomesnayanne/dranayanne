import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/5581998591848?text=${encodeURIComponent(
    'Olá, Dra. Nayanne! Vi seu site e gostaria de agendar uma consulta para meu filho(a).'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group">
      {/* Tooltip on hover/mobile glance */}
      <span className="hidden sm:inline-block px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Agendar Consulta no WhatsApp
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Dra. Nayanne no WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        <MessageCircle className="w-8 h-8 fill-white text-[#25D366]" />
      </a>
    </div>
  );
};
