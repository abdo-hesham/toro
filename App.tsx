import React, { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Capabilities from './components/Capabilities';
import Process from './components/Process';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [heroActive, setHeroActive] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. CINEMATIC SMOOTH SCROLL (Lenis)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1.1,
      lerp: 0.1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // 2. LOADER HANDOFF LOGIC
  const handleInteractionStart = useCallback(() => {
    setHeroActive(true);
  }, []);

  const handleLoaderDone = useCallback(() => {
    setLoaderVisible(false);
    window.dispatchEvent(new CustomEvent('loader:done'));
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  // 3. CINEMATIC SCENE TRANSITION ENGINE
  useEffect(() => {
    if (loaderVisible) return;
    
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('[data-scene]') as HTMLElement[];
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      sections.forEach((section) => {
        const type = section.getAttribute('data-scene-type') || 'soft-cut';
        
        const applyTransition = () => {
          if (prefersReducedMotion) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
            }
          });

          switch (type) {
            case 'soft-cut':
              tl.to(section, { opacity: 0, scale: 0.9, y: -50, filter: "blur(10px)", ease: "none" });
              break;
            case 'editorial-wipe':
              tl.to(section, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.5, ease: "none" });
              break;
            case 'parallax-depth':
              const layers = section.querySelectorAll('[data-parallax]');
              layers.forEach((layer: any) => {
                const speed = parseFloat(layer.getAttribute('data-parallax')) || 0.2;
                tl.to(layer, { y: -150 * speed, opacity: 0.2, ease: "none" }, 0);
              });
              tl.to(section, { opacity: 0, ease: "none" }, 0);
              break;
          }
        };

        applyTransition();

        const reveals = section.querySelectorAll('[data-reveal]');
        if (reveals.length > 0) {
          gsap.fromTo(reveals, 
            { opacity: 0, y: 50, filter: "blur(10px)" },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.1,
              ease: "power4.out"
            }
          );
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [loaderVisible]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-violet-600 selection:text-white overflow-x-hidden">
      {loaderVisible && (
        <Loader 
          onInteractionStart={handleInteractionStart} 
          onAllDone={handleLoaderDone}
        />
      )}
      
      <Navbar startAnimation={heroActive} />
      
      <main className="w-full relative z-0">
        <Hero startAnimation={heroActive} />

        <div data-scene data-scene-type="parallax-depth">
          <About />
        </div>

        <div data-scene data-scene-type="soft-cut">
          <Capabilities />
        </div>

        <Process />

        <div data-scene data-scene-type="parallax-depth">
          <Projects />
        </div>

        <div data-scene data-scene-type="soft-cut">
          <Testimonials />
        </div>

        <div data-scene data-scene-type="editorial-wipe">
          <Contact />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;