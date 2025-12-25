import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#020202] pt-24 pb-12 px-6 flex flex-col items-center justify-center text-center text-gray-500 z-40 relative">
      
      {/* Branding */}
      <div className="mb-16 flex flex-col items-center gap-6">
        <Logo className="w-16 h-16 md:w-20 md:h-20" />
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-[0.2em] uppercase">TORO LOGIC</h2>
      </div>

      {/* Credits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-32 mb-24 text-[10px] font-mono uppercase tracking-[0.2em] leading-loose">
        
        <div className="flex flex-col gap-2">
          <span className="text-white mb-2 border-b border-white/10 pb-2 inline-block">Social</span>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-white mb-2 border-b border-white/10 pb-2 inline-block">Sitemap</span>
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">Studio</a>
          <a href="#" className="hover:text-white transition-colors">Perspectives</a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-white mb-2 border-b border-white/10 pb-2 inline-block">Contact</span>
          <a href="mailto:hello@torologic.com" className="hover:text-white transition-colors">hello@torologic.com</a>
          <span className="opacity-50">San Francisco, CA</span>
        </div>

      </div>

      <div className="text-[10px] font-mono text-gray-700 tracking-widest uppercase">
        © 2025 Toro Logic. End of Line.
      </div>
    </footer>
  );
};

export default Footer;