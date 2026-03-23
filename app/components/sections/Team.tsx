'use client';

import { TEAM_MEMBERS } from '@/app/data/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { useState, useEffect, useCallback } from 'react';
import { SpotlightCard } from '../ui/SpotlightCard';

const CARDS_PER_PAGE = {
  sm: 1,
  md: 2,
  lg: 4,
};

export const Team = () => {
  const hasTeam = TEAM_MEMBERS && TEAM_MEMBERS.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(4);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive card count
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsVisible(1);
      else if (window.innerWidth < 1024) setCardsVisible(2);
      else setCardsVisible(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const total = TEAM_MEMBERS?.length ?? 0;
  const maxIndex = Math.max(0, total - cardsVisible);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  // Auto-advance
  useEffect(() => {
    if (!hasTeam || isPaused) return;
    const timer = setInterval(next, 2000); // 2 seconds per slide
    return () => clearInterval(timer);
  }, [hasTeam, isPaused, next]);

  const visibleMembers =
    TEAM_MEMBERS?.slice(currentIndex, currentIndex + cardsVisible) ?? [];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section
      id="team"
      className="py-24 bg-white dark:bg-[#1C1C1C] relative border-t border-gray-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="CORE TEAM" subtitle="Meet The Builders" />

        {!hasTeam ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-gray-300 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5"
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center mb-6 text-gray-400 dark:text-gray-500">
              <Users size={32} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-mono text-gray-900 dark:text-white mb-2">
              Team Information Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Our core team is currently being finalized. Stay tuned to meet the
              builders behind the Blockchain Club Chandigarh University!
            </p>
          </motion.div>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel viewport */}
            <div className="overflow-hidden px-2 py-4">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="flex gap-8 justify-center"
                >
                  {visibleMembers.map((member) => (
                    <SpotlightCard
                      key={member.id}
                      className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] flex-shrink-0 group text-center p-6 h-full flex flex-col"
                    >
                      {/* Avatar */}
                      <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-2 border-black/10 dark:border-white/10 group-hover:border-[#10F480] transition-all duration-300">
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://placehold.co/400x400/222/10F480?text=${member.name.charAt(0)}`;
                              }}
                            />
                          ) : (
                            <span className="text-5xl font-bold font-mono text-gray-400 dark:text-gray-500 group-hover:text-[#10F480] transition-colors">
                              {member.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                        {member.name}
                      </h3>
                      <p className="text-emerald-600 dark:text-[#10F480] text-sm font-mono mb-3">
                        {member.role}
                      </p>

                      {member.linkedin && (
                        <div className="flex justify-center gap-3">
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <Linkedin size={18} />
                          </a>
                        </div>
                      )}
                    </SpotlightCard>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-[#10F480] hover:text-[#10F480] transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'w-6 bg-[#10F480]'
                        : 'w-1.5 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-[#10F480] hover:text-[#10F480] transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Member count */}
            <p className="text-center text-xs font-mono text-gray-400 dark:text-gray-600 mt-4">
              {currentIndex + 1}–{Math.min(currentIndex + cardsVisible, total)}{' '}
              / {total}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
