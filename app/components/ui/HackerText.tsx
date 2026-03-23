'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = '!@#$%^&*()_+-=<>?1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const HackerText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const iterations = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    let interval: NodeJS.Timeout;
    
    interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iterations.current += 1 / 3;

      if (iterations.current >= text.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
};
