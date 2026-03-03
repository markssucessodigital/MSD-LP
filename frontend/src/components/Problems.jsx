import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Problems = ({ data }) => {
  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-600/30 rounded-full mb-6">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">Desafios Comuns</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Seu Negócio Está Enfrentando Esses Desafios?
          </h2>
          
          <p className="text-lg text-neutral-300">
            A maioria das pequenas e médias empresas enfrenta os mesmos obstáculos ao tentar crescer no digital. Reconhece algum deles?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {data.map((problem, index) => (
            <Card 
              key={index} 
              className="bg-neutral-800 border-neutral-700 hover:border-amber-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <AlertCircle className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-neutral-300">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-amber-500 font-semibold">
            Se você identificou pelo menos um desses desafios, o Método M.D.S foi feito para você.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problems;
