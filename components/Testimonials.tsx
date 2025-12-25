import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef} 
      className="w-full py-40 px-6 md:px-12 bg-white text-black relative z-30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span data-reveal className="text-[10px] font-mono tracking-[0.4em] text-violet-600 uppercase mb-12 block">Founder Perspectives</span>
        <div className="testimonial-quote">
          <p data-reveal className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter leading-tight italic">
            "Toro Logic didn't just design a website; they architected a <span className="text-violet-600">new category</span> for us. Their motion-first approach is the highest fidelity in the market."
          </p>
          <div data-reveal className="mt-16 flex flex-col items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest font-bold">Marcus Chen</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">CEO, Quantum Systems</span>
          </div>
        </div>
      </div>
      
      {/* Decorative wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-50/30 to-transparent pointer-events-none" />
    </section>
  );
};

export default Testimonials;