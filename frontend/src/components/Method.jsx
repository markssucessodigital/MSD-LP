import React from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle2, Rocket } from 'lucide-react';

const Method = ({ data }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-600/20 rounded-full mb-6">
            <Rocket className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-neutral-800">A Solução Estruturada</span>
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
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  {pillar.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 text-sm">{benefit}</span>
                    </div>
                  ))}
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
