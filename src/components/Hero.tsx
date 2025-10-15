import { useEffect, useState } from 'react';
import { Eye, Github, Instagram, Linkedin, Mail, Phone, Play, Twitter, User2 } from 'lucide-react';
import Lanyard from './Lanyard';
import { useTheme } from '../context/ThemeContext';
import { useVisitorCount } from '../hooks/useVisitorCount';

const getLanyardPosition = (width: number): [number, number, number] => {
  if (width >= 1280) return [6, 2, 22];
  if (width >= 1024) return [4, 1, 20];
  if (width >= 768) return [2, 0.5, 18];
  return [0, 0, 20];
};

const Hero = () => {
  const { theme } = useTheme();
  const bannerImage = theme === 'dark' ? '/backbanner_dark.png' : '/backbanner_light.png';
  const { count, isLoading: isLoadingVisitors, error: visitorError } = useVisitorCount();
  const [lanyardPosition, setLanyardPosition] = useState<[number, number, number]>(() => {
    if (typeof window !== 'undefined') {
      return getLanyardPosition(window.innerWidth);
    }
    return [0, 0, 20];
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const next = getLanyardPosition(window.innerWidth);
      setLanyardPosition(prev => (prev[0] === next[0] && prev[1] === next[1] && prev[2] === next[2] ? prev : next));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialLinks = [
    { icon: Linkedin, url: 'https://www.linkedin.com/in/san-shein-phyo/', label: 'LinkedIn' },
    { icon: Github, url: 'https://github.com/DaemonHehe', label: 'Github' },
    // { icon: Instagram, url: 'https://www.instagram.com/', label: 'Instagram' },
    // { icon: Twitter, url: 'https://twitter.com/', label: 'Twitter' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#05070d] dark:text-white"
    >
      <div
        className="absolute inset-0 z-[5]"
      >
        <Lanyard
          position={lanyardPosition}
          gravity={[0, -40, 0]}
        />
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${bannerImage}")` }}
      />
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-14 pt-12 sm:px-8 md:px-16 lg:px-24 xl:px-52 pointer-events-none">
        <div className="pointer-events-auto mt-24 flex flex-col items-center justify-between gap-5 text-xs uppercase tracking-[0.28em] text-slate-800 transition-colors sm:mt-28 sm:text-sm md:mt-32 md:flex-row dark:text-gray-300">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[0.65rem] tracking-[0.18em] sm:text-xs md:justify-end">
            <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-1 text-slate-900 shadow-sm transition-colors dark:border-white/10 dark:bg-white/10 dark:text-white">
              <Eye className="h-4 w-4 opacity-80" />
              <span className="tracking-[0.1em] text-xs font-semibold">
                {visitorError ? 'N/A' : isLoadingVisitors ? 'Loading...' : count?.toLocaleString() ?? 'N/A'} visitors
              </span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none mt-12 flex flex-1 flex-col items-center justify-center gap-12 text-center md:mt-0 md:items-start md:text-left">
          <div className="pointer-events-none w-full max-w-3xl space-y-10">
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-sky-500 transition-colors sm:text-xs dark:text-[#76c5ff]">
              Software Developer
            </p>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-slate-950 transition-colors dark:text-white">San Shein</span>
              <span className="block text-sky-600 transition-colors dark:text-[#76c5ff]">Phyo</span>
            </h1>

            <p className="text-sm text-slate-900 transition-colors sm:text-base dark:text-gray-300">
              Building fast, scalable, and visually refined web experiences with clean architecture, 
              modern frameworks, and a focus on purposeful design and performance.
            </p>
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <button
                onClick={() => scrollToSection('resume')}
                className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-900 transition hover:border-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/40 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/20 dark:focus:ring-[#76c5ff]/40 sm:w-auto"
              >
                <User2 className="h-4 w-4" />
                Resume
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full border border-sky-400/40 px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-sky-500 transition hover:border-sky-500 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400/40 dark:border-[#76c5ff]/40 dark:text-[#76c5ff] dark:hover:border-[#76c5ff] dark:hover:bg-[#76c5ff]/10 dark:focus:ring-[#76c5ff]/40 sm:w-auto"
              >
                <Play className="h-4 w-4" />
                Portfolio
              </button>
            </div>
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 text-slate-700 transition-colors sm:justify-start dark:text-gray-400">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#76c5ff]/70 dark:hover:text-[#76c5ff]"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
