import React from 'react';
import { Card, CardContent } from './ui/card';
import { TrendingUp, Clock, Zap, Building2, Rocket, BarChart3 } from 'lucide-react';

const iconMap = {
  'Crescimento Previsível': TrendingUp,
  'Economia de Tempo': Clock,
  'Tecnologia Aplicada': Zap,
  'Estrutura Sólida': Building2,
  'Escalabilidade': Rocket,
  'Resultados Mensuráveis': BarChart3
};

const Benefits = ({ data }) => {
  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {data.title}
          </h2>
          <p className="text-lg text-neutral-300">
            Resultados tangíveis que transformam a operação do seu negócio
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.items.map((benefit, index) => {
            const Icon = iconMap[benefit.title] || Zap;
            
            return (
              <Card 
                key={index}
                className="bg-neutral-800 border-neutral-700 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 group"
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
