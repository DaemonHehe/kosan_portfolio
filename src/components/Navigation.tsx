import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const { theme, toggleTheme } = useTheme();
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#05070d]/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 lg:px-12">
        <div className="hidden flex-col text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/60 md:flex">
          <span className="text-slate-900 dark:text-white/80">Daemon</span>
          <span className="text-sky-500 dark:text-[#76c5ff]">Phyo</span>
        </div>
        <div className="flex items-center gap-8 text-xs font-medium uppercase tracking-[0.25em] text-slate-600 transition-colors dark:text-gray-400">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative pb-1 transition-colors ${
                activeSection === item.id
                  ? 'text-slate-900 dark:text-white'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 right-0 -bottom-1 h-[2px] transition ${
                  activeSection === item.id
                    ? 'bg-sky-500 dark:bg-[#76c5ff]'
                    : 'bg-transparent group-hover:bg-sky-400/80 dark:group-hover:bg-[#76c5ff]/80'
                }`}
              />
            </button>
          ))}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/70 text-slate-700 transition-all hover:border-sky-400 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-[#76c5ff] dark:hover:text-[#76c5ff] dark:focus:ring-[#76c5ff]/40 md:hidden"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
        <div className="hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-500 transition-colors dark:text-white/60 md:flex">
          <span>+66922483935</span>
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/70 text-slate-700 transition-all hover:border-sky-400 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-[#76c5ff] dark:hover:text-[#76c5ff] dark:focus:ring-[#76c5ff]/40"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
