import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Logo from './Logo';

interface LoaderProps {
  onInteractionStart?: () => void;
  onAllDone?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onInteractionStart, onAllDone }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Lock scrolling immediately
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.add('loader-done');
          if (onAllDone) onAllDone();
        }
      });
      timelineRef.current = tl;

      // Initial state
      gsap.set(percentRef.current, { innerText: "000" });

      // Step 1: Progress Counter Animation
      tl.to(percentRef.current, {
        innerText: 100,
        duration: 1.8,
        snap: { innerText: 1 },
        ease: "power3.inOut",
        onUpdate: function() {
          if (percentRef.current) {
            percentRef.current.innerText = Math.round(this.targets()[0].innerText).toString().padStart(3, '0');
          }
        }
      });

      // Reduced Motion Fallback
      if (prefersReducedMotion) {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          onStart: () => {
            if (onInteractionStart) onInteractionStart();
            window.dispatchEvent(new CustomEvent('loader:done'));
          }
        });
        return;
      }

      // Step 2: Cinematic Content Preparation
      tl.to(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        filter: "blur(15px)",
        duration: 0.6,
        ease: "expo.in"
      }, "+=0.2");

      tl.to(seamRef.current, {
        height: "100%",
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut"
      }, "-=0.2");

      // Step 3: THE CINEMATIC SPLIT
      const splitLabel = "splitStart";
      tl.addLabel(splitLabel);

      // Instant Handoff
      tl.call(() => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (onInteractionStart) onInteractionStart();
      }, undefined, splitLabel);

      const premiumEase = "power4.inOut";
      
      tl.to(leftPanelRef.current, { xPercent: -100, duration: 1.6, ease: premiumEase }, splitLabel);
      tl.to(rightPanelRef.current, { xPercent: 100, duration: 1.6, ease: premiumEase }, splitLabel);
      tl.to(seamRef.current, { opacity: 0, scaleX: 0, duration: 0.8, ease: "power4.out" }, splitLabel);

      tl.call(() => {
        window.dispatchEvent(new CustomEvent('loader:done'));
      }, undefined, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto overflow-hidden bg-transparent">
       <div ref={leftPanelRef} className="absolute top-0 left-0 w-1/2 h-full bg-[#050505] z-10 border-r border-white/5" />
       <div ref={rightPanelRef} className="absolute top-0 right-0 w-1/2 h-full bg-[#050505] z-10 border-l border-white/5" />
       <div ref={seamRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-0 bg-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.8)] z-20 opacity-0" />
       <div ref={contentRef} className="relative z-30 flex flex-col items-center gap-8 text-center px-6">
          <Logo className="w-20 h-20 opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono tracking-[0.6em] uppercase text-white/20 mb-3">System Calibration</span>
            <div className="flex items-baseline justify-center">
               <span ref={percentRef} className="font-display text-8xl md:text-[10rem] font-thin text-white tracking-tighter leading-none">000</span>
               <span className="text-violet-500 font-bold text-xl md:text-3xl ml-3">%</span>
            </div>
          </div>
       </div>
       <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
    </div>
  );
};

export default Loader;