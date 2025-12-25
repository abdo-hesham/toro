import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LOGOS = ["QUANTUM", "VELOCITY", "NEURAL", "APEX", "CORE", "SENSIS", "ORBIT"];

const TrustBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none"
      });
      
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-12 border-y border-white/5 bg-[#050505] z-10">
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <span className="text-[8px] font-mono tracking-[0.5em] text-gray-500 uppercase">Trusted By Industry Leaders</span>
      </div>
      <div className="overflow-hidden flex whitespace-nowrap">
        <div ref={marqueeRef} className="flex gap-20 items-center">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span key={i} className="text-2xl md:text-4xl font-display font-black tracking-tighter text-white/10 hover:text-white/40 transition-colors duration-500 cursor-default">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;