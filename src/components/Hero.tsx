import { Github, Instagram, Linkedin, Mail, Phone, Play, Twitter, User2 } from 'lucide-react';
import Lanyard from './Lanyard';

const Hero = () => {
  const socialLinks = [
    { icon: Linkedin, url: 'https://www.linkedin.com/in/san-shein-phyo/', label: 'LinkedIn' },
    { icon: Github, url: 'https://github.com/DaemonHehe', label: 'Github' },
    { icon: Instagram, url: 'https://www.instagram.com/', label: 'Instagram' },
    { icon: Twitter, url: 'https://twitter.com/', label: 'Twitter' },
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
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#05070d] text-white"
    >
      <div
        className="absolute inset-0 z-20"
      >
        <Lanyard
          position={[0, 0, 20]}
          gravity={[0, -40, 0]}
        />
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backbanner.png')" }}
      />
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-14 pt-12 sm:px-8 md:px-16 lg:px-24 xl:px-52">
        <div className="flex flex-col items-center justify-between gap-5 text-xs uppercase tracking-[0.28em] text-gray-300 sm:text-sm md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[0.65rem] tracking-[0.18em] sm:text-xs md:justify-end">
            <div className="flex items-center gap-2 text-white/70">
              <Mail className="h-4 w-4" />
              <span className="tracking-[0.1em]">sansheinphyo.dev@gmail.com</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/60">
              <Phone className="h-4 w-4" />
              <span className="tracking-[0.1em]">+66922483935</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-1 flex-col items-center justify-center gap-12 text-center md:mt-0 md:items-start md:text-left">
          <div className="w-full max-w-3xl space-y-10">
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#76c5ff] sm:text-xs">
              Software Developer
            </p>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-white">San Shein</span>
              <span className="block text-[#76c5ff]">Phyo</span>
            </h1>

            <p className="text-sm text-gray-300 sm:text-base">
              Building fast, scalable, and visually refined web experiences with clean architecture, 
              modern frameworks, and a focus on purposeful design and performance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <button
                onClick={() => scrollToSection('resume')}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase text-white transition hover:border-white/30 hover:bg-white/20 sm:w-auto"
              >
                <User2 className="h-4 w-4" />
                Resume
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#76c5ff]/40 px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase text-[#76c5ff] transition hover:border-[#76c5ff] hover:bg-[#76c5ff]/10 sm:w-auto"
              >
                <Play className="h-4 w-4" />
                Portfolio
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 sm:justify-start">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#76c5ff]/70 hover:text-[#76c5ff]"
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