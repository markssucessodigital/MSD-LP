import React, { useState, useEffect } from 'react';
import './App.css';
import { mockData } from './data/mock';
import Hero from './components/Hero';
import Problems from './components/Problems';
import CTASection from './components/CTASection';
import StrategicVision from './components/StrategicVision';
import Method from './components/Method';
import PillarsConnection from './components/PillarsConnection';
import Implementation from './components/Implementation';
import Benefits from './components/Benefits';
import Applications from './components/Applications';
import Differential from './components/Differential';
import SocialProof from './components/SocialProof';
import Objections from './components/Objections';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import StickyFloatingCTA from './components/StickyFloatingCTA';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Mock analytics tracking
    console.log('📊 Google Analytics initialized (MOCK)');
    console.log('📊 Facebook Pixel initialized (MOCK)');
  }, []);

  const handleCTAClick = () => {
    // WhatsApp link with pre-filled message
    const whatsappNumber = mockData.whatsapp.number;
    const whatsappMessage = encodeURIComponent(mockData.whatsapp.message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Mock tracking event
    console.log('🎯 CTA Click tracked (MOCK)');
    
    // Show toast notification
    toast.success('Redirecionando para WhatsApp...', {
      description: 'Você será direcionado para iniciar a conversa.',
      duration: 2000,
    });
    
    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 500);
  };

  return (
    <div className={`App ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <Hero data={mockData.hero} onCTAClick={handleCTAClick} />
      
      {/* Problems Section */}
      <Problems data={mockData.problems} />
      
      {/* CTA 1: Após Problems - Momento de Dor */}
      <CTASection
        title="Identificou Seu Negócio Nesses Desafios?"
        subtitle="Não deixe esses problemas travarem seu crescimento. Agende um diagnóstico estratégico gratuito."
        ctaText="Quero Resolver Esses Problemas"
        variant="default"
        onCTAClick={handleCTAClick}
      />
      
      {/* Strategic Vision Section */}
      <StrategicVision data={mockData.strategicVision} />
      
      {/* Method M.D.S Section */}
      <Method data={mockData.method} />
      
      {/* CTA 2: Após Method - Entendeu a Solução */}
      <CTASection
        title="Pronto Para Implementar o Método M.D.S?"
        subtitle="Estruture seu negócio digital em 30 dias com metodologia comprovada."
        ctaText="Quero Implementar o Método M.D.S"
        variant="light"
        onCTAClick={handleCTAClick}
      />
      
      {/* Pillars Connection Section */}
      <PillarsConnection data={mockData.pillarsConnection} />
      
      {/* Implementation Section */}
      <Implementation data={mockData.implementation} />
      
      {/* Benefits Section */}
      <Benefits data={mockData.benefits} />
      
      {/* Applications Section */}
      <Applications data={mockData.applications} />
      
      {/* Differential Section */}
      <Differential data={mockData.differential} />
      
      {/* CTA 3: Após Differential - Percebeu Valor Único */}
      <CTASection
        title="Escolha Engenharia, Não Agência Comum"
        subtitle="Trabalhe com quem estrutura crescimento de verdade, não só executa tarefas."
        ctaText="Quero Engenharia de Crescimento"
        variant="default"
        onCTAClick={handleCTAClick}
      />
      
      {/* Social Proof Section */}
      <SocialProof data={mockData.socialProof} />
      
      {/* Objections/FAQ Section */}
      <Objections data={mockData.objections} />
      
      {/* Final CTA Section */}
      <FinalCTA data={mockData.finalCTA} onCTAClick={handleCTAClick} />
      
      {/* Footer */}
      <Footer data={mockData.footer} />
      
      {/* Sticky Floating CTA */}
      <StickyFloatingCTA onCTAClick={handleCTAClick} />
      
      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
