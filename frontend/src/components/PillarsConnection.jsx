import React from 'react';
import { Card, CardContent } from './ui/card';
import { ArrowRight, Zap } from 'lucide-react';

const PillarsConnection = ({ data }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-600/20 rounded-full mb-6">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-neutral-800">Sistema Integrado</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            {data.title}
          </h2>
          
          <p className="text-lg text-neutral-600">
            {data.subtitle}
          </p>
        </div>

        {/* Flow */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {data.flow.map((item, index) => (
              <div key={index} className="relative">
                <Card className="border-2 border-neutral-200 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Step Number */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-amber-600 transition-colors">
                          {item.step}
                        </h3>
                        <p className="text-neutral-600">{item.action}</p>
                      </div>

                      {/* Arrow (except last item) */}
                      {index < data.flow.length - 1 && (
                        <div className="hidden md:block">
                          <ArrowRight className="w-6 h-6 text-amber-500 group-hover:translate-x-2 transition-transform" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Arrow */}
                {index < data.flow.length - 1 && (
                  <div className="flex justify-center my-2 md:hidden">
                    <ArrowRight className="w-6 h-6 text-amber-500 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Warning Box */}
          <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <p className="text-lg font-bold text-red-900">
              ⚠️ {data.warning}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillarsConnection;
