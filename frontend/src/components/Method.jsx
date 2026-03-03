import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle2, Rocket, ChevronDown, ChevronUp } from 'lucide-react';

const Method = ({ data }) => {
  const [expandedPillar, setExpandedPillar] = useState(null);

  const togglePillar = (index) => {
    setExpandedPillar(expandedPillar === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-600/20 rounded-full mb-6">
            <Rocket className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-neutral-800">{data.tagline}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            {data.title}
          </h2>
          
          <p className="text-lg text-neutral-600">
            {data.subtitle}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {data.pillars.map((pillar, index) => (
            <Card 
              key={index}
              className="border-2 border-neutral-200 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl group overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-2xl rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  {pillar.number}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {pillar.title}
                </h3>

                {/* Objective */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-amber-600 mb-1">Objetivo:</p>
                  <p className="text-neutral-700 font-medium">{pillar.objective}</p>
                </div>

                {/* Principle */}
                <div className="mb-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <p className="text-sm font-semibold text-amber-700 mb-1">Princípio:</p>
                  <p className="text-neutral-800 italic">"{pillar.principle}"</p>
                </div>

                {/* Description */}
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Toggle Button */}
                <button
                  onClick={() => togglePillar(index)}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors mb-4"
                >
                  {expandedPillar === index ? (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      <span>Ocultar Entregáveis</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      <span>Ver Entregáveis Práticos</span>
                    </>
                  )}
                </button>

                {/* Deliverables (Expandable) */}
                {expandedPillar === index && (
                  <div className="space-y-3 mb-6 animate-fade-in">
                    <p className="text-sm font-semibold text-neutral-700 mb-3">Entregáveis Práticos:</p>
                    {pillar.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Result */}
                <div className="bg-neutral-900 text-white p-4 rounded-lg">
                  <p className="text-xs font-semibold text-amber-500 mb-2">Resultado Esperado:</p>
                  <p className="text-sm font-medium">{pillar.result}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-neutral-900 text-white px-8 py-4 rounded-xl">
            <p className="text-lg font-semibold">
              <span className="text-amber-500">Metodologia comprovada</span> aplicada em mais de 50 empresas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Method;
