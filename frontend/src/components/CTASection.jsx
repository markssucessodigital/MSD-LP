import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = ({ title, subtitle, ctaText, variant = 'default', onCTAClick }) => {
  const bgClasses = {
    default: 'bg-gradient-to-r from-amber-500 to-amber-600',
    dark: 'bg-gradient-to-br from-neutral-900 via-black to-neutral-900',
    light: 'bg-gradient-to-br from-neutral-50 to-amber-50'
  };

  const textClasses = {
    default: 'text-white',
    dark: 'text-white',
    light: 'text-neutral-900'
  };

  return (
    <section className={`py-16 ${bgClasses[variant]} relative overflow-hidden`}>
      {/* Decorative elements for dark variant */}
      {variant === 'dark' && (
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          {title && (
            <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${textClasses[variant]}`}>
              {title}
            </h3>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className={`text-lg mb-8 ${variant === 'default' ? 'text-white/90' : variant === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {subtitle}
            </p>
          )}

          {/* CTA Button */}
          <Button
            onClick={onCTAClick}
            size="lg"
            className={`${
              variant === 'light' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' 
                : 'bg-white hover:bg-neutral-100 text-amber-600'
            } font-bold px-8 py-6 text-lg rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 group`}
          >
            {ctaText}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust elements */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-sm">
            <span className={variant === 'light' ? 'text-neutral-600' : 'text-white/80'}>
              ✓ Gratuito
            </span>
            <span className={variant === 'light' ? 'text-neutral-600' : 'text-white/80'}>
              ✓ Sem compromisso
            </span>
            <span className={variant === 'light' ? 'text-neutral-600' : 'text-white/80'}>
              ✓ Resposta em 24h
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
