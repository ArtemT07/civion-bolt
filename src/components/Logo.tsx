import React from 'react';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <img
      src="/civion-logo.svg"
      alt="Civion Logo"
      className={className}
    />
  );
};
