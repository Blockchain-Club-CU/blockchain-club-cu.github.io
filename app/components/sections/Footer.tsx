export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#1C1C1C] border-t border-black/10 dark:border-gray-200 dark:border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 object-contain opacity-80"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://placehold.co/128x128/10F480/1C1C1C?text=B';
            }}
          />
          <span className="text-gray-900 dark:text-gray-900 dark:text-white font-mono font-bold">
            TCCU.
          </span>
        </div>

        <div className="text-gray-500 text-xs font-mono text-center md:text-right">
          <p>
            &copy; {new Date().getFullYear()} Tokentitan Club Chandigarh
            University.
          </p>
          <p className="mt-1">Built by Students, for Students.</p>
        </div>
      </div>
    </footer>
  );
};
