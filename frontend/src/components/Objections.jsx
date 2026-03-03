import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { HelpCircle } from 'lucide-react';

const Objections = ({ data }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-600/20 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-neutral-800">Perguntas Frequentes</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Dúvidas Comuns
          </h2>
          
          <p className="text-lg text-neutral-600">
            Respostas claras para as principais questões sobre o Método M.D.S
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {data.map((objection, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-neutral-200 rounded-xl px-6 hover:border-amber-500 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-amber-600 font-semibold text-lg py-5">
                  {objection.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 pb-5 leading-relaxed">
                  {objection.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-neutral-600">
            Ainda tem dúvidas? <span className="text-amber-600 font-semibold">Agende seu diagnóstico gratuito</span> e tire todas as suas questões.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Objections;
