import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { mockData } from './data/mock';
import SEO from './components/SEO';
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
import LeadFormModal from './components/LeadFormModal';
import AdminDashboard from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { initGA, initFBPixel, trackCTAClick, initScrollTracking, trackTimeOnPage } from './utils/analytics';

function LandingPage({ onCTAClick }) {
  return (
    <>
      <SEO />
      <Hero data={mockData.hero} onCTAClick={() => onCTAClick('hero')} />
      <Problems data={mockData.problems} />
      <CTASection
        title="Identificou Seu Negócio Nesses Desafios?"
        subtitle="Não deixe esses problemas travarem seu crescimento. Agende um diagnóstico estratégico gratuito."
        ctaText="Quero Resolver Esses Problemas"
        variant="default"
        onCTAClick={() => onCTAClick('after_problems')}
      />
      <StrategicVision data={mockData.strategicVision} />
      <Method data={mockData.method} />
      <CTASection
        title="Pronto Para Implementar o Método M.D.S?"
        subtitle="Estruture seu negócio digital em 30 dias com metodologia comprovada."
        ctaText="Quero Implementar o Método M.D.S"
        variant="light"
        onCTAClick={() => onCTAClick('after_method')}
      />
      <PillarsConnection data={mockData.pillarsConnection} />
      <Implementation data={mockData.implementation} />
      <Benefits data={mockData.benefits} />
      <Applications data={mockData.applications} />
      <Differential data={mockData.differential} />
      <CTASection
        title="Escolha Engenharia, Não Agência Comum"
        subtitle="Trabalhe com quem estrutura crescimento de verdade, não só executa tarefas."
        ctaText="Quero Engenharia de Crescimento"
        variant="default"
        onCTAClick={() => onCTAClick('after_differential')}
      />
      <SocialProof data={mockData.socialProof} />
      <Objections data={mockData.objections} />
      <FinalCTA data={mockData.finalCTA} onCTAClick={() => onCTAClick('final_cta')} />
      <Footer data={mockData.footer} />
    </>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [ctaSource, setCtaSource] = useState('');

  useEffect(() => {
    setIsLoaded(true);
    
    // Initialize analytics
    initGA();
    initFBPixel();
    
    // Initialize tracking
    const cleanupScroll = initScrollTracking();
    const cleanupTime = trackTimeOnPage();
    
    console.log('📊 Analytics initialized');
    
    return () => {
      cleanupScroll();
      cleanupTime();
    };
  }, []);

  const handleCTAClick = (source = 'generic') => {
    // Track CTA click
    trackCTAClick(`CTA: ${source}`, source);
    
    setCtaSource(source);
    setShowLeadForm(true);
    
    // Show toast notification
    toast.info('Preencha o formulário', {
      description: 'Entraremos em contato em até 24h.',
      duration: 3000,
    });
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className={`App ${isLoaded ? 'loaded' : ''}`}>
          <Routes>
            <Route path="/" element={<LandingPage onCTAClick={handleCTAClick} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          
          {/* Sticky Floating CTA - Only on landing page */}
          {window.location.pathname === '/' && (
            <StickyFloatingCTA onCTAClick={() => handleCTAClick('sticky_floating')} />
          )}
          
          {/* Lead Form Modal */}
          <LeadFormModal
            isOpen={showLeadForm}
            onClose={() => setShowLeadForm(false)}
            source={ctaSource}
          />
          
          {/* Toast Notifications */}
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
