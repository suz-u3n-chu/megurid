import React from 'react';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

const PRODUCTS: Product[] = [
  {
    id: 'A-001',
    name: 'UTSUWA / VOID',
    price: 3300,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1760&auto=format&fit=crop',
    description: 'A circular tray designed to capture light and shadow.'
  },
  {
    id: 'A-002',
    name: 'KUBOMI / ASH',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1740&auto=format&fit=crop',
    description: 'Minimalist receptacle. Industrial finish.'
  },
  {
    id: 'B-001',
    name: 'FUNE / VESSEL',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1740&auto=format&fit=crop',
    description: 'Elongated form inspired by ancient vessels.'
  },
  {
      id: 'C-003',
      name: 'ISHI / BLOCK',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1610&auto=format&fit=crop',
      description: 'Solid concrete block. Pure weight.'
  }
];

const ProductGrid: React.FC = () => {
  return (
    <section className="bg-paper py-32 border-b border-border">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex justify-between items-end mb-20">
            <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
                Collection.
            </h2>
            <span className="font-mono text-xs hidden md:block text-right">
                INDEX OF ARTIFACTS<br/>
                VOL. 1.0 — 2025
            </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
                 <span className="font-mono text-xs font-bold">{product.id}</span>
                 <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" size={18} />
              </div>

              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-subtle mb-6">
                 <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                 />
                 
                 {/* Hover Overlay Info */}
                 <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-center items-center text-center">
                    <p className="font-serif text-2xl italic mb-4">{product.description}</p>
                    <div className="font-mono text-[10px] space-y-1 text-gray-500 uppercase">
                        <p>Material: Reinforced Concrete</p>
                        <p>Weight: 1.2kg (Approx)</p>
                        <p>Origin: Tokyo, JP</p>
                    </div>
                    <button className="mt-8 px-6 py-2 bg-black text-white font-mono text-xs uppercase hover:bg-highlight transition-colors">
                        Add to Cart
                    </button>
                 </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-baseline">
                <h3 className="text-2xl font-serif">{product.name}</h3>
                <span className="font-mono text-sm">¥{product.price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;