import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ImageGenPage from './components/ImageGenPage';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  // Smooth scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-paper text-ink selection:bg-ink selection:text-paper">
      <Header currentView={currentView} onNavigate={setCurrentView} />

      <main className="flex-grow pt-20">
        <div className={`transition-opacity duration-700 ${currentView === ViewState.HOME ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
             <Hero onNavigate={setCurrentView} />
             <Philosophy />
             <ProductGrid />
        </div>

        {currentView === ViewState.GENERATE && (
          <div className="animate-fade-up">
             <ImageGenPage />
          </div>
        )}
      </main>

      <ChatWidget />
      {currentView !== ViewState.GENERATE && <Footer />}
    </div>
  );
}

export default App;