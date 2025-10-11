import { useInView } from '../hooks/useInView';
import SpotlightCard from './SpotlightCard';

const Resume = () => {
  const { ref, isInView } = useInView();

  const softwareSkills = [
    { label: 'React / Next.js', level: 90 },
    { label: 'Node.js / Express.js', level: 88 },
    { label: 'MongoDB / SQL', level: 84 },
    { label: 'Tailwind CSS / UI Design', level: 86 },
    { label: 'Python / TensorFlow', level: 75 },
  ];

  const languageSkills = [
    { label: 'Burmese', level: 100 },
    { label: 'English', level: 95 },
    { label: 'Thai', level: 50 },
    { label: 'Chinese', level: 40 },
  ];

  const personalSkills = [
    'Problem Solving',
    'Teamwork',
    'Communication',
    'Adaptability',
    'Motivation',
    'Empathy',
    'Time Management',
  ];

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Konectify',
      period: '2024 - 2025',
      description:
        'Developed responsive and scalable web interfaces using React, Next.js, and Tailwind CSS. Improved performance and user experience with optimized components and clean code structure.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Quokka Studio',
      period: '2023 - 2024',
      description:
        'Built and maintained full-stack web applications using React, Node.js, and MongoDB. Focused on backend-frontend integration and performance optimization.',
    },
  ];

  const services = [
    'Full-stack Web Development',
    'API Integration & Cloud Deployment',
    'Responsive UI/UX Implementation',
    'Database Design & Authentication',
  ];

  const techSkills = [
    'JavaScript / TypeScript',
    'C / C++ / C# / Java / Python',
    'RESTful APIs / JWT Auth',
    'AWS / Vercel / Git / Stripe Integration',
  ];

  const hobbies = ['Coding', 'Fitness', 'Travel', 'Music'];

  return (
    <section id="resume" className="relative scroll-mt-32 bg-[#03050d] py-24 text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12 lg:px-16">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-[#76c5ff]">Resume</p>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              Full-stack expertise in scalable systems, clean design, and modern web technologies.
            </h2>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            <SpotlightCard className="md:col-span-2 xl:col-span-2">
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">Experience</h3>
              <div className="mt-8 space-y-8">
                {experiences.map((exp, index) => (
                  <div key={exp.title} className="relative pl-8">
                    <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[#76c5ff]" />
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">{exp.period}</p>
                    <p className="mt-2 text-lg font-medium text-white">{exp.title}</p>
                    <p className="text-sm text-[#76c5ff]">{exp.company}</p>
                    <p className="mt-2 text-sm text-white/70">{exp.description}</p>
                    {index < experiences.length - 1 && <span className="absolute left-1.5 top-6 h-12 w-px bg-white/10" />}
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">Technical Skills</h3>
              <div className="mt-8 space-y-6">
                {softwareSkills.map((skill) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>{skill.label}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#76c5ff] via-[#547ef5] to-[#3656b3] transition-all duration-700"
                        style={{ width: isInView ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">Languages</h3>
              <div className="mt-8 space-y-5">
                {languageSkills.map((language) => (
                  <div key={language.label}>
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>{language.label}</span>
                      <span>{language.level}%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#76c5ff] transition-all duration-700"
                        style={{ width: isInView ? `${language.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">Tech Stack</h3>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {techSkills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <span className="h-1 w-8 rounded-full bg-[#3656b3]" />
                    {skill}
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            <SpotlightCard>
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">Personal Skills</h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {personalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">What Can I Do?</h3>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <span className="h-1 w-8 rounded-full bg-[#76c5ff]" />
                    {service}
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            <SpotlightCard>
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">Hobbies & Interests</h3>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                {hobbies.map((hobby) => (
                  <span key={hobby} className="rounded-full border border-white/20 px-5 py-2">
                    {hobby}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
