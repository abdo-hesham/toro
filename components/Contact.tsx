
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Button from './ui/Button';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 2,
        }
      });

      tl.to(circleRef.current, {
        scale: 2.5,
        opacity: 0.15,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact-section" className="relative w-full h-screen bg-white text-black flex flex-col items-center justify-center py-32 md:py-48 overflow-hidden z-30">
      
      <div ref={circleRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full border border-black/10 opacity-0 pointer-events-none scale-50"></div>
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span data-reveal className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] mb-12 text-gray-500">Final Sequence</span>
        
        <h2 data-reveal className="font-display text-5xl md:text-[7vw] font-bold tracking-tighter uppercase leading-[0.9] mb-12 md:mb-20 text-black perspective-1000">
          Start Your <br/>
          <span className="text-violet-600 italic">Legacy.</span>
        </h2>
        
        <div data-reveal className="flex flex-col items-center gap-10 md:gap-14">
          <p className="text-lg md:text-2xl text-gray-600 font-light max-w-lg">
            We are currently accepting commissions for Q3 2025.
          </p>
          <Button variant="dark" className="bg-black text-white px-10 md:px-16 py-4 md:py-6 text-sm md:text-lg tracking-[0.2em] hover:scale-105 transition-transform duration-500">
            Initiate Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
