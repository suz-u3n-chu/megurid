import React from 'react';

const Philosophy: React.FC = () => {
  return (
    <section className="py-32 bg-paper border-b border-border">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Title Column */}
        <div className="md:col-span-4 sticky top-32 h-fit">
            <span className="font-mono text-xs text-highlight tracking-widest block mb-4">/// MANIFESTO</span>
            <h2 className="text-6xl md:text-8xl font-serif font-bold leading-none tracking-tight">
                Solid<br/>Form.
            </h2>
        </div>

        {/* Content Column */}
        <div className="md:col-span-8 space-y-24">
            
            <div className="border-t border-black pt-8">
                <h3 className="font-mono text-xl mb-6">[01] THE WEIGHT</h3>
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-800">
                    We believe in the honesty of material. Concrete is liquid stone; it captures the very moment of its creation. In a world of transient digital pixels, we crave the permanent, heavy silence of stone.
                </p>
            </div>

            <div className="border-t border-border pt-8">
                <h3 className="font-mono text-xl mb-6 text-gray-500">[02] THE ALGORITHM</h3>
                <p className="text-lg font-mono leading-relaxed text-gray-600 text-justify">
                    Yet, we do not reject the machine. We embrace Artificial Intelligence as the new chisel. Our designs are born from the collision of generative code and artisanal hand-pouring. The chaos of the algorithm frozen in the calm of cement.
                </p>
            </div>

            <div className="relative h-[60vh] w-full overflow-hidden grayscale">
                <img 
                    src="https://images.unsplash.com/photo-1518390937839-4bb42023a808?q=80&w=2574&auto=format&fit=crop" 
                    alt="Philosophy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 bg-white p-4 font-mono text-xs">
                    FIG. 01: RAW MATERIAL STUDY
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Philosophy;