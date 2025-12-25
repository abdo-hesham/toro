import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  // Styles tailored for a "Cinematic" feel: smaller text, wider tracking, slower transitions
  const baseStyles = "relative inline-flex items-center justify-center px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-700 overflow-hidden group border";
  
  const variants = {
    primary: "border-white/20 text-white hover:bg-white hover:text-black hover:border-white",
    secondary: "bg-white text-black border-white hover:bg-gray-200",
    outline: "bg-transparent border-white/20 text-white hover:border-white",
    dark: "border-black/20 bg-black text-white hover:bg-transparent hover:text-black hover:border-black"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Cinematic Fill Effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
      )}
      
       {/* Dark variant fill effect */}
       {variant === 'dark' && (
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 mix-blend-difference" />
      )}

    </button>
  );
};

export default Button;