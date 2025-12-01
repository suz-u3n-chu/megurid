import React, { useState } from 'react';
import { ViewState } from '../types';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-paper/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="cursor-pointer group flex items-center gap-3"
            onClick={() => onNavigate(ViewState.HOME)}
          >
            <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-serif font-bold text-xl group-hover:rotate-180 transition-transform duration-500">
                M
            </div>
            <h1 className="text-xl font-mono font-bold tracking-tighter uppercase hidden md:block">
              MEGURID® <span className="text-[10px] font-normal text-gray-500 ml-2">DESIGN_LAB</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center h-full">
            <button 
                onClick={() => onNavigate(ViewState.HOME)}
                className={`h-full px-8 border-l border-border font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors flex items-center gap-2 ${currentView === ViewState.HOME ? 'bg-black text-white' : 'text-black'}`}
            >
                [01] Gallery
            </button>
            <button 
                onClick={() => onNavigate(ViewState.GENERATE)}
                className={`h-full px-8 border-l border-r border-border font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors flex items-center gap-2 ${currentView === ViewState.GENERATE ? 'bg-black text-white' : 'text-black'}`}
            >
                [02] Laboratory
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6 font-mono text-xs">
            <button className="hidden md:block hover:underline underline-offset-4 uppercase tracking-widest">
              Account
            </button>
            <button className="relative hover:text-highlight transition-colors flex items-center gap-2">
              <ShoppingBag size={18} />
              <span className="hidden md:inline uppercase tracking-widest">Cart(0)</span>
            </button>
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-paper flex flex-col p-6 animate-fade-up">
             <div className="flex justify-between items-center mb-12">
                <span className="font-mono text-xs text-gray-500">MENU_OVERLAY</span>
                <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
             </div>

            <nav className="flex flex-col gap-6">
                <button 
                    onClick={() => { onNavigate(ViewState.HOME); setMobileMenuOpen(false); }}
                    className="text-5xl font-serif text-left hover:italic transition-all border-b border-gray-100 pb-4"
                >
                    Gallery
                </button>
                <button 
                    onClick={() => { onNavigate(ViewState.GENERATE); setMobileMenuOpen(false); }}
                    className="text-5xl font-serif text-left hover:italic transition-all border-b border-gray-100 pb-4"
                >
                    Laboratory
                </button>
            </nav>
            
            <div className="mt-auto font-mono text-[10px] text-gray-400">
                MEGURID SYSTEM V4.0<br/>
                ALL SYSTEMS NOMINAL
            </div>
        </div>
      )}
    </>
  );
};

export default Header;