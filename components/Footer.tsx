import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black pt-24 pb-8 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-t border-black pt-12">
            <div className="md:col-span-2">
                 <h3 className="font-serif text-3xl mb-6">Stay informed.</h3>
                 <div className="flex border-b border-black pb-2 max-w-md">
                    <input type="email" placeholder="Email Address" className="w-full bg-transparent focus:outline-none font-mono text-sm placeholder:text-gray-400" />
                    <button className="font-mono text-xs font-bold hover:text-highlight transition-colors">SUBSCRIBE</button>
                 </div>
            </div>

            <div className="space-y-4 font-mono text-xs uppercase tracking-widest">
                <a href="#" className="block hover:underline">Instagram</a>
                <a href="#" className="block hover:underline">Twitter / X</a>
                <a href="#" className="block hover:underline">Pinterest</a>
            </div>

            <div className="space-y-4 font-mono text-xs uppercase tracking-widest">
                <a href="#" className="block hover:underline">Shipping & Returns</a>
                <a href="#" className="block hover:underline">Privacy Policy</a>
                <a href="#" className="block hover:underline">Terms of Service</a>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-border pt-8">
            <h1 className="text-[15vw] leading-[0.8] font-serif font-black tracking-tighter select-none opacity-10 md:opacity-100 transition-opacity">
                MEGURID
            </h1>
            
            <div className="font-mono text-[10px] text-gray-500 mb-2 md:mb-8 text-right">
                © 2025 MEGURID INC. TOKYO<br/>
                DESIGNED BY THE ARCHITECT
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;