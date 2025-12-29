
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const PROCESS_STEPS = [
  {
    id: "01",
    phase: "Discovery",
    title: "System Immersion",
    summary: "Forensic analysis of brand DNA and market voids.",
    description: "We don't just take a brief; we perform a deep-tissue audit of your industry's current logic. By identifying where competitors are silent, we find the frequency where your brand can scream.",
    bullets: ["Stakeholder Deep-Dives", "Competitor Logic Audit", "Technical Constraint Mapping", "User Intent Profiling"],
    artifacts: "Logic Document, Creative North-Star",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    time: "1-2 Weeks"
  },
  {
    id: "02",
    phase: "Strategy",
    title: "Logic Architecture",
    summary: "Sculpting the user journey and structural hierarchy.",
    description: "Before a single pixel is rendered, we architect the flow. This is the blueprint phase where we define how a user breathes within your digital ecosystem, ensuring every interaction has a purpose.",
    bullets: ["Dynamic User Journeys", "Information Scaffolding", "Core Messaging Engine", "Conversion Funnel Logic"],
    artifacts: "Interactive Sitemap, UX Wireframes",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200",
    time: "2 Weeks"
  },
  {
    id: "03",
    phase: "Design",
    title: "Kinetic Identity",
    summary: "High-fidelity rendering meets cinematic motion.",
    description: "Our design process is additive. We layer high-fidelity UI with cinematic motion to create a living brand. This isn't just a layout; it's a sensory experience designed to command absolute attention.",
    bullets: ["Motion-First UI Design", "Cinematic Prototyping", "Design System Foundry", "Visual Asset Synthesis"],
    artifacts: "Figma Source, Motion Spec Sheet",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1200",
    time: "3-4 Weeks"
  },
  {
    id: "04",
    phase: "Build",
    title: "Precision Stack",
    summary: "High-performance engineering with sub-second response.",
    description: "We build for speed. Using a modern headless stack, we ensure your digital legacy is as fast as it is beautiful. Sub-second load times and butter-smooth transitions are our baseline protocol.",
    bullets: ["Frontend Engineering", "Headless CMS Integration", "Animation Performance Opt.", "QA Stress-Testing"],
    artifacts: "Production Repo, Performance Audit",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
    time: "4-6 Weeks"
  },
  {
    id: "05",
    phase: "Launch",
    title: "Legacy Deployment",
    summary: "Strategic global rollout and impact optimization.",
    description: "Launch is only the beginning. We deploy to the edge and monitor performance in real-time, iterating on user data to ensure your brand doesn't just launch—it dominates.",
    bullets: ["Global Edge Deployment", "Post-Launch Monitoring", "Analytics Integration", "Iterative Support Loop"],
    artifacts: "Live Environment, Growth Roadmap",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    time: "Ongoing"
  }
];

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray('.process-scene-card') as HTMLElement[];
        
        // Calculate scroll end more accurately based on card width
        const totalWidth = (cards.length - 1) * window.innerWidth;
        
        const mainScroll = gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            // Added a settle buffer (window.innerHeight) to the end so the last slide stays pinned
            end: () => `+=${totalWidth + window.innerHeight}`, 
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (cards.length - 1),
              duration: 0.8,
              delay: 0,
              ease: "power2.inOut"
            }
          }
        });

        gsap.fromTo(progressBarRef.current, 
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${totalWidth}`,
              scrub: 1
            }
          }
        );

        cards.forEach((card, i) => {
          const details = card.querySelectorAll('.detail-reveal');
          const image = card.querySelector('.card-image-main');
          
          // Improved card visibility range: no blur, just opacity & focus
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainScroll,
              start: "left center",
              end: "right center",
              scrub: true,
            }
          });

          tl.fromTo(card, 
            { opacity: 0.2, scale: 0.95 },
            { opacity: 1, scale: 1, ease: "none" },
            0
          );

          // Details reveal within the horizontal move
          gsap.fromTo(details,
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.1, 
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: mainScroll,
                start: "left 40%",
                toggleActions: "play none none reverse",
              }
            }
          );

          tl.fromTo(image,
            { filter: "brightness(0.5) contrast(0.8)", scale: 1.05 },
            { filter: "brightness(1) contrast(1)", scale: 1, ease: "none" },
            0
          );
        });
      });

      // Mobile vertical logic
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray('.process-scene-card') as HTMLElement[];
        cards.forEach((card: any) => {
          gsap.fromTo(card, 
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="process-section"
      className="relative w-full h-screen bg-[#050505] text-white z-30 overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      
      {/* Unified Section Header */}
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-10 flex flex-col gap-2 pointer-events-none">
         <span className="text-[10px] font-mono tracking-[0.5em] text-violet-500 uppercase">
           [ Operational Blueprint ]
         </span>
         <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">
           How We <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Build.</span>
         </h2>
      </div>

      {/* Progress Track */}
      <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 h-[1px] bg-white/5 z-40 hidden lg:block overflow-hidden">
        <div 
          ref={progressBarRef}
          className="h-full w-full bg-violet-600 origin-left scale-x-0"
        />
      </div>

      <div ref={containerRef} className="flex h-full w-fit items-center lg:px-0">
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.id} className="process-scene-card w-screen lg:w-screen h-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-32 px-6 md:px-12 lg:px-48 relative will-change-transform">
            
            {/* MEDIA COMPONENT - Guaranteed crisp visibility */}
            <div className="w-full lg:w-[50%] h-[35%] lg:h-[60%] relative group">
               <div className="absolute inset-0 border border-white/5 rounded-sm overflow-hidden bg-zinc-900 shadow-2xl transition-all duration-700">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="card-image-main w-full h-full object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                     <span className="text-[8px] font-mono tracking-widest uppercase text-white/50">Rec_Step_{step.id}</span>
                  </div>
               </div>
            </div>

            {/* TEXT COMPONENT - Precise layout for side-by-side view */}
            <div className="card-text-content w-full lg:w-[40%] flex flex-col justify-center space-y-6 lg:space-y-10">
               <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-violet-500 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                      0{i+1}
                    </span>
                    <div className="h-[1px] w-8 bg-white/10" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-gray-500">{step.time}</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter leading-none">
                    {step.title}
                  </h3>
                  
                  <p className="detail-reveal text-violet-400 font-medium text-base md:text-xl">
                    {step.summary}
                  </p>
                  
                  <p className="detail-reveal text-gray-400 font-light text-sm md:text-lg leading-relaxed max-w-xl">
                    {step.description}
                  </p>
               </div>

               <div className="detail-reveal pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {step.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                       <div className="w-1 h-1 rounded-full bg-violet-600" />
                       <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{bullet}</span>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
