'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENTS } from '@/app/data/constants';
import { FormField } from '@/app/types';

export const EventPopup = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const hasShown = useRef(false);

  const upcomingEvents = EVENTS.filter(
    (e) => e.status === 'Upcoming' && e.formFields && e.formFields.length > 0,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShown.current) {
        hasShown.current = true;
        setVisible(true);
      }
    }, 2500);

    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail.eventId;
      const idx = upcomingEvents.findIndex((ev) => ev.id === id);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setVisible(true);
        setSubmitted(false);
        setFormData({});
      }
    };

    window.addEventListener('openEventPopup', handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('openEventPopup', handler);
    };
  }, [upcomingEvents]);

  const dismiss = () => setVisible(false);

  const handleSubmit = async () => {
    const event = upcomingEvents[currentIndex];
    setLoading(true);
    setError('');
    try {
      const missingFields = event.formFields?.filter(
        (field) => field.required && !formData[field.name]?.trim(),
      );
      if (missingFields && missingFields.length > 0) {
        setError(
          `Please fill in: ${missingFields.map((f) => f.name).join(', ')}`,
        );
        setLoading(false);
        return;
      }
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, formData }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch {
      setError('Failed to submit. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!upcomingEvents.length) return null;

  const event = upcomingEvents[currentIndex];

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup — full screen on mobile, floating card on desktop */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="
              fixed z-50
              bg-white dark:bg-[#1C1C1C]
              border border-gray-200 dark:border-white/10
              shadow-2xl overflow-hidden
              /* Mobile: bottom sheet */
              bottom-0 left-0 right-0 rounded-t-2xl max-h-[90vh] overflow-y-auto
              /* Desktop: floating card bottom right */
              sm:bottom-6 sm:right-6 sm:left-auto sm:rounded-2xl sm:w-full sm:max-w-md sm:max-h-[85vh]
            "
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-[#1C1C1C] flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-white/10 z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-600 dark:text-[#10F480] uppercase tracking-widest">
                  Upcoming Event
                </span>
                {upcomingEvents.length > 1 && (
                  <span className="text-xs font-mono bg-emerald-600/10 dark:bg-[#10F480]/10 text-emerald-600 dark:text-[#10F480] px-2 py-0.5 rounded-full">
                    {upcomingEvents.length} events
                  </span>
                )}
              </div>
              <button
                onClick={dismiss}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <h3 className="font-mono font-bold text-gray-900 dark:text-white text-sm leading-snug mb-1 line-clamp-2">
                {event.title}
              </h3>
              <p className="text-xs text-gray-500 font-mono mb-4">
                {event.date} · {event.location}
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-emerald-600 dark:text-[#10F480] font-mono font-bold text-sm">
                    You're registered! 🎉
                  </p>
                  <p className="text-gray-500 text-xs mt-1">See you there.</p>
                  <button
                    onClick={dismiss}
                    className="mt-4 text-xs font-mono text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors underline"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {event.formFields?.map((field: FormField) => (
                    <div key={field.name}>
                      <label className="block text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">
                        {field.name}
                        {field.required && (
                          <span className="text-red-400 ml-0.5">*</span>
                        )}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2.5 text-sm font-mono bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-[#10F480] transition-colors"
                      />
                    </div>
                  ))}

                  {error && (
                    <p className="text-red-400 text-xs font-mono">{error}</p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-[#10F480] text-[#1C1C1C] font-mono font-bold text-sm rounded-lg hover:bg-[#0dd66f] transition-colors disabled:opacity-50 mt-1"
                  >
                    {loading ? 'Submitting...' : 'REGISTER NOW'}
                  </button>
                </div>
              )}
            </div>

            {/* Carousel controls */}
            {upcomingEvents.length > 1 && (
              <div className="sticky bottom-0 bg-white dark:bg-[#1C1C1C] flex items-center justify-between px-5 py-3 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                <button
                  onClick={() => {
                    setCurrentIndex((i) => i - 1);
                    setSubmitted(false);
                    setFormData({});
                  }}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1 text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={14} /> Prev
                </button>

                <div className="flex gap-1.5">
                  {upcomingEvents.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIndex(i);
                        setSubmitted(false);
                        setFormData({});
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? 'w-4 bg-[#10F480]'
                          : 'w-1.5 bg-gray-300 dark:bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCurrentIndex((i) => i + 1);
                    setSubmitted(false);
                    setFormData({});
                  }}
                  disabled={currentIndex === upcomingEvents.length - 1}
                  className="flex items-center gap-1 text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
