import SpotlightCard from './SpotlightCard';

const About = () => {
  return (
    <section
      id="about"
      className="relative scroll-mt-32 bg-[#010103] py-0 text-white"
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
            <SpotlightCard className="w-full max-w-xl border-white/10 bg-[#0a1224]/70 backdrop-blur">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.35em] text-[#76c5ff]">About</h2>
                  <div className="mt-3 h-[2px] w-16 bg-[#76c5ff]" />
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                  sansheinphyo.dev@gmail.com
                </p>
                <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                  Software developer with a passion for crafting refined, high-performance interfaces that balance
                  aesthetics with technical rigor. I focus on turning complex ideas into streamlined, maintainable
                  solutions across the stack while keeping user experience front and center.
                </p>
                <div className="grid gap-6 pt-2 text-sm uppercase tracking-[0.25em] sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80">
                    Bangkok
                  </div>
                  <div className="rounded-2xl border border-[#76c5ff]/20 bg-[#76c5ff]/10 px-5 py-4 text-[#76c5ff]">
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
