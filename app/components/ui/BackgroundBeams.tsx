'use client';

import { motion } from 'framer-motion';

export const BackgroundBeams = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#1C1C1C] pointer-events-none">
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#10F480] opacity-[0.05] blur-[120px] rounded-full"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 80, -30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#0eb260] opacity-[0.04] blur-[140px] rounded-full"
        animate={{
          x: [0, -70, 40, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};
