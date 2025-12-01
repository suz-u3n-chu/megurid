import React, { useState } from 'react';
import { generateDesignImage } from '../services/geminiService';
import { ImageSize } from '../types';
import { RefreshCw, Download, Layers, Box, Cpu } from 'lucide-react';

const ImageGenPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await generateDesignImage(prompt, size);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-black pb-6">
            <div>
                <span className="font-mono text-xs text-highlight tracking-widest uppercase mb-2 block">/// Beta Version 2.0</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold">Design Laboratory</h2>
            </div>
            <div className="font-mono text-xs text-right mt-4 md:mt-0 text-gray-500">
                AI-ASSISTED PROTOTYPING<br/>
                MODEL: GEMINI-3-PRO
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Controls */}
            <div className="w-full lg:w-1/3 space-y-8">
                
                {/* Panel 1: Settings */}
                <div className="bg-subtle border border-border p-6 relative">
                    <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 font-mono text-[10px] uppercase">
                        01. Configuration
                    </div>
                    
                    <div className="mt-6 space-y-6">
                        <div>
                            <label className="font-mono text-xs font-bold block mb-3 uppercase">Resolution</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`py-3 font-mono text-xs border transition-all ${
                                            size === s 
                                            ? 'border-black bg-black text-white shadow-[4px_4px_0px_#ccc]' 
                                            : 'border-gray-300 bg-white hover:border-black'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel 2: Input */}
                <div className="bg-white border border-black p-6 relative shadow-[8px_8px_0px_#e4e4e7]">
                    <div className="absolute top-0 left-0 bg-highlight text-white px-2 py-1 font-mono text-[10px] uppercase">
                        02. Prompt Engineering
                    </div>
                    
                    <div className="mt-6">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the form, material, and lighting..."
                            className="w-full h-48 bg-subtle border border-gray-300 p-4 font-mono text-sm focus:outline-none focus:border-black resize-none transition-colors"
                        />
                        <div className="mt-4 flex justify-between items-center">
                            <span className="font-mono text-[10px] text-gray-400">TOKENS: {prompt.length}</span>
                            <button
                                onClick={handleGenerate}
                                disabled={loading || !prompt}
                                className="px-8 py-3 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-highlight transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? <RefreshCw className="animate-spin" size={14} /> : <Cpu size={14} />}
                                {loading ? 'Processing' : 'Generate'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Log */}
                <div className="font-mono text-[10px] text-gray-400 border-t border-dashed border-gray-300 pt-4">
                    > SYSTEM READY<br/>
                    > WAITING FOR INPUT...
                </div>
            </div>

            {/* Viewport */}
            <div className="w-full lg:w-2/3">
                <div className="w-full aspect-square bg-white border border-border relative flex items-center justify-center overflow-hidden">
                    {/* Grid Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-20" 
                        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    {generatedImage ? (
                        <div className="relative w-full h-full p-12 animate-fade-up">
                            <img 
                                src={generatedImage} 
                                alt="Generated Blueprint" 
                                className="w-full h-full object-contain drop-shadow-xl"
                            />
                            
                            <div className="absolute bottom-6 right-6 flex gap-2">
                                <a 
                                    href={generatedImage} 
                                    download="megurid-design.png"
                                    className="p-3 bg-white border border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.1)]"
                                >
                                    <Download size={20} />
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-gray-300">
                            <Box size={64} strokeWidth={1} />
                            <span className="font-mono text-sm mt-4 tracking-widest">NO ARTIFACT RENDERED</span>
                        </div>
                    )}

                    {/* Technical Overlays */}
                    <div className="absolute top-4 left-4 font-mono text-[10px] flex items-center gap-2 text-gray-500">
                        <Layers size={12} />
                        LAYER: RENDER_PASS_01
                    </div>
                    <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-500">
                        SCALE 1:1
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ImageGenPage;