import React from 'react';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'UTSUWA (L)',
    price: 3300,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1760&auto=format&fit=crop',
    description: 'A circle tray embodying the void.'
  },
  {
    id: '2',
    name: 'KUBOMI',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1740&auto=format&fit=crop',
    description: 'Ashtray designed to catch light.'
  },
  {
    id: '3',
    name: 'FUNE',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1740&auto=format&fit=crop',
    description: 'Oval tray for life\'s artifacts.'
  },
  {
      id: '4',
      name: 'ISHI',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1610&auto=format&fit=crop',
      description: 'Solid block paperweight.'
  }
];

const ProductGrid: React.FC = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-concrete-200 pb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-concrete-900 mb-2">Collection</h2>
            <p className="text-xs tracking-[0.2em] text-concrete-500 uppercase">Handcrafted in Tokyo</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">
            View All Items <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, index) => (
            <div 
                key={product.id} 
                className="group cursor-pointer flex flex-col"
                style={{ marginTop: index % 2 !== 0 ? '4rem' : '0' }} // Staggered grid effect
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-concrete-100 mb-6">
                <div className="absolute inset-0 bg-concrete-200 animate-pulse"></div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="relative z-10 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay Action */}
                <div className="absolute inset-0 z-20 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-2 text-[10px] tracking-widest uppercase font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Details
                    </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center border-b border-transparent group-hover:border-concrete-200 pb-2 transition-colors duration-500">
                    <h3 className="text-lg font-serif tracking-wider text-concrete-900">
                    {product.name}
                    </h3>
                    <span className="text-xs tracking-widest text-concrete-500 group-hover:text-black transition-colors">
                    ¥{product.price.toLocaleString()}
                    </span>
                </div>
                <p className="text-[10px] text-concrete-400 tracking-wide line-clamp-1">
                    {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center md:hidden">
            <button className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase border-b border-black pb-1">
                View All Items <ArrowUpRight size={14} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default ProductGrid;