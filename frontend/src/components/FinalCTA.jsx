import React from 'react';
import { Button } from './ui/button';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const FinalCTA = ({ data, onCTAClick }) => {
  return (
    <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-600/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">Última Etapa</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {data.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-neutral-300 mb-10 leading-relaxed">
            {data.subtitle}
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            {data.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 text-left">
                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-neutral-200">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={onCTAClick}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-10 py-7 text-xl rounded-xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 group"
          >
            {data.ctaText}
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>Sem Compromisso</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>Resposta em 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
