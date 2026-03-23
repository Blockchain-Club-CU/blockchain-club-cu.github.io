'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { EVENTS } from '@/app/data/constants';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string | React.ReactNode;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAB, setShowFAB] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Wait for the Preloader animation to complete before showing FAB and Tooltip
    const timer = setTimeout(() => {
      setShowFAB(true);
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: (
        <div className="space-y-3">
          <p>
            🚀 <strong>Welcome to Blockchain Club CU!</strong> I am your BCCU Assistant. 
            I can help you explore our active events, get our contact info, or learn more about our mission! 
          </p>
          <a
            href="https://cuintranet.in/join-now"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center px-4 py-2 bg-[#10F480] text-[#1C1C1C] text-xs font-bold rounded hover:bg-[#0dd66f] transition-colors"
          >
            Register Now
          </a>
        </div>
      ),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (text: string) => {
    // Add user message immediately
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);

    // Process bot response asynchronously to feel like real chat
    setTimeout(() => {
      let botResponse: Message;
      const normalized = text.toLowerCase();

      // Quick helper for event dates
      const isEventActive = (e: any) => {
        const eventDate = new Date(e.date);
        if (isNaN(eventDate.getTime())) return true;
        eventDate.setHours(23, 59, 59, 999);
        return eventDate.getTime() >= Date.now();
      };

      // 1. Club Info Match
      if (
        normalized === 'what is this club?' ||
        normalized.includes('about') ||
        normalized.includes('who are you') ||
        (normalized.includes('what') && normalized.includes('club'))
      ) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Blockchain Club CU is a student-led community focused on learning Blockchain and Web3 from fundamentals to real-world use.',
        };
      } 
      // 2. Contact Info Match
      else if (
        normalized === 'contact info' ||
        normalized.includes('contact') ||
        normalized.includes('whatsapp') ||
        normalized.includes('email') ||
        normalized.includes('reach')
      ) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: (
            <span>
              You can reach us at blockchainclub@cuchd.in or join our{' '}
              <a 
                href="https://chat.whatsapp.com/CXY53ovXAas7bWBfwRnEsa?utm_source=website"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-700 dark:text-[#10F480] underline font-bold"
              >
                WhatsApp Community!
              </a>
            </span>
          ),
        };
      } 
      // 3. Event and Keyword Match
      else {
        // Find if the user typed specific words matching an event title
        const inputWords = normalized.split(/[\s,.-]+/).filter(w => w.length > 3 && w !== 'event' && w !== 'events' && w !== 'club');
        let matchedEvent = EVENTS.find((e) => {
          const titleLower = e.title.toLowerCase();
          return inputWords.some((w) => titleLower.includes(w));
        });

        if (matchedEvent) {
          // Specific event found!
          const active = isEventActive(matchedEvent);
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: (
              <div className="space-y-3">
                <p>{active ? "Here is the active event you asked about:" : "Here is the past event you asked about:"}</p>
                <div className="p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-white dark:bg-white/5 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900 dark:text-white font-mono text-sm leading-tight pr-2">{matchedEvent.title}</h4>
                    {!active && <span className="shrink-0 text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">Past</span>}
                  </div>
                  <p className="text-[11px] text-emerald-600 dark:text-[#10F480] font-mono mb-2">{matchedEvent.date}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{matchedEvent.description}</p>
                  {active && (
                    <a
                      href={matchedEvent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block w-full text-center px-4 py-2 bg-[#10F480] text-[#1C1C1C] text-xs font-bold rounded hover:bg-[#0dd66f] transition-colors"
                    >
                      Register for the Event
                    </a>
                  )}
                </div>
              </div>
            ),
          };
        } else if (normalized.includes('event')) {
          // General "event" query without specific titles
          const wantsPast = normalized.includes('past') || normalized.includes('previous');
          const filteredEvents = EVENTS.filter(e => isEventActive(e) === !wantsPast);

          if (filteredEvents.length > 0) {
            botResponse = {
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              text: (
                <div className="space-y-4">
                  <p>We found {filteredEvents.length} {wantsPast ? "past" : "active"} event(s):</p>
                  {filteredEvents.map((e) => (
                    <div key={e.id} className="p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-white dark:bg-white/5 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900 dark:text-white font-mono text-sm leading-tight pr-2">{e.title}</h4>
                        {wantsPast && <span className="shrink-0 text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">Past</span>}
                      </div>
                      <p className="text-[11px] text-emerald-600 dark:text-[#10F480] font-mono mb-2">{e.date}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{e.description}</p>
                      {!wantsPast && (
                        <a
                          href={e.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full text-center px-4 py-2 bg-[#10F480] text-[#1C1C1C] text-xs font-bold rounded hover:bg-[#0dd66f] transition-colors"
                        >
                          Register Here
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ),
            };
          } else {
            botResponse = {
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              text: wantsPast 
                ? "We don't have any past events listed currently." 
                : "We are currently brewing something special... No active events right now. Check back soon!",
            };
          }
        } else {
           // Completely unknown query
           const fallbacks = [
             <span>Oops! 😅 I didn't quite catch that. I'm trained to help you with our <strong>Active Events</strong>, <strong>Contact Info</strong>, or learning <strong>About the Club</strong>. What would you like to explore?</span>,
             <span>Hmm, that's outside my current knowledge base! 🤖 However, I can easily share our <strong>Contact Details</strong>, list our <strong>Upcoming Events</strong>, or tell you <strong>What the Club is all about</strong>. Just tap a button below!</span>,
             <span>My circuits are buzzing, but I'm still learning! ⚡ For now, I'm great at finding <strong>Event Details</strong>, giving you our <strong>WhatsApp Link</strong>, or explaining our <strong>Club's Mission</strong>. Which of those sounds good?</span>
           ];
           
           botResponse = {
             id: (Date.now() + 1).toString(),
             sender: 'bot',
             text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
           }
        }
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Fallback response for custom typed text
    handleOptionClick(inputValue.trim());
    setInputValue('');
  };

  return (
    <>
      {showFAB && (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
          {/* Greeting Tooltip */}
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute bottom-20 right-0 mb-2 px-4 py-3 bg-white dark:bg-[#1C1C1C] text-gray-900 dark:text-white text-sm font-bold font-mono rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 whitespace-nowrap flex items-center"
              >
                Hi! How can I help you? 👋
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  className="ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X size={14} />
                </button>
                <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white dark:bg-[#1C1C1C] border-b border-r border-gray-200 dark:border-white/10 rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 w-[320px] sm:w-[350px] h-[500px] bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#10F480]/20 flex items-center justify-center text-[#10F480]">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold font-mono text-sm text-gray-900 dark:text-white">BCCU Assistant</h3>
                    <p className="text-[10px] text-[#10F480] font-mono">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#10F480] text-[#1C1C1C] rounded-tr-sm'
                          : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-gray-100 rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Options */}
              <div className="p-3 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1C1C1C]">
                <div className="flex flex-wrap gap-2 mb-3">
                  {['What is this club?', 'Active Events', 'Contact Info'].map(
                    (opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="px-3 py-1.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-xs font-mono text-gray-600 dark:text-gray-300 hover:border-[#10F480] hover:text-emerald-500 dark:hover:text-[#10F480] transition-colors"
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="flex gap-2 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask something..."
                    className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#10F480] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-[#10F480] text-[#1C1C1C] flex items-center justify-center hover:bg-[#0dd66f] transition-colors shrink-0"
                  >
                    <Send size={16} className="-ml-1" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle FAB */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: [0, -10, 10, -10, 10, 0] }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false); // Hide tooltip once interacted
          }}
          className="w-14 h-14 bg-[#10F480] text-[#1C1C1C] rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(16,244,128,0.4)] flex items-center justify-center transition-shadow relative"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        </div>
      )}
    </>
  );
};
