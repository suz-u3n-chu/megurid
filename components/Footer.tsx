import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-concrete-900 text-concrete-300 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
                <h3 className="text-3xl font-serif font-bold tracking-[0.2em] text-white mb-6">MEGURID</h3>
                <p className="text-xs leading-6 tracking-wide text-concrete-500">
                    Tokyo-based design studio crafting minimal objects from concrete. Exploring the intersection of traditional Wabi-Sabi and modern intelligence.
                </p>
            </div>
            
            <div className="col-span-1 md:col-start-3">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Explore</h4>
                <ul className="space-y-4 text-xs tracking-widest uppercase">
                    <li><a href="#" className="hover:text-white transition-colors">Collection</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Atelier AI</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Philosophy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
                </ul>
            </div>

            <div className="col-span-1">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Support</h4>
                <ul className="space-y-4 text-xs tracking-widest uppercase">
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
            </div>
        </div>

        <div className="border-t border-concrete-800 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-concrete-600 uppercase">
          <p>© 2025 MEGURID. ALL RIGHTS RESERVED.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <span>Instagram</span>
            <span>Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;