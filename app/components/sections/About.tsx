'use client';

import { motion } from 'framer-motion';
import { ABOUT_CARDS } from '@/app/data/constants';
import { SectionHeader } from '../ui/SectionHeader';

export const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-[#1C1C1C] relative border-t border-gray-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="WHO WE ARE" subtitle="Our Mission" />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column: Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="font-light text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
              }}
              className="mb-6"
            >
              The <span className="font-semibold text-emerald-600 dark:text-[#10F480]">Blockchain Club Chandigarh University</span> is a student-driven ecosystem dedicated to demystifying decentralized technology.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
              }}
            >
              We believe in the power of Web3 to reshape the future. Our community acts as a bridge between curiosity and expertise, offering a platform where students can collaborate, code, and create the next generation of decentralized applications.
            </motion.p>
          </motion.div>

          {/* Right Column: Image/Logo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-64 md:h-full min-h-[300px] flex items-center justify-center"
          >
            {/* Glow Effect */}
            <div className="absolute w-64 h-64 bg-emerald-500/20 dark:bg-[#10F480]/10 rounded-full blur-[80px] pointer-events-none translate-z-0" />

            <img
              src="/logo.png"
              alt="About BCCU"
              className="relative z-10 w-64 h-64 object-contain drop-shadow-[0_0_30px_rgba(16,244,128,0.2)] opacity-90 hover:opacity-100 transition-opacity duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  'https://placehold.co/400x400/1C1C1C/10F480?text=BCCU';
              }}
            />
          </motion.div>
        </div>

        {/* Bottom Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-3 gap-6"
        >
          {ABOUT_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
              }}
              className="p-6 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 hover:border-emerald-500 dark:hover:border-[#10F480]/50 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <h3 className="text-xl font-mono font-bold text-emerald-700 dark:text-white mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
