import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './ui/Button';
import Logo from './Logo';

interface NavbarProps {
  startAnimation?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ startAnimation = false }) => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [introTimeline, setIntroTimeline] = useState<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll behavior (Hide on scroll down, show on scroll up)
      const showAnim = gsap.from(navRef.current, { 
        yPercent: -100,
        paused: true,
        duration: 0.6,
        ease: "power3.inOut"
      }).progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          self.direction === -1 || self.scroll() < 50 ? showAnim.play() : showAnim.reverse();
        }
      });
      
      // Intro Animation Timeline
      const tl = gsap.timeline({ paused: true });
      tl.from([brandRef.current, logoRef.current, contactRef.current], {
        y: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1
      });
      
      setIntroTimeline(tl);

    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (startAnimation && introTimeline) {
      gsap.delayedCall(0.5, () => introTimeline.play());
    }
  }, [startAnimation, introTimeline]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-exclusion text-white transition-all duration-500"
    >
      {/* Brand Text (Left) */}
      <div ref={brandRef} className="font-bold text-xl md:text-2xl tracking-[0.2em] cursor-pointer group font-display uppercase z-20">
        Toro Logic
      </div>

      {/* Logo (Center Absolute) */}
      <div ref={logoRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Logo className="w-10 h-10 md:w-12 md:h-12" />
      </div>

      {/* Contact Button (Right) */}
      <div ref={contactRef} className="z-20">
        <Button 
            variant="outline" 
            className="px-6 py-3 text-[10px] md:text-xs tracking-[0.2em] border-white/30 hover:bg-white hover:text-black hover:border-white transition-all duration-500"
            onClick={scrollToContact}
        >
            Contact Us
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;