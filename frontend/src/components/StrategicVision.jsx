import React from 'react';
import { Card, CardContent } from './ui/card';
import { AlertTriangle, Target, CheckCircle2 } from 'lucide-react';

const StrategicVision = ({ data }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-600/30 rounded-full mb-6">
            <Target className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">Visão Estratégica</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {data.title}
          </h2>
          
          <p className="text-2xl text-amber-500 font-semibold mb-4">
            {data.subtitle}
          </p>
        </div>

        {/* Concept */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="bg-neutral-800/50 border-amber-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-500 mb-3">
                    {data.concept.title}
                  </h3>
                  <p className="text-lg text-neutral-200 leading-relaxed">
                    {data.concept.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Companies Fail */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {data.whyFail.title}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.whyFail.reasons.map((reason, index) => (
              <Card 
                key={index}
                className="bg-neutral-800/30 border-neutral-700 hover:border-red-500/50 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-neutral-300 group-hover:text-white transition-colors">
                      {reason}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Solution */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
                <h3 className="text-2xl font-bold text-white">A Solução</h3>
              </div>
              <p className="text-xl text-white font-medium leading-relaxed">
                {data.solution}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StrategicVision;
