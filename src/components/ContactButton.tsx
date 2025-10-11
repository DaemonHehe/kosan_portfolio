import { Mail } from 'lucide-react';

const ContactButton = () => {
  return (
    <a
      href="mailto:sansheinphyo.dev@gmail.com"
      className="fixed bottom-8 right-8 z-50 p-4 bg-[#00BFFF] text-white rounded-full shadow-lg hover:bg-[#00A5E0] transition-all duration-300 transform hover:scale-110 group"
      aria-label="Contact via email"
    >
      <Mail className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Contact Me
      </span>
    </a>
  );
};

export default ContactButton;
