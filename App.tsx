import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
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
    <div className="min-h-screen flex flex-col font-sans bg-concrete-50 text-concrete-900 selection:bg-black selection:text-white">
      <Header currentView={currentView} onNavigate={setCurrentView} />

      <main className="flex-grow">
        <div className={`transition-opacity duration-500 ${currentView === ViewState.HOME ? 'opacity-100' : 'hidden opacity-0'}`}>
             <Hero onNavigate={setCurrentView} />
             <ProductGrid />
        </div>

        {currentView === ViewState.GENERATE && (
          <div className="animate-fade-in">
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