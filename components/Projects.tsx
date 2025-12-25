
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Button from './ui/Button';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
  desc: string;
  role: string;
  span: 'large' | 'small';
  details: string;
}

const PROJECTS_DATA: Project[] = [
  { 
    id: 1, 
    title: 'Neo Finance', 
    category: 'Fintech Platform', 
    year: '2025', 
    desc: 'The future of decentralized banking.', 
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
    role: 'Lead Design',
    span: 'large',
    details: 'A revolutionary approach to asset management. We architected a system that handles billions in throughput while maintaining a "zen-like" interface. The project involved complex data visualization and real-time trading engines.'
  },
  { 
    id: 2, 
    title: 'Aura Spaces', 
    category: 'Architecture', 
    year: '2024', 
    desc: 'Reshaping urban living.', 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
    role: 'Motion Graphics',
    span: 'small',
    details: 'Digital twin integration for smart cities. Aura Spaces allows residents to control their environment through a seamless, cinematic mobile experience.'
  },
  { 
    id: 3, 
    title: 'Cyber Dynamics', 
    category: 'Robotics', 
    year: '2024', 
    desc: 'Autonomous systems.', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
    role: 'UI/UX Strategy',
    span: 'small',
    details: 'Human-machine interaction simplified. We designed the interface for the next generation of industrial collaborative robots.'
  },
  { 
    id: 4, 
    title: 'Velvet', 
    category: 'Luxury Fashion', 
    year: '2023', 
    desc: 'Redefining elegance.', 
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
    role: 'Creative Direction',
    span: 'large',
    details: 'A high-end e-commerce experience that feels like browsing a physical showroom. Heavy focus on cinematic product reveals and smooth transitions.'
  },
];

// Fix: Use React.FC to properly handle reserved props like 'key' when rendering this component in a list.
const ProjectCard: React.FC<{ project: Project; onOpen: (p: Project) => void }> = ({ project, onOpen }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imgRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const xPercent = (x / width - 0.5) * 2; // -1 to 1
    const yPercent = (y / height - 0.5) * 2; // -1 to 1

    // Suble parallax: move image in opposite direction of mouse
    gsap.to(imgRef.current, {
      x: xPercent * -20,
      y: yPercent * -20,
      rotateY: xPercent * 2,
      rotateX: yPercent * -2,
      duration: 0.6,
      ease: "power2.out"
    });

    // Spotlight glow effect
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.4,
        x: x - 150,
        y: y - 150,
        duration: 0.4
      });
    }
  };

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.15, filter: 'grayscale(0%) brightness(1)', duration: 1.2, ease: 'expo.out' });
    gsap.to(infoRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1.05, filter: 'grayscale(40%) brightness(0.6)', duration: 1.2, ease: 'expo.out' });
    gsap.to(infoRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power4.in' });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.6 });
    }
  };

  return (
    <div 
      ref={cardRef}
      onClick={() => onOpen(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-pointer group bg-[#080808] border border-white/5 
        ${project.span === 'large' ? 'md:col-span-8' : 'md:col-span-4'} h-[60vh] md:h-[75vh] perspective-1000`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Spotlight Glow */}
      <div 
        ref={glowRef}
        className="absolute w-[300px] h-[300px] rounded-full bg-violet-600/20 blur-[100px] pointer-events-none opacity-0 z-0"
      />

      <img 
        ref={imgRef}
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover filter grayscale-[40%] brightness-[0.6] transition-all duration-1000 will-change-transform scale-[1.05]"
      />

      <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
        <span className="text-[10px] font-mono tracking-widest text-violet-400 bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/5">
          {project.year}
        </span>
      </div>

      <div ref={infoRef} className="absolute bottom-0 left-0 w-full p-8 md:p-14 z-20 opacity-0 translate-y-5 pointer-events-none">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-violet-400 mb-3 block">{project.category}</span>
        <h3 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-white mb-6 leading-[0.9]">
          {project.title}
        </h3>
        <p className="text-sm md:text-base text-white/60 max-w-sm line-clamp-2 font-light leading-relaxed">
          {project.desc}
        </p>
        <div className="mt-8 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
           <div className="w-8 h-[1px] bg-white/20"></div>
           <span>View Prototype</span>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalImgWrapRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for grid
      gsap.from(".project-grid > div", {
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 2,
        ease: "expo.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Modal Animation and Focus Management
  useEffect(() => {
    if (selectedProject) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();
      tl.set(modalRef.current, { display: 'flex' });
      
      // Cinematic Backdrop Reveal
      tl.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: 'power4.inOut' }
      );

      // Scene Shift Reveal
      tl.fromTo(modalContentRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' },
        "-=0.8"
      );

      tl.fromTo(modalImgWrapRef.current,
        { scale: 1.2, filter: 'blur(20px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' },
        "-=0.6"
      );

      tl.from(".modal-stagger", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      }, "-=0.8");

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [selectedProject]);

  const closeModal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = '';
        if (lastActiveElement.current) lastActiveElement.current.focus();
      }
    });

    tl.to(modalContentRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut' });
    tl.to(modalRef.current, { opacity: 0, duration: 0.6, ease: 'power2.in' }, "-=0.4");
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505] py-32 md:py-48 px-6 md:px-12 lg:px-24 z-20 overflow-hidden">
      {/* Ambient Background Gradient */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-violet-600/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-violet-600/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto mb-24 lg:mb-36">
         <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-violet-500/50"></div>
            <span className="text-[10px] font-mono tracking-[0.5em] text-violet-500 uppercase block">
              [ 04 — Portfolio Matrix ]
            </span>
         </div>
         <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold uppercase tracking-tighter leading-[0.85] text-white">
           Curating <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Immersive</span> <br/> Logic.
         </h2>
      </div>

      <div className="project-grid grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 max-w-[1800px] mx-auto">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
        ))}
      </div>

      {/* Cinematic Modal Overlay */}
      {selectedProject && (
        <div 
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[10000] hidden items-center justify-center p-4 md:p-12"
        >
          {/* Scrim */}
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            onClick={closeModal}
          />
          
          <div 
            ref={modalContentRef}
            className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)] rounded-sm"
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-8 right-8 z-50 p-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all group backdrop-blur-xl"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image Area */}
            <div ref={modalImgWrapRef} className="w-full md:w-[55%] h-1/2 md:h-full overflow-hidden relative">
               <img 
                 src={selectedProject.image} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden md:block" />
            </div>

            {/* Modal Text Area */}
            <div className="w-full md:w-[45%] h-1/2 md:h-full p-8 md:p-20 flex flex-col justify-between overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
               <div className="space-y-12">
                  <div className="space-y-4">
                    <span className="modal-stagger text-[10px] font-mono tracking-[0.4em] text-violet-500 uppercase block">{selectedProject.category}</span>
                    <h2 className="modal-stagger text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white leading-[0.9]">
                      {selectedProject.title}
                    </h2>
                    
                    <div className="modal-stagger flex flex-wrap gap-8 border-y border-white/5 py-8 mt-8">
                       <div className="space-y-1">
                          <span className="block text-[8px] font-mono uppercase text-gray-500 tracking-widest">Protocol Role</span>
                          <span className="text-xs text-white uppercase tracking-widest font-medium">{selectedProject.role}</span>
                       </div>
                       <div className="ml-auto space-y-1 text-right">
                          <span className="block text-[8px] font-mono uppercase text-gray-500 tracking-widest">Timeline</span>
                          <span className="text-xs text-white uppercase tracking-widest font-medium">{selectedProject.year}</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="modal-stagger flex items-center gap-3">
                       <div className="w-6 h-[1px] bg-violet-500"></div>
                       <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">Project Brief</h4>
                    </div>
                    <p className="modal-stagger text-gray-400 leading-relaxed text-base md:text-lg font-light max-w-xl">
                      {selectedProject.details}
                    </p>
                  </div>
               </div>

               <div className="modal-stagger pt-16 mt-auto">
                  <Button variant="primary" className="w-full py-8 border-white/10 hover:border-violet-500/50 bg-white/5 backdrop-blur-md">
                    Explore Experience
                  </Button>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
