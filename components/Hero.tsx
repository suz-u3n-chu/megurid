import React, { useEffect, useState } from 'react';
import { ViewState } from '../types';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
    onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-paper">
        
        {/* Background Grids */}
        <div className="absolute inset-0 z-0 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(to right, #f4f4f5 1px, transparent 1px), linear-gradient(to bottom, #f4f4f5 1px, transparent 1px)',
                 backgroundSize: '80px 80px'
             }}>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
            
            {/* Text Area */}
            <div className="md:col-span-7 flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-black"></div>
                    <span className="font-mono text-xs tracking-[0.3em] uppercase">Est. 2025 Tokyo</span>
                </div>
                
                <h1 className="text-7xl md:text-[10rem] font-serif font-black leading-[0.85] tracking-tighter mb-8 mix-blend-exclusion">
                    MEGU<br/>RID<span className="text-highlight">.</span>
                </h1>

                <p className="font-mono text-sm md:text-base text-gray-600 max-w-md leading-loose mb-12">
                    Where brutalist aesthetics meet generative intelligence. <br/>
                    Exploration of form, void, and code.
                </p>

                <button 
                    onClick={() => onNavigate(ViewState.GENERATE)}
                    className="w-fit px-10 py-5 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-highlight transition-colors duration-300 shadow-[8px_8px_0px_#e4e4e7] hover:shadow-[4px_4px_0px_#000]"
                >
                    Enter Laboratory
                </button>
            </div>

            {/* Visual Area */}
            <div className="md:col-span-5 h-[50vh] md:h-[70vh] relative mt-12 md:mt-0 group">
                <div className="absolute inset-0 border border-black transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1596489396328-57d472c95454?q=80&w=2670&auto=format&fit=crop"
                        alt="Concrete Minimal"
                        className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                        style={{ transform: `scale(${1 + scrollY * 0.0005})` }}
                    />
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 font-mono text-[10px] border border-black">
                    FIG. 001 // MAIN_STRUCT
                </div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-multiply">
            <span className="font-mono text-[10px] tracking-widest uppercase writing-vertical">Scroll</span>
            <ArrowDown className="animate-bounce" size={16} />
        </div>
    </section>
  );
};

export default Hero;