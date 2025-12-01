import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ArrowUp, Zap } from 'lucide-react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'MEGURIDへようこそ。\n製品の詳細やブランドフィロソフィーについて、AIコンシェルジュがお答えします。',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));
        
        const responseText = await getChatResponse(userMsg.text, history);

        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Minimal Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-500 ease-out border border-white/20 backdrop-blur-md ${
          isOpen 
            ? 'bg-concrete-900 text-white rotate-90 scale-90' 
            : 'bg-black text-white hover:scale-110 hover:bg-concrete-800'
        }`}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} strokeWidth={1.5} />}
      </button>

      {/* Elegant Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[350px] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-up border border-concrete-100">
          
          {/* Header */}
          <div className="bg-white p-6 border-b border-concrete-100 flex justify-between items-center sticky top-0 z-10">
            <div>
                <h3 className="font-serif font-bold text-concrete-900 tracking-wider text-lg">CONCIERGE</h3>
                <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-[10px] text-concrete-500 uppercase tracking-widest font-medium">Online • Gemini 3.0</p>
                </div>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fafafa]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 text-sm leading-7 tracking-wide shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-concrete-900 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-concrete-800 border border-concrete-100 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {msg.text.split('\n').map((line, i) => <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>)}
                </div>
                <span className="text-[10px] text-concrete-400 mt-2 px-1">
                    {msg.role === 'model' ? 'MEGURID AI' : 'YOU'}
                </span>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start">
                 <div className="bg-white border border-concrete-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center space-x-3">
                    <Zap size={14} className="animate-pulse text-concrete-400" />
                    <span className="text-xs text-concrete-500 tracking-wider">Generating response...</span>
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-concrete-100">
            <div className="relative">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="w-full bg-concrete-50 border border-concrete-200 rounded-full pl-6 pr-12 py-4 text-sm focus:outline-none focus:border-concrete-900 focus:ring-1 focus:ring-concrete-900 transition-all placeholder:text-concrete-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="absolute right-2 top-2 p-2 bg-concrete-900 text-white rounded-full hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ArrowUp size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-concrete-400 mt-3">
                AI can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;