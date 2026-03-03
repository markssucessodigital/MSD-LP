import React from 'react';
import { Card, CardContent } from './ui/card';
import { Store, ShoppingCart, CheckCircle2 } from 'lucide-react';

const iconMap = {
  'Store': Store,
  'ShoppingCart': ShoppingCart
};

const Applications = ({ data }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            {data.title}
          </h2>
          <p className="text-lg text-neutral-600">
            Aplicável para diferentes modelos de negócio digital
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.cases.map((appCase, index) => {
            const Icon = iconMap[appCase.icon] || Store;
            
            return (
              <Card 
                key={index}
                className="border-2 border-neutral-200 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl group"
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Type */}
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-amber-600 transition-colors">
                    {appCase.type}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {appCase.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {appCase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Applications;
