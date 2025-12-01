import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Activity } from 'lucide-react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'Greetings. I am The Architect. How may I assist in structuring your vision today?',
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
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 bg-white border-2 border-black flex items-center justify-center shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 ${isOpen ? 'bg-black text-white border-black' : 'text-black'}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-4 md:right-8 z-40 w-[95vw] md:w-[400px] h-[500px] bg-white border-2 border-black shadow-[12px_12px_0px_rgba(0,0,0,0.1)] flex flex-col animate-fade-up">
          
          {/* Header */}
          <div className="bg-subtle p-4 border-b-2 border-black flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider">The Architect</span>
            </div>
            <Activity size={14} className="text-gray-400" />
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-paper">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 text-sm font-mono border ${
                    msg.role === 'user' 
                      ? 'bg-black text-white border-black rounded-tr-none' 
                      : 'bg-white text-black border-gray-300 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                    {msg.role === 'model' ? 'System' : 'You'} • {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-1 text-gray-400 font-mono text-xs pl-2">
                 <span>Calculating structure</span>
                 <span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t-2 border-black">
            <div className="relative">
                <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about design or structure..."
                    className="w-full pl-4 pr-12 py-3 bg-subtle border border-gray-300 focus:border-black focus:outline-none font-mono text-sm transition-colors"
                    autoFocus
                />
                <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <Send size={16} />
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;