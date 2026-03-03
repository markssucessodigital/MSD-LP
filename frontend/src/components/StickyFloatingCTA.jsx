import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, X } from 'lucide-react';

const StickyFloatingCTA = ({ onCTAClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 800px
      if (window.scrollY > 800 && !isClosed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClosed]);

  const handleClose = () => {
    setIsClosed(true);
    setIsVisible(false);
  };

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-2xl p-4 max-w-sm">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="text-white mb-3">
          <p className="font-bold text-lg mb-1">
            Pronto para Estruturar Seu Crescimento?
          </p>
          <p className="text-sm text-white/90">
            Agende seu diagnóstico gratuito agora
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onCTAClick}
          className="w-full bg-white hover:bg-neutral-100 text-amber-600 font-bold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          Agendar Diagnóstico
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StickyFloatingCTA;
