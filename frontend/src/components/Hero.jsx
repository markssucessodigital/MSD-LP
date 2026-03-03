import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Rocket } from 'lucide-react';

const Hero = ({ data, onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img 
              src="https://customer-assets.emergentagent.com/job_maquina-crescimento/artifacts/3xgfi5o4_image.png" 
              alt="MSD Logo" 
              className="h-24 sm:h-32 mx-auto"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-600/20 rounded-full mb-8 animate-fade-in-up">
            <Rocket className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-neutral-800">Engenharia de Crescimento Digital</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight animate-fade-in-up animation-delay-100">
            {data.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            {data.subheadline}
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up animation-delay-300">
            <Button 
              onClick={onCTAClick}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              {data.ctaText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="mt-8 text-sm text-neutral-500 animate-fade-in-up animation-delay-400">
            ✓ Diagnóstico sem compromisso · ✓ Implementação em 30 dias · ✓ Resultados previsíveis
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neutral-300 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-amber-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
