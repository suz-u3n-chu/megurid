import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (view: ViewState) => `
    relative text-xs tracking-[0.25em] uppercase transition-all duration-300
    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] 
    after:bottom-[-4px] after:left-0 after:bg-current after:origin-bottom-right 
    after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left
    ${currentView === view ? 'text-black font-medium after:scale-x-100 after:origin-bottom-left' : 'text-concrete-600 hover:text-black'}
  `;

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md py-4 border-b border-concrete-200' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-8 md:px-12 flex items-center justify-between">
          
          {/* Logo Area */}
          <div 
            className="z-50 cursor-pointer group"
            onClick={() => onNavigate(ViewState.HOME)}
          >
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-[0.2em] text-concrete-900 group-hover:opacity-70 transition-opacity">
              MEGURID
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <button className={navItemClass(ViewState.HOME)} onClick={() => onNavigate(ViewState.HOME)}>
              Collection
            </button>
            <button className={navItemClass(ViewState.GENERATE)} onClick={() => onNavigate(ViewState.GENERATE)}>
              Atelier AI
            </button>
            <button className="text-xs tracking-[0.25em] uppercase text-concrete-400 cursor-not-allowed">
              Journal
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-8 z-50">
            <button className="hidden md:block text-concrete-900 hover:text-concrete-600 transition-colors">
              <span className="text-[10px] tracking-widest font-bold">LOGIN</span>
            </button>
            <button className="text-concrete-900 hover:text-concrete-600 transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-concrete-900 rounded-full"></span>
            </button>
            <button 
              className="md:hidden text-concrete-900"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-concrete-50 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-8 right-8">
            <button onClick={() => setMobileMenuOpen(false)}>
                <X size={32} className="text-concrete-900" strokeWidth={1} />
            </button>
        </div>
        <div className="h-full flex flex-col justify-center items-center space-y-8">
            <button 
                className="text-2xl font-serif tracking-[0.2em] text-concrete-900 hover:opacity-50 transition-opacity"
                onClick={() => { onNavigate(ViewState.HOME); setMobileMenuOpen(false); }}
            >
                COLLECTION
            </button>
            <button 
                className="text-2xl font-serif tracking-[0.2em] text-concrete-900 hover:opacity-50 transition-opacity"
                onClick={() => { onNavigate(ViewState.GENERATE); setMobileMenuOpen(false); }}
            >
                ATELIER AI
            </button>
             <div className="w-12 h-[1px] bg-concrete-300 my-8"></div>
             <p className="text-xs tracking-widest text-concrete-500">CONCRETE & INTELLIGENCE</p>
        </div>
      </div>
    </>
  );
};

export default Header;