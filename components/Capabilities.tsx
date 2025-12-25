import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SERVICES = [
  { 
    id: '01', 
    tag: 'Strategy', 
    title: 'Product Strategy', 
    desc: 'Defining market logic and architectural roadmaps before the first pixel is drawn.' 
  },
  { 
    id: '02', 
    tag: 'Design', 
    title: 'Motion Systems', 
    desc: 'Cinematic interaction narratives that transform static interfaces into living experiences.' 
  },
  { 
    id: '03', 
    tag: 'Build', 
    title: 'Creative Tech', 
    desc: 'High-performance, motion-first engineering built for sub-second precision.' 
  },
  { 
    id: '04', 
    tag: 'Strategy', 
    title: 'Brand Heritage', 
    desc: 'Distilling startup core values into timeless visual legacies that dominate categories.' 
  },
  { 
    id: '05', 
    tag: 'Design', 
    title: 'Immersive UI/UX', 
    desc: 'Spatial, high-fidelity design crafted for the outliers of the tech world.' 
  },
  { 
    id: '06', 
    tag: 'Build', 
    title: 'Scale Ops', 
    desc: 'Architecting robust design systems that empower teams to ship at global velocity.' 
  }
];

const Capabilities: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const mm = gsap.context(() => {
        // Floating Background Orb Animation
        if (!prefersReducedMotion) {
          gsap.to(orbRef.current, {
            x: '20vw',
            y: '10vh',
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });

        // Entrance animation: Focus reveal
        tl.fromTo(headerRef.current, 
          { opacity: 0, filter: prefersReducedMotion ? "none" : "blur(20px)", y: 30 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.8, ease: "expo.out" }
        );

        // Staggered reveal for cards
        tl.fromTo(".capability-card", 
          { 
            opacity: 0, 
            y: 40, 
            rotateX: 10,
            transformPerspective: 1000 
          },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            duration: 1.5, 
            stagger: 0.1, 
            ease: "power4.out" 
          },
          "-=1.2"
        );
      }, sectionRef);

      return () => mm.revert();
    };

    window.addEventListener('loader:done', init);
    return () => window.removeEventListener('loader:done', init);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#050505] overflow-hidden z-20"
    >
      <style>{`
        /* Background Grid */
        .capabilities-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
          pointer-events: none;
        }

        .capability-card {
          position: relative;
          padding: 3rem 2.5rem;
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .capability-card:hover {
          background: rgba(255, 255, 255, 0.035);
          border-color: rgba(124, 58, 237, 0.2);
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.6);
        }

        /* The Smooth Infinity Beam */
        .infinite-beam {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .infinite-beam::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(124, 58, 237, 0.8) 50%,
            rgba(192, 132, 252, 0.8) 70%,
            transparent 100%
          );
          animation: beam-slide 4s infinite linear;
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.3);
        }

        .capability-card:hover .infinite-beam::after {
          animation-duration: 1.5s; /* Speed up on hover */
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #7c3aed 50%,
            #fff 70%,
            transparent 100%
          );
          box-shadow: 0 0 15px rgba(124, 58, 237, 0.8);
        }

        @keyframes beam-slide {
          0% { left: -100%; }
          100% { left: 150%; }
        }

        /* Ambient Glow Interaction */
        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(124, 58, 237, 0.12) 0%, 
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .capability-card:hover .card-glow {
          opacity: 1;
        }

        .id-badge {
          font-family: 'Syncopate', sans-serif;
          font-size: 10px;
          color: rgba(124, 58, 237, 0.5);
          letter-spacing: 2px;
        }
      `}</style>

      {/* Background Elements */}
      <div className="capabilities-grid-bg" />
      <div 
        ref={orbRef}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none z-0" 
      />
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-violet-600/5 blur-[100px] rounded-full pointer-events-none z-0 translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 md:mb-32 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-[1px] w-12 bg-violet-500/50"></div>
             <span className="text-[10px] font-mono tracking-[0.5em] text-violet-400 uppercase block">
               Expertise Systems
             </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.85] text-white">
            Engineering <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>The Future Void.</span>
          </h2>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {SERVICES.map((s) => (
            <div 
              key={s.id} 
              className="capability-card group cursor-default"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <div className="card-glow" />
              
              <div className="space-y-10 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="id-badge">[{s.id}]</span>
                  <div className="px-3 py-1 border border-white/5 rounded-full text-[8px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all duration-500">
                    {s.tag}
                  </div>
                </div>
                
                <div className="space-y-5">
                  <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white group-hover:text-violet-100 transition-colors duration-500">
                    {s.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="mt-14 flex items-center justify-between relative z-10 border-t border-white/5 pt-6">
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-gray-600 group-hover:text-white transition-colors duration-500">
                  Protocol {s.id}A
                </span>
                <div className="relative overflow-hidden w-6 h-6">
                  <svg 
                    className="w-full h-full text-white/20 group-hover:text-violet-500 group-hover:translate-x-0 -translate-x-2 transition-all duration-700 ease-expo" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* The Infinite Smooth Beam */}
              <div className="infinite-beam" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;