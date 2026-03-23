'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, CalendarOff, Bell } from 'lucide-react'; // Added CalendarOff and Bell
import { SectionHeader } from '../ui/SectionHeader';
import { EVENTS } from '@/app/data/constants';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { SpotlightCard } from '../ui/SpotlightCard';

export const Events = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter for events whose date is today or in the future
  const upcomingEvents = EVENTS.filter((event) => {
    // Attempt to parse the date. If failed, it might be an invalid format, keep it visible safely or hide.
    // 'February 26, 2026' parses correctly in JS Date.
    const eventDate = new Date(event.date);
    if (isNaN(eventDate.getTime())) return true; // fallback if date format is weird
    eventDate.setHours(23, 59, 59, 999); // end of the day
    return eventDate.getTime() >= Date.now();
  });
  
  const hasEvents = upcomingEvents.length > 0;

  return (
    <section
      id="events"
      className="py-24 bg-white dark:bg-[#1C1C1C] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="UPCOMING EVENTS" subtitle="Join The Action" />

        {!hasEvents ? (
          /* ---------------- EMPTY STATE ---------------- */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center py-20 px-6 border border-dashed border-black/10 dark:border-gray-200 dark:border-white/10 rounded-xl bg-white/5"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-gray-500">
              <CalendarOff size={32} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-mono text-gray-900 dark:text-white mb-2">
              New Events Coming Soon...
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
              We are currently brewing something special. Join our WhatsApp
              community to be the first to know when we launch!
            </p>
            <a
              href="https://chat.whatsapp.com/CXY53ovXAas7bWBfwRnEsa?utm_source=website"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                 confetti({
                   particleCount: 100,
                   spread: 70,
                   origin: { y: 0.6 },
                   colors: ['#10F480', '#ffffff', '#000000']
                 });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#10F480]/10 text-emerald-600 dark:text-[#10F480] border border-[#10F480]/20 rounded hover:bg-[#10F480] hover:text-black dark:hover:text-[#1C1C1C] transition-all duration-300 font-mono font-bold text-sm"
            >
              <Bell size={16} />
              Join Community
            </a>
          </motion.div>
        ) : (
          /* ---------------- EVENTS GRID ---------------- */
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: idx * 0.1 }}
              >
                <SpotlightCard className="h-full">
                  <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10F480]/10 text-emerald-600 dark:text-[#10F480] text-xs font-mono">
                      <Calendar size={12} />
                      {event.date}
                    </div>
                    <span className="text-xs text-gray-500 font-mono border border-gray-700 px-2 py-1 rounded">
                      {event.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-mono group-hover:text-emerald-600 dark:text-[#10F480] dark:group-hover:text-[#10F480] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex justify-center relative h-60 w-full mb-8">
                    <Image
                      src={
                        theme === 'dark' && event.imageDarkURL
                          ? event.imageDarkURL
                          : event.imageURL
                      }
                      alt={event.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 font-mono mb-6">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {event.location}
                    </span>
                  </div>

                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 border border-gray-600 dark:border-white/20 text-gray-900 dark:text-white font-mono text-sm hover:bg-[#10F480] hover:text-black dark:hover:text-[#1C1C1C] hover:border-[#10F480] transition-colors duration-300 rounded">
                      REGISTER NOW
                    </motion.button>
                  </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
