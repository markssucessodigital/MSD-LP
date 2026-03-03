import React from 'react';
import { Card, CardContent } from './ui/card';
import { X, CheckCircle2, Rocket } from 'lucide-react';

const Differential = ({ data }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-600/30 rounded-full mb-6">
            <Rocket className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">Posicionamento</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {data.title}
          </h2>
          
          <p className="text-xl text-neutral-300">
            {data.subtitle}
          </p>
        </div>

        {/* We Are NOT */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-red-400">
            O Que NÃO Somos:
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {data.weAreNot.map((item, index) => (
              <Card 
                key={index}
                className="bg-neutral-800/50 border-red-500/30 hover:border-red-500 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* We ARE */}
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 border-0 shadow-2xl">
            <CardContent className="p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {data.weAre.title}
                </h3>
                <p className="text-xl text-white/90 mb-6 leading-relaxed">
                  {data.weAre.description}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-lg text-white font-semibold text-center leading-relaxed">
                  "{data.weAre.manifesto}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Note */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-neutral-400 text-lg">
            Enquanto outros focam em <span className="line-through text-neutral-600">tática</span>, 
            nós focamos em <span className="text-amber-500 font-bold">arquitetura</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Differential;
