import React from 'react';
import { Card, CardContent } from './ui/card';
import { Award, TrendingUp, Clock, Users } from 'lucide-react';

const SocialProof = ({ data }) => {
  const iconMap = [TrendingUp, Users, Clock, Award];

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-600/20 rounded-full mb-6">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-neutral-800">Resultados Comprovados</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            {data.title}
          </h2>
          
          <p className="text-lg text-neutral-600">
            {data.subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {data.stats.map((stat, index) => {
            const Icon = iconMap[index];
            
            return (
              <Card 
                key={index}
                className="border-2 border-neutral-200 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group text-center"
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Number */}
                  <div className="text-4xl font-bold text-neutral-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {stat.number}
                  </div>

                  {/* Label */}
                  <p className="text-neutral-600 text-sm">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 text-lg">
            Empresas de diversos segmentos: <span className="font-semibold text-neutral-900">Varejo, Serviços, E-commerce, Indústria</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
