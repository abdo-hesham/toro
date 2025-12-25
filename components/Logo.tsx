import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* White Circle Background */}
      <circle cx="50" cy="50" r="50" fill="white" />
      
      {/* Abstract Bull Silhouette (Black) */}
      <path 
        d="M50 82C35 82 22 70 22 55C22 45 28 38 35 38C30 25 22 30 18 32C22 15 40 18 45 28C48 27 52 27 55 28C60 18 78 15 82 32C78 30 70 25 65 38C72 38 78 45 78 55C78 70 65 82 50 82Z" 
        fill="#050505"
      />
    </svg>
  );
};

export default Logo;