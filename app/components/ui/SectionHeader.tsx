import { motion } from 'framer-motion';
import { HackerText } from './HackerText';

export const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold font-mono tracking-tighter text-gray-900 dark:text-white mb-4 uppercase"
      >
        <HackerText text={title} />
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 text-emerald-600 dark:text-[#10F480] font-mono text-sm tracking-wider uppercase"
        >
          <span className="w-8 h-[1px] bg-[#10F480]"></span>
          {subtitle}
          <span className="w-8 h-[1px] bg-[#10F480]"></span>
        </motion.p>
      )}
    </div>
  );
};
