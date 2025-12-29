
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './ui/Button';

const SOURCE_IMAGES = [
  'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=1200',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200',
  'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1200',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1200',
  'https://images.unsplash.com/photo-1504333638930-c8787321eba0?q=80&w=1200',
  'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200',
];

const RIBBON_IMAGES = [...SOURCE_IMAGES, ...SOURCE_IMAGES, ...SOURCE_IMAGES, ...SOURCE_IMAGES];

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const speedRef = useRef({ base: 0.04, current: 0.04, target: 0.04 });
  const posRef = useRef({ row1: 0, row2: 0 });

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      gsap.set([track1Ref.current, track2Ref.current], { xPercent: -25 });
      gsap.set(".ribbon-item img", { filter: "grayscale(60%) brightness(0.5)", scale: 1.1 });

      const updateMotion = (time: number, deltaTime: number) => {
        if (prefersReducedMotion) return;
        const lerpFactor = 0.08;
        speedRef.current.current += (speedRef.current.target - speedRef.current.current) * lerpFactor;
        const delta = deltaTime * 0.06;
        const velocity = speedRef.current.current * delta;
        
        posRef.current.row1 -= velocity; 
        posRef.current.row2 += velocity * 0.9; 
        
        if (posRef.current.row1 <= -50) posRef.current.row1 += 25;
        if (posRef.current.row1 >= 0)   posRef.current.row1 -= 25;
        if (posRef.current.row2 >= 0)   posRef.current.row2 -= 25;
        if (posRef.current.row2 <= -50) posRef.current.row2 += 25;
        
        if (track1Ref.current) gsap.set(track1Ref.current, { xPercent: posRef.current.row1 });
        if (track2Ref.current) gsap.set(track2Ref.current, { xPercent: posRef.current.row2 });
      };

      if (!prefersReducedMotion) gsap.ticker.add(updateMotion);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 4000, 1.2); 
          speedRef.current.target = speedRef.current.base + boost;
        }
      });

      return () => { gsap.ticker.remove(updateMotion); };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle entry animation when triggered
  useEffect(() => {
    if (startAnimation) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        const textLines = contentRef.current?.querySelectorAll(".masked-line-inner");
        
        if (textLines) {
          tl.fromTo(textLines, 
            { yPercent: 120, opacity: 0, rotateX: -20 },
            { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.8, stagger: 0.1, ease: "expo.out" },
            0.1
          );
        }

        tl.fromTo([track1Ref.current, track2Ref.current], 
          { opacity: 0, scale: 0.9, y: 50 },
          { opacity: 0.7, scale: 1, y: 0, duration: 2.2, ease: "power4.out" }, 
          0.3
        );
        
        tl.fromTo(contentRef.current?.querySelectorAll(".ui-fade") || [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power2.out" },
          1.0
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [startAnimation]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-[#050505] text-white flex flex-col justify-end"
    >
      <div 
        className="absolute inset-0 flex flex-col justify-center items-center z-0"
        style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
        <div 
          className="relative w-full h-[140%] -translate-y-[5%] flex flex-col gap-12 justify-center items-center"
          style={{ transform: 'rotateZ(-4deg) rotateY(15deg) rotateX(10deg)', transformStyle: 'preserve-3d' }}
        >
          {[track1Ref, track2Ref].map((ref, idx) => (
            <div key={idx} className="w-full relative h-[35vh] flex items-center will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
               <div ref={ref} className="flex gap-10 w-[400%] pl-10" style={{ transformStyle: 'preserve-3d' }}>
                  {RIBBON_IMAGES.map((src, i) => (
                    <div 
                      key={`${idx}-${i}`} 
                      className="ribbon-item relative w-[35vw] md:w-[20vw] aspect-[16/9] flex-shrink-0 overflow-hidden rounded-md shadow-2xl bg-gray-900 transition-all duration-700"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                       <img src={src} className="w-full h-full object-cover" loading="eager" draggable="false" />
                    </div>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={contentRef} className="relative z-30 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 pointer-events-none">
        <div className="max-w-4xl pointer-events-auto">
          <div className="ui-fade mb-6 flex items-center gap-3">
             <div className="w-10 h-[1px] bg-violet-500"></div>
             <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-violet-400 backdrop-blur-sm bg-black/20 px-2 py-1 rounded">
               Directing Digital Legacies
             </span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter uppercase mb-8 drop-shadow-[0_15px_35px_rgba(0,0,0,1)]">
            <div className="overflow-hidden">
                <span className="masked-line-inner block text-white origin-bottom-left">Beyond Digital.</span>
            </div>
            <div className="overflow-hidden pt-1">
                <span className="masked-line-inner block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 origin-bottom-left" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                Into Immersion.
                </span>
            </div>
          </h1>
          <div className="ui-fade">
            <p className="text-gray-300 text-xs md:text-xl leading-relaxed max-w-2xl font-light opacity-90 backdrop-blur-[2px] bg-black/10 p-4 border-l border-white/10">
                We craft <span className="text-white font-medium underline decoration-violet-500/50 underline-offset-4">high-fidelity interfaces</span> and cinematic motion for the world's most ambitious brands. Experience design, refined.
            </p>
          </div>
        </div>
        <div className="ui-fade flex flex-col items-start md:items-end gap-6 shrink-0 pointer-events-auto">
            <Button variant="primary" className="shadow-2xl px-8 md:px-12 py-4 md:py-6 border-white/30 backdrop-blur-md">
                Enter The Studio
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
