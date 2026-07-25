import { MessageCircle, Mail } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import LinkedinIcon from '../icons/LinkedIn';
import InstagramIcon from '../icons/Instagram';

export const Connect = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-[#1C1C1C] relative border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <SectionHeader title="CONNECT WITH US" subtitle="Join The Community" />

        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Whether you are a complete beginner or a Web3 native, our doors are
          always open. Join our socials to stay updated.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: MessageCircle,
              label: 'WhatsApp',
              href: 'https://chat.whatsapp.com/CXY53ovXAas7bWBfwRnEsa?utm_source=website',
              color: 'hover:text-green-500',
            },
            {
              icon: LinkedinIcon,
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/tokentitan-club-cu?utm_source=website',
              color: 'hover:text-blue-500',
            },
            {
              icon: InstagramIcon,
              label: 'Instagram',
              href: 'https://www.instagram.com/tokentitan_cu/?utm_source=website',
              color: 'hover:text-pink-500',
            },
            {
              icon: Mail,
              label: 'Email',
              href: 'mailto:cublockchainclub@gmail.com',
              color: 'hover:text-red-500 ',
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className={`flex flex-col items-center justify-center p-6 border border-black/10 dark:border-gray-200 dark:border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group ${item.color}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <item.icon
                size={32}
                className="mb-3 text-gray-600 dark:text-gray-300 group-hover:text-inherit transition-colors"
              />
              <span className="font-mono text-sm">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
