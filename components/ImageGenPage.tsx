import React, { useState } from 'react';
import { generateDesignImage } from '../services/geminiService';
import { ImageSize } from '../types';
import { Wand2, Download, Maximize2, RefreshCw, Cpu } from 'lucide-react';

const ImageGenPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Timer for technical feel
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loading) {
        interval = setInterval(() => setTimeElapsed(p => p + 0.1), 100);
    } else {
        setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generateDesignImage(prompt, size);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      // Optional: Error state handling UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-concrete-900 text-concrete-100 flex flex-col md:flex-row pt-20">
      
      {/* Sidebar Controls */}
      <div className="w-full md:w-[400px] border-r border-concrete-800 bg-concrete-950 p-8 flex flex-col z-20 shadow-2xl">
        <div className="mb-12">
            <div className="flex items-center gap-2 text-concrete-500 mb-2">
                <Cpu size={14} />
                <span className="text-[10px] tracking-[0.2em] uppercase">System: Gemini 3 Pro</span>
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-widest text-white">ATELIER</h2>
            <div className="w-12 h-[2px] bg-white mt-4"></div>
        </div>

        <div className="space-y-8 flex-grow">
            {/* Size Selector */}
            <div className="space-y-3">
                <label className="text-[10px] font-bold tracking-[0.2em] text-concrete-500 uppercase">Render Resolution</label>
                <div className="grid grid-cols-3 gap-2">
                    {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`py-2 text-xs border border-concrete-700 transition-all duration-300 ${
                                size === s 
                                ? 'bg-concrete-100 text-black border-white' 
                                : 'text-concrete-400 hover:border-concrete-500'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-3">
                <label className="text-[10px] font-bold tracking-[0.2em] text-concrete-500 uppercase">Design Prompt</label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the texture, lighting, and form of your concrete object..."
                    className="w-full h-40 bg-concrete-900 border border-concrete-700 p-4 text-sm text-concrete-200 focus:outline-none focus:border-concrete-400 transition-colors resize-none placeholder:text-concrete-700 font-mono leading-relaxed"
                />
            </div>
        </div>

        {/* Action Area */}
        <div className="mt-8 pt-8 border-t border-concrete-800">
            <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="group relative w-full py-4 bg-white text-black overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="absolute inset-0 w-full h-full bg-concrete-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.25em] uppercase">
                    {loading ? (
                        <>Processing <RefreshCw size={14} className="animate-spin" /></>
                    ) : (
                        <>Generate Design <Wand2 size={14} /></>
                    )}
                </span>
            </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-grow relative bg-concrete-900 flex items-center justify-center p-8 overflow-hidden">
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Display Container */}
        <div className="relative w-full max-w-2xl aspect-square border border-concrete-800 bg-black shadow-2xl flex items-center justify-center overflow-hidden">
            
            {loading && (
                <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center font-mono">
                    <div className="w-64 h-1 bg-concrete-800 mb-4 overflow-hidden">
                        <div className="h-full bg-white animate-[progress_2s_ease-in-out_infinite]"></div>
                    </div>
                    <p className="text-xs text-concrete-400 tracking-widest animate-pulse">
                        GENERATING TENSORS... {timeElapsed.toFixed(1)}s
                    </p>
                </div>
            )}

            {generatedImage ? (
                <div className="relative w-full h-full group">
                    <img 
                        src={generatedImage} 
                        alt="Generated Result" 
                        className="w-full h-full object-contain animate-in fade-in duration-1000"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                        <div className="font-mono text-[10px] text-concrete-400">
                            <p>MODEL: GEMINI-3-PRO</p>
                            <p>RES: {size}</p>
                        </div>
                        <a 
                            href={generatedImage} 
                            download="megurid-design.png"
                            className="p-3 bg-white text-black hover:bg-concrete-200 transition-colors"
                        >
                            <Download size={20} />
                        </a>
                    </div>
                </div>
            ) : (
                <div className="text-center opacity-20 select-none">
                    <Maximize2 size={64} className="mx-auto mb-4 text-concrete-500" strokeWidth={1} />
                    <p className="font-serif tracking-[0.3em] text-sm">WAITING FOR INPUT</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenPage;