import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, Compass } from 'lucide-react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hello explorer! I am your WanderLuxe AI Travel Concierge. Need help picking a destination, estimating trip costs, or finding honeymoon packages?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "🏝️ Best beach resorts in Bali?",
    "⛩️ How many days needed for Kyoto?",
    "💑 Top honeymoon packages under $3,000?",
    "🏔️ Best time to visit Swiss Alps?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate AI response
    setTimeout(() => {
      let reply = "That sounds like an amazing journey! For detailed itineraries and VIP perks, our travel specialists recommend exploring our Bali or Kyoto packages. Can I help you filter by budget or travel date?";
      const lower = query.toLowerCase();

      if (lower.includes('bali') || lower.includes('beach') || lower.includes('island')) {
        reply = "🏝️ For Bali, we highly recommend our 'Bali Ultimate Tropical Escape' (7 Days / $1,450). It includes private pool villas in Ubud, Seminyak sunset beach clubs, and snorkeling in Nusa Penida!";
      } else if (lower.includes('kyoto') || lower.includes('japan') || lower.includes('tokyo') || lower.includes('shrine')) {
        reply = "⛩️ Our 'Imperial Kyoto & Tokyo Heritage Tour' (8 Days / $2,200) is a guest favorite! It features 1st class JR Shinkansen bullet train passes, private tea house ceremonies in Gion, and Mt. Fuji excursions.";
      } else if (lower.includes('honeymoon') || lower.includes('couple') || lower.includes('santorini') || lower.includes('greece')) {
        reply = "💑 For an unforgettable romantic retreat, look into our 'Santorini Sunset Honeymoon Dream' ($2,650) with cliffside cave suites, private plunge pools, and a sunset catamaran cruise with seafood dinner!";
      } else if (lower.includes('swiss') || lower.includes('alps') || lower.includes('snow') || lower.includes('mountain')) {
        reply = "🏔️ The 'Swiss Alps Alpine Express & Glacier Tour' ($2,890) features panoramic train rides on the Glacier Express, Matterhorn views from Gornergrat, and gourmet cheese fondue dining!";
      } else if (lower.includes('cost') || lower.includes('price') || lower.includes('budget') || lower.includes('how much')) {
        reply = "💰 Our packages range from $1,200 for 7-day tropical getaways up to $3,200 for ultra-luxury overwater bungalows in the Maldives. You can use our top search bar to filter directly by your price range!";
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="gradient-btn !p-4 !rounded-full shadow-2xl flex items-center justify-center animate-bounce hover:scale-110 transition-transform group"
          title="Chat with AI Travel Assistant"
        >
          <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] rounded-3xl glass !bg-white/95 dark:!bg-slate-900/95 border border-white/60 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-300 animate-spin-slow" />
              </div>
              <div>
                <h4 className="text-sm font-montserrat font-bold flex items-center gap-1">
                  <span>WanderLuxe AI Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-[10px] text-white/80">Online • Instant Travel Advice</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/20 transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none font-medium'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700/60'
                }`}>
                  <p>{msg.text}</p>
                  <span className={`text-[9px] block mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 text-[10px] font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:border-primary hover:text-primary transition-all shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about trips, costs..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary px-3.5 py-2 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
