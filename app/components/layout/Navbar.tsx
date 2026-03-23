'use client';

import { motion } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import confetti from 'canvas-confetti';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY.current) {
        setHidden(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleMouse = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="bg-white/40 dark:bg-[#1C1C1C]/40 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/logo.png"
                alt="BCCU Logo"
                className="w-10 h-10 object-contain dark:brightness-10 0 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    'https://placehold.co/128x128/10F480/1C1C1C?text=B';
                }}
              />
              <span className="text-gray-900 dark:text-white font-mono font-bold text-lg tracking-tighter transition-colors duration-300">
                BLOCKCHAIN CLUB
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8 font-mono text-sm">
                {['About', 'Events', 'Gallery', 'Team', 'Contact'].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-[#10F480] transition-colors px-3 py-2 rounded-md uppercase tracking-wide"
                    >
                      {item}
                    </button>
                  ),
                )}
                <a
                  href="https://chat.whatsapp.com/CXY53ovXAas7bWBfwRnEsa?utm_source=website"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#10F480', '#ffffff', '#000000'],
                      });
                    }}
                    className="border border-[#10F480] text-emerald-600 dark:text-[#10F480] hover:bg-[#10F480] hover:text-[#1C1C1C] dark:hover:text-[#1C1C1C] px-4 py-2 rounded transition-all duration-300 font-bold"
                  >
                    Join Community
                  </motion.button>
                </a>

                <div className="ml-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button & Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white p-2 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/80 dark:bg-[#1C1C1C]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-mono">
              {['About', 'Events', 'Team', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#10F480] block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10F480', '#ffffff', '#000000'],
                  });
                  window.open(
                    'https://chat.whatsapp.com/CXY53ovXAas7bWBfwRnEsa?utm_source=website',
                    '_blank',
                  );
                }}
                className="text-[#10F480] block w-full text-left px-3 py-2 rounded-md text-base font-bold"
              >
                Join Community
              </motion.button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.div>
  );
};
