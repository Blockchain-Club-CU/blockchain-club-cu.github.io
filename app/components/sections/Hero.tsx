'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { InteractiveGrid } from '../ui/InteractiveGrid';
import { ScrambleText } from '../ui/ScrambleText';

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <InteractiveGrid />

        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-[#1C1C1C] dark:via-transparent dark:to-[#1C1C1C] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#10F480]/10 rounded-full blur-[100px] pointer-events-none translate-z-0"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full z-10">
            <motion.h1 
              whileHover={{ scale: 1.02, rotate: [-1, 1, -1, 0] }}
              transition={{ duration: 0.3 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 dark:text-white font-mono leading-tight flex flex-col items-center lg:items-start"
            >
              <span className="block mb-2 lg:mb-4">
                <ScrambleText text="BLOCKCHAIN" delay={100} speed={1} />
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10F480] to-teal-400 block">
                <ScrambleText text="CLUB CU" delay={600} speed={1} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ y: -5 }}
              transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 300 }}
              className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light px-4 lg:px-0 cursor-default"
            >
              <ScrambleText
                text="A student-led community focused on learning Blockchain and Web3 from fundamentals to real-world use."
                delay={1000}
                speed={3}
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8 w-full"
            >
              <a
                href="https://cuintranet.in/join-now"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="group relative px-8 py-4 bg-[#10F480] text-[#1C1C1C] font-bold font-mono rounded hover:bg-[#0dd66f] transition-all duration-300 overflow-hidden w-full sm:w-auto text-center shadow-[0_0_20px_rgba(16,244,128,0.3)] hover:shadow-[0_0_30px_rgba(16,244,128,0.5)]">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    REGISTER NOW
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12"></div>
                </button>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Animated Blockchain Cube */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="w-full h-[350px] sm:h-[450px] lg:h-[600px] flex items-center justify-center relative mt-8 lg:mt-0 right-0 z-0 pointer-events-none"
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="relative w-[200px] h-[200px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full border border-[#10F480]/40 bg-[#10F480]/5 backdrop-blur-md shadow-[0_0_30px_rgba(16,244,128,0.15)] flex items-center justify-center"
                  style={{
                    transform: `
                      ${index === 0 ? 'translateZ(100px)' : ''}
                      ${index === 1 ? 'rotateY(180deg) translateZ(100px)' : ''}
                      ${index === 2 ? 'rotateY(90deg) translateZ(100px)' : ''}
                      ${index === 3 ? 'rotateY(-90deg) translateZ(100px)' : ''}
                      ${index === 4 ? 'rotateX(90deg) translateZ(100px)' : ''}
                      ${index === 5 ? 'rotateX(-90deg) translateZ(100px)' : ''}
                    `
                  }}
                >
                  <div className="w-1/2 h-1/2 border border-[#10F480]/30 rounded-full flex items-center justify-center">
                     <div className="w-2 h-2 bg-[#10F480]/60 rounded-full shadow-[0_0_10px_rgba(16,244,128,1)]" />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
