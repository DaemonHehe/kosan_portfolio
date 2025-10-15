import SpotlightCard from './SpotlightCard';

const About = () => {
  return (
    <section
      id="about"
      className="relative scroll-mt-32 bg-black py-0 text-white transition-colors duration-300 dark:bg-black dark:text-white"
      style={{
        backgroundImage: "url('/kosan3.png')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'calc(100% + 100px) center',
      }}
    >
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-6 md:px-12 lg:px-16">
        <div className="grid w-full gap-12 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
          <div className="self-center py-24 md:py-32">
            <SpotlightCard className="w-full max-w-xl border-slate-200 bg-white/80 backdrop-blur transition-colors dark:border-white/10 dark:bg-[#0a1224]/70">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.35em] text-sky-500 transition-colors dark:text-[#76c5ff]">About</h2>
                  <div className="mt-3 h-[2px] w-16 bg-sky-500 transition-colors dark:bg-[#76c5ff]" />
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-600 transition-colors dark:text-white/70">
                  sansheinphyo.dev@gmail.com
                </p>
                <p className="text-sm leading-relaxed text-slate-600 transition-colors md:text-base dark:text-gray-300">
                  Software developer with a passion for crafting refined, high-performance interfaces that balance
                  aesthetics with technical rigor. I focus on turning complex ideas into streamlined, maintainable
                  solutions across the stack while keeping user experience front and center.
                </p>
                <div className="grid gap-6 pt-2 text-sm uppercase tracking-[0.25em] text-slate-600 transition-colors sm:grid-cols-2 dark:text-white/80">
                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                    Bangkok
                  </div>
                  <div className="rounded-2xl border border-sky-400/30 bg-sky-100 px-5 py-4 text-sky-500 dark:border-[#76c5ff]/20 dark:bg-[#76c5ff]/10 dark:text-[#76c5ff]">
                    Thailand
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
};

export default About;
