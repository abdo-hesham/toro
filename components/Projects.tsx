
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
    details: 'A revolutionary approach to asset management. We architected a system that handles billions in throughput while maintaining a "zen-like" interface. The project involved complex data visualization and real-time trading engines. Our scope covered everything from core banking integration to the high-fidelity design of every micro-interaction, ensuring that speed and security were never compromised by aesthetic ambition.'
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
    details: 'Digital twin integration for smart cities. Aura Spaces allows residents to control their environment through a seamless, cinematic mobile experience. By blending real-world sensor data with a sophisticated digital twin interface, we created a living ecosystem that predicts user needs and optimizes energy consumption without human intervention.'
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
    details: 'Human-machine interaction simplified. We designed the interface for the next generation of industrial collaborative robots. The challenge was to create a control system that felt intuitive to non-technical operators while maintaining the rigorous precision required for heavy manufacturing environments.'
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
    details: 'A high-end e-commerce experience that feels like browsing a physical showroom. Heavy focus on cinematic product reveals and smooth transitions. Every scroll interaction was choreographed to mimic the way fabric catches light, bringing the tactile nature of luxury fashion into a purely digital medium. Our team meticulously crafted every transition to ensure a seamless bridge between commerce and art.'
  },
];

const ProjectCard: React.FC<{ 
  project: Project; 
  onOpen: (p: Project) => void;
  onHover: (p: Project | null) => void;
}> = ({ project, onOpen, onHover }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imgRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const xPercent = (x / width - 0.5) * 2; 
    const yPercent = (y / height - 0.5) * 2; 

    gsap.to(imgRef.current, {
      x: xPercent * -45,
      y: yPercent * -45,
      rotateY: xPercent * 10,
      rotateX: yPercent * -10,
      scale: 1.4,
      duration: 2,
      ease: "power2.out"
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        x: x - 250, 
        y: y - 250,
        duration: 1.2,
        ease: "power3.out"
      });
    }

    if (scannerRef.current) {
      gsap.to(scannerRef.current, {
        y: y - 50,
        opacity: 0.3,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { 
      filter: 'grayscale(0%) brightness(1.1) blur(0px)', 
      duration: 2.5, 
      ease: 'expo.out' 
    });

    gsap.to(cardRef.current, {
      borderColor: 'rgba(124, 58, 237, 0.3)',
      duration: 1,
      ease: 'power2.out'
    });

    const textElements = infoRef.current?.querySelectorAll('.reveal-stagger');
    if (textElements) {
      gsap.fromTo(textElements, 
        { y: 30, opacity: 0, filter: 'blur(15px)' },
        { 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 1.8, 
          stagger: 0.12, 
          delay: 0.6,
          ease: 'expo.out' 
        }
      );
    }
    
    gsap.to(infoRef.current, { opacity: 1, duration: 1 });
    onHover(project);
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { 
      x: 0, 
      y: 0, 
      rotateX: 0, 
      rotateY: 0, 
      scale: 1.05, 
      filter: 'grayscale(60%) brightness(0.4) blur(0px)', 
      duration: 2, 
      ease: 'expo.inOut' 
    });

    gsap.to(cardRef.current, {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      duration: 1.5
    });

    gsap.to(infoRef.current, { opacity: 0, duration: 0.8, ease: 'power2.in' });
    
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 1.5 });
    }
    if (scannerRef.current) {
      gsap.to(scannerRef.current, { opacity: 0, duration: 0.8 });
    }
    onHover(null);
  };

  return (
    <div 
      ref={cardRef}
      onClick={() => onOpen(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-none group bg-[#080808] border border-white/5 
        ${project.span === 'large' ? 'md:col-span-8' : 'md:col-span-4'} h-[50vh] md:h-[80vh] perspective-2000 transition-colors duration-1000`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
      <div 
        ref={scannerRef}
        className="absolute w-full h-[180px] bg-gradient-to-b from-transparent via-violet-500/40 to-transparent pointer-events-none z-10 opacity-0 mix-blend-screen"
      />
      <div 
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/30 blur-[160px] pointer-events-none opacity-0 z-0 mix-blend-screen"
      />
      <img 
        ref={imgRef}
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover filter grayscale-[60%] brightness-[0.4] transition-all duration-1000 will-change-transform scale-[1.05]"
      />
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex flex-col gap-2 md:gap-4">
        <span className="text-[7px] md:text-[9px] font-mono tracking-widest text-violet-400 bg-black/80 backdrop-blur-xl px-2 md:px-4 py-1 md:py-2 rounded-full border border-white/10 uppercase">
          Logic Sequence — 0{project.id}
        </span>
        <span className="text-[7px] md:text-[8px] font-mono tracking-widest text-white/40 uppercase pl-1">
          {project.year} / STABLE_RELEASE
        </span>
      </div>
      <div ref={infoRef} className="absolute bottom-0 left-0 w-full p-6 md:p-20 z-20 opacity-0 pointer-events-none">
        <div className="overflow-hidden mb-2 md:mb-4">
           <span className="reveal-stagger text-[8px] md:text-[10px] font-mono tracking-[0.6em] uppercase text-violet-500 block">
             {project.category}
           </span>
        </div>
        <h3 className="reveal-stagger text-3xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white mb-4 md:mb-8 leading-[0.85]">
          {project.title}
        </h3>
        <p className="reveal-stagger text-xs md:text-lg text-white/80 max-w-lg font-light leading-relaxed mb-6 md:mb-10 line-clamp-2 md:line-clamp-none">
          {project.desc}
        </p>
        <div className="reveal-stagger flex items-center gap-4 md:gap-6">
           <div className="w-8 md:w-12 h-[1px] bg-violet-500/50"></div>
           <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-white">Initialize Experience</span>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalImgWrapRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-grid > div", {
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        filter: "blur(15px)",
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.out"
      });

      const onMouseMove = (e: MouseEvent) => {
        if (!cursorRef.current) return;
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out"
        });
      };

      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();
      tl.set(modalRef.current, { display: 'flex' });
      
      tl.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, ease: 'power2.inOut' }
      );

      tl.fromTo(modalContentRef.current,
        { scale: 0.9, opacity: 0, filter: "blur(30px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: 'expo.inOut' },
        "-=0.4"
      );

      tl.fromTo(modalImgWrapRef.current,
        { xPercent: -100, scale: 1.5 },
        { xPercent: 0, scale: 1, duration: 1.5, ease: 'expo.inOut' },
        "-=1.0"
      );

      tl.from(".modal-stagger", {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out"
      }, "-=0.8");

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (!cursorRef.current || !cursorLabelRef.current || !cursorGlowRef.current) return;

    if (hoveredProject) {
      gsap.to(cursorRef.current, {
        width: 140,
        height: 140,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        duration: 0.6,
        ease: 'expo.out'
      });
      gsap.to(cursorLabelRef.current, { opacity: 1, scale: 1, duration: 0.4 });
      gsap.to(cursorGlowRef.current, { opacity: 1, scale: 2, duration: 0.8 });
    } else {
      gsap.to(cursorRef.current, {
        width: 12,
        height: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        duration: 0.6,
        ease: 'expo.out'
      });
      gsap.to(cursorLabelRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
      gsap.to(cursorGlowRef.current, { opacity: 0, scale: 0, duration: 0.4 });
    }
  }, [hoveredProject]);

  const closeModal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = '';
        if (lastActiveElement.current) lastActiveElement.current.focus();
      }
    });

    tl.to(modalContentRef.current, { 
      scale: 0.95, 
      opacity: 0, 
      filter: "blur(20px)", 
      duration: 0.8, 
      ease: 'expo.in' 
    });
    tl.to(modalRef.current, { opacity: 0, duration: 0.6, ease: 'power2.in' }, "-=0.4");
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505] py-32 md:py-48 px-6 md:px-12 lg:px-24 z-20 overflow-hidden">
      
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white/40 border border-white/10 pointer-events-none z-[1000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:flex items-center justify-center will-change-transform"
      >
        <div 
          ref={cursorGlowRef}
          className="absolute inset-0 bg-violet-500/30 blur-2xl rounded-full opacity-0 scale-0 pointer-events-none"
        />
        <div ref={cursorLabelRef} className="opacity-0 scale-50 flex flex-col items-center justify-center text-black pointer-events-none">
           <span className="text-[9px] font-mono font-black uppercase tracking-widest leading-none">View</span>
           <span className="text-[7px] font-mono uppercase tracking-tighter opacity-40">System</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-violet-600/[0.03] blur-[250px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-violet-600/[0.03] blur-[200px] pointer-events-none" />

      <div data-parallax="0.1" className="max-w-7xl mx-auto mb-20 md:mb-32">
         <div className="flex items-center gap-4 mb-10">
            <div className="h-[1px] w-12 md:w-16 bg-violet-500/40"></div>
            <span className="text-[8px] md:text-[10px] font-mono tracking-[0.6em] text-violet-500 uppercase block">
              [ Studio_Archive ]
            </span>
         </div>
         <h2 className="text-5xl md:text-9xl lg:text-[12rem] font-display font-bold uppercase tracking-tighter leading-[0.8] text-white">
           Legacy <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>Artifacts.</span>
         </h2>
      </div>

      <div className="project-grid grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 max-w-[1800px] mx-auto">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpen={setSelectedProject} 
            onHover={setHoveredProject}
          />
        ))}
      </div>

      {selectedProject && (
        <div 
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[10000] hidden items-center justify-center p-4 md:p-16 lg:p-24"
        >
          <div 
            className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            onClick={closeModal}
          />
          
          <div 
            ref={modalContentRef}
            className="relative w-full h-full max-h-[90vh] bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-sm pointer-events-auto"
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-4 md:p-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all group backdrop-blur-2xl"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div ref={modalImgWrapRef} className="w-full md:w-[55%] h-[35%] md:h-full overflow-hidden relative shrink-0">
               <img 
                 src={selectedProject.image} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]" />
            </div>

            <div 
              data-lenis-prevent
              className="w-full md:w-[45%] h-[65%] md:h-full flex flex-col overflow-y-auto custom-scrollbar min-h-0 bg-[#0a0a0a]"
            >
               <div className="p-8 md:p-20 flex flex-col min-h-full">
                  <div className="space-y-12 md:space-y-16">
                    <div className="space-y-4 md:space-y-6">
                      <span className="modal-stagger text-[8px] md:text-[10px] font-mono tracking-[0.5em] text-violet-500 uppercase block">{selectedProject.category}</span>
                      <h2 className="modal-stagger text-4xl md:text-8xl font-display font-bold uppercase tracking-tighter text-white leading-[0.85]">
                        {selectedProject.title}
                      </h2>
                      
                      <div className="modal-stagger flex items-center justify-between border-y border-white/5 py-8 md:py-12 mt-8 md:mt-12">
                         <div className="space-y-1">
                            <span className="block text-[8px] font-mono uppercase text-gray-500 tracking-widest">Protocol</span>
                            <span className="text-[10px] md:text-xs text-white uppercase tracking-widest font-medium">{selectedProject.role}</span>
                         </div>
                         <div className="space-y-1 text-right">
                            <span className="block text-[8px] font-mono uppercase text-gray-500 tracking-widest">Sequence</span>
                            <span className="text-[10px] md:text-xs text-white uppercase tracking-widest font-medium">{selectedProject.year}</span>
                         </div>
                      </div>
                    </div>

                    <div className="space-y-8 md:space-y-12">
                      <div className="modal-stagger flex items-center gap-4">
                         <div className="w-8 h-[1px] bg-violet-600"></div>
                         <h4 className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.5em] text-white/40">Mission Brief</h4>
                      </div>
                      <p className="modal-stagger text-gray-400 leading-relaxed text-sm md:text-xl font-light">
                        {selectedProject.details}
                      </p>
                    </div>
                  </div>

                  <div className="modal-stagger pt-12 md:pt-20 mt-auto">
                    <Button variant="primary" className="w-full md:w-auto py-3 md:py-4 px-8 md:px-12 border-white/10 bg-white/5 hover:bg-violet-600 hover:text-white transition-all duration-700">
                      Enter Experience
                    </Button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
