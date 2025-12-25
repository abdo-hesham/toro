import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.to(textContentRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 overflow-hidden z-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-violet-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div ref={textContentRef} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        
        <div className="flex-1 space-y-16">
          <div className="space-y-4">
             <span data-reveal className="block text-[10px] font-mono uppercase tracking-[0.5em] text-violet-400">
               [ 01 — Studio Profile ]
             </span>
             
             <h2 data-reveal className="font-display text-[11vw] md:text-[8vw] lg:text-[7vw] font-bold leading-[0.85] tracking-tighter uppercase">
                We Architect <br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                  The Void.
                </span>
             </h2>
          </div>

          <div className="max-w-2xl space-y-8">
             <p data-reveal className="text-lg md:text-2xl lg:text-3xl font-light leading-snug tracking-tight text-gray-300">
               In a landscape of digital noise, we choose <span className="text-white font-medium italic underline decoration-violet-500/30 underline-offset-8">absolute precision</span>. We build immersive systems that transform static brands into living legacies.
             </p>
             
             <div data-reveal className="space-y-4 pt-4 border-t border-white/10">
                <p className="text-sm md:text-lg text-gray-400 leading-relaxed font-light">
                  High-fidelity design meets cinematic motion—crafted for the outliers. We don't just follow trends; we define the aesthetic frontier of the next decade.
                </p>
             </div>
          </div>
        </div>

        <div data-reveal className="hidden md:flex flex-col gap-12 pt-4 self-end text-right opacity-40">
           <div className="space-y-1">
              <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Location</span>
              <p className="text-xs uppercase tracking-widest text-white">San Francisco / HQ</p>
           </div>
           <div className="space-y-1">
              <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Established</span>
              <p className="text-xs uppercase tracking-widest text-white">MMXXI</p>
           </div>
           <div className="space-y-1">
              <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Disciplines</span>
              <p className="text-xs uppercase tracking-widest text-white leading-relaxed">
                Experience Design<br/>
                Cinematic Motion<br/>
                Creative Tech
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;