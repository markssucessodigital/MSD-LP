import React, { useState, useEffect } from 'react';
import './App.css';
import { mockData } from './data/mock';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Method from './components/Method';
import Implementation from './components/Implementation';
import Benefits from './components/Benefits';
import Applications from './components/Applications';
import SocialProof from './components/SocialProof';
import Objections from './components/Objections';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
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
      
      {/* Method M.D.S Section */}
      <Method data={mockData.method} />
      
      {/* Implementation Section */}
      <Implementation data={mockData.implementation} />
      
      {/* Benefits Section */}
      <Benefits data={mockData.benefits} />
      
      {/* Applications Section */}
      <Applications data={mockData.applications} />
      
      {/* Social Proof Section */}
      <SocialProof data={mockData.socialProof} />
      
      {/* Objections/FAQ Section */}
      <Objections data={mockData.objections} />
      
      {/* Final CTA Section */}
      <FinalCTA data={mockData.finalCTA} onCTAClick={handleCTAClick} />
      
      {/* Footer */}
      <Footer data={mockData.footer} />
      
      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
