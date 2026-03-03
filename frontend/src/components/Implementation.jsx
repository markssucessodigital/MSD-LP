import React from 'react';
import { Card, CardContent } from './ui/card';
import { Calendar, CheckCircle2 } from 'lucide-react';

const Implementation = ({ data }) => {
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
                        <p className="text-neutral-600">
                          {step.description}
                        </p>
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
          <div className="inline-block bg-amber-500 text-white px-6 py-3 rounded-full font-semibold shadow-xl">
            ⚡ Implementação rápida e estruturada em 30 dias
          </div>
        </div>
      </div>
    </section>
  );
};

export default Implementation;
