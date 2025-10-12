import { ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Portfolio = () => {
  const { ref, isInView } = useInView();

  const projects = [
    {
      title: 'Top-G Productivity Suite',
      category: 'Full-Stack Web App',
      description:
        'A productivity platform to plan daily tasks, log workouts, and track performance. Built with Next.js, React, Tailwind CSS, and Node.js, deployed on Vercel.',
      image:
        './Top-G.png',
      url: 'https://top-g-rust.vercel.app/',
    },
    {
      title: 'Game Jam Rangsit',
      category: 'Unity / C# Game',
      description:
        'A 2D platformer built during a 48-hour Game Jam. Focused on rapid prototyping, level design, and teamwork using Unity and C#.',
      image:
        'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Intranet : Student Portal',
      category: 'System Analysis and Design',
      description:
        'A web-based student and teacher portal where instructors can create classes, manage assignments and grades, while students can enroll, submit work, and track academic progress — built with modern web technologies for a seamless learning experience.',
      image:
        './intranet.png',
      url: 'https://github.com/DaemonHehe/IntraSysFrontend',
    },
    {
      title: 'Justmayy | AI Meta Content Generator',
      category: 'SaaS / AI Chatbot',
      description:
        'An AI-driven platform specializing in creating high-converting, SEO-friendly meta titles and descriptions. Leverages machine learning to optimize content for search visibility and click-through rates, perfect for marketers and content creators.',
      image:
        './justmayy.png',
      url:
        'https://justmayy.ai/',
    },
    {
      title: 'Job Finding App - Flutter',
      category: 'Flutter / Mobile',
      description:
        'A Flutter-based mobile app where users can discover and apply for jobs, while companies can post openings and manage applications — built with a clean UI and smooth mobile experience.',
      image:
        'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Hugging face ML',
      category: 'ML / Classification',
      description:
        'A machine learning model deployed using Hugging Face — users can upload an image, and the model instantly classifies whether it is a cat or a dog using a custom-trained image classifier.',
      image:
        'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];

  return (
    <section
      id='portfolio'
      className='relative scroll-mt-32 bg-[#040811] py-24 text-white'
    >
      <div className='mx-auto max-w-6xl px-5 sm:px-8 md:px-12 lg:px-16'>
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className='text-center md:text-left'>
            <p className='text-xs uppercase tracking-[0.35em] text-[#76c5ff]'>Portfolio</p>
            <h2 className='mt-6 text-4xl font-semibold leading-tight md:text-5xl'>
              A showcase of modern, purposeful, and performance-driven digital builds.
            </h2>
          </div>

          <div className='mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3'>
            {projects.map((project, index) => (
              <article
                key={project.title}
                className='group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 transition-transform duration-500 hover:-translate-y-3 hover:bg-white/10'
                style={{ transitionDelay: isInView ? `${index * 80}ms` : '0ms' }}
              >
                <div
                  className='h-56 w-full bg-cover bg-center'
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#03040a] via-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80' />
                <div className='relative flex flex-col gap-4 px-6 pb-8 pt-6'>
                  <span className='text-xs uppercase tracking-[0.3em] text-white/50'>
                    {project.category}
                  </span>
                  <h3 className='text-xl font-semibold text-white'>{project.title}</h3>
                  <p className='text-sm text-white/60'>{project.description}</p>
                  <a
                    href={project.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#76c5ff] transition hover:text-white'
                  >
                    View Project
                    <ExternalLink className='h-4 w-4' />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className='mt-16 flex flex-col items-center justify-between gap-6 rounded-[28px] border border-white/10 bg-white/5 px-8 py-8 text-center md:flex-row md:text-left'>
            <div>
              <p className='text-xs uppercase tracking-[0.3em] text-white/50'>Collaboration</p>
              <h3 className='mt-3 text-2xl font-semibold text-white'>
                Let&apos;s build your next full-stack idea together.
              </h3>
            </div>
            <a
              href='mailto:sansheinphyo.dev@gmail.com'
              className='inline-flex items-center gap-3 rounded-full border border-[#76c5ff]/60 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#76c5ff] transition hover:border-[#76c5ff] hover:bg-[#76c5ff]/10'
            >
              Start A Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
