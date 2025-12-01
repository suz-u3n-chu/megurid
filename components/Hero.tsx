import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ViewState } from '../types';

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
    <>
        {/* Main Hero Section */}
        <section className="relative h-screen w-full overflow-hidden bg-concrete-100">
            
            {/* Parallax Background Image */}
            <div 
                className="absolute inset-0 z-0 will-change-transform"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
                <img 
                src="https://images.unsplash.com/photo-1487700160041-babef9c3cb55?q=80&w=2652&auto=format&fit=crop" 
                alt="Minimalist Concrete Architecture" 
                className="w-full h-[120%] object-cover object-center grayscale contrast-[1.1] brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <span className="text-white/80 text-xs md:text-sm tracking-[0.4em] uppercase mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    Est. 2025 Japan
                </span>
                
                <h1 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-[0.15em] mb-8 animate-fade-up leading-tight mix-blend-overlay opacity-90">
                    MEGURID
                </h1>
                
                <div className="w-[1px] h-24 bg-white/50 mb-8 animate-fade-up" style={{ animationDelay: '0.5s' }}></div>

                <p className="text-white/90 font-light text-sm md:text-lg tracking-[0.2em] max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: '0.8s' }}>
                    巡る季節、変わらぬ価値。<br />
                    静寂を形にするコンクリート・デザイン。
                </p>

                <div className="mt-16 flex flex-col md:flex-row gap-8 animate-fade-up" style={{ animationDelay: '1s' }}>
                    <button 
                        onClick={() => onNavigate(ViewState.GENERATE)}
                        className="group relative px-10 py-4 bg-white text-concrete-900 overflow-hidden transition-all hover:bg-concrete-200"
                    >
                        <span className="relative z-10 flex items-center gap-4 text-xs tracking-[0.25em] font-bold uppercase">
                            Open Atelier <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-0 w-full flex justify-center animate-bounce opacity-50">
                <ChevronDown className="text-white" size={32} strokeWidth={1} />
            </div>
        </section>

        {/* Philosophy Section (Integrated for flow) */}
        <section className="py-32 bg-concrete-50 relative overflow-hidden">
             {/* Decorative Background Text */}
             <div className="absolute top-20 right-0 text-[12rem] leading-none font-serif font-bold text-concrete-100 select-none pointer-events-none opacity-50 z-0">
                WABI<br/>SABI
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
                    
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-[3/4] overflow-hidden bg-concrete-200 shadow-2xl">
                             <img 
                                src="https://images.unsplash.com/photo-1599690628999-526b77cd5d5e?q=80&w=1674&auto=format&fit=crop" 
                                alt="Concrete Texture Detail" 
                                className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-[2s] ease-out"
                            />
                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4">
                                <p className="text-xs font-bold tracking-widest text-concrete-900">PHILOSOPHY NO.1</p>
                                <p className="text-[10px] tracking-wider text-concrete-500 mt-1">THE ART OF VOID</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 space-y-12">
                        <div>
                            <h2 className="text-sm font-bold text-concrete-400 tracking-[0.3em] mb-4 uppercase flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-concrete-400"></span>
                                Our Belief
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-concrete-900 leading-tight mb-8">
                                Beauty in the <br/>
                                <span className="italic font-elegant text-concrete-600">Imperfect.</span>
                            </h3>
                            <p className="text-concrete-600 leading-8 font-light tracking-wide text-justify">
                                私たちのブランドは、コンクリートという無機質な素材の中に、予期せぬ温かみと生命感を見出すことから始まりました。
                                日本の伝統的な美意識である「わびさび」—不完全さの中にある美—にインスパイアされ、私たちは一つ一つ手作業で製品を創り出しています。
                            </p>
                            <p className="text-concrete-600 leading-8 font-light tracking-wide text-justify mt-6">
                                ミニマリズムを追求し、静寂と調和を大切にする。それがMEGURIDの哲学です。
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 border-t border-concrete-200 pt-8">
                            <div>
                                <span className="block text-4xl font-serif text-concrete-300 mb-2">01</span>
                                <span className="text-xs tracking-widest uppercase text-concrete-800 font-bold">Materiality</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-serif text-concrete-300 mb-2">02</span>
                                <span className="text-xs tracking-widest uppercase text-concrete-800 font-bold">Serenity</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>
  );
};

export default Hero;