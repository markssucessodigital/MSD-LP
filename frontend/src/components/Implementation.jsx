import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const Implementation = ({ data }) => {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-600/20 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-neutral-800">Processo Estruturado</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            {data.title}
          </h2>
          
          <p className="text-lg text-neutral-600">
            {data.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 to-amber-600 hidden md:block"></div>

          {/* Steps */}
          <div className="space-y-8">
            {data.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-5 top-6 w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"></div>

                <Card className="md:ml-20 border-2 border-neutral-200 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Week Badge */}
                      <div className="flex-shrink-0">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg text-sm">
                          {step.week}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-amber-600 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-neutral-600 mb-4">
                          {step.description}
                        </p>

                        {/* Toggle Button */}
                        <button
                          onClick={() => toggleStep(index)}
                          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors"
                        >
                          {expandedStep === index ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              <span>Ocultar detalhes</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              <span>Ver entregáveis</span>
                            </>
                          )}
                        </button>

                        {/* Deliverables */}
                        {expandedStep === index && (
                          <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2 animate-fade-in">
                            <p className="text-xs font-semibold text-neutral-700 mb-3">Entregáveis desta semana:</p>
                            {step.deliverables.map((deliverable, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-700 text-sm">{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Check Icon */}
                      <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="text-center mt-12">
          <div className="inline-block bg-amber-500 text-white px-6 py-3 rounded-full font-semibold shadow-xl mb-4">
            ⚡ Implementação rápida e estruturada em 30 dias
          </div>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {data.finalNote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Implementation;
