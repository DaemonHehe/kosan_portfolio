interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
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
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#05070d]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 lg:px-12">
        <div className="hidden flex-col uppercase tracking-[0.35em] text-xs text-white/60 md:flex">
          <span className="text-white/80">Daemon</span>
          <span className="text-[#76c5ff]">Phyo</span>
        </div>
        <div className="flex items-center gap-8 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative pb-1 transition ${
                activeSection === item.id ? 'text-white' : 'hover:text-white'
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 right-0 -bottom-1 h-[2px] transition ${
                  activeSection === item.id ? 'bg-[#76c5ff]' : 'bg-transparent group-hover:bg-[#76c5ff]/80'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 md:flex">
          <span>+66922483935</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
