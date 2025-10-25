import React from 'react';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>

      <path
        d="M 20 80 L 20 40 Q 20 30 30 30 L 50 30 L 50 10 L 70 30 L 70 10 L 90 30 L 90 40 Q 90 30 80 30 L 70 30 L 70 80 Q 70 90 60 90 L 30 90 Q 20 90 20 80 Z"
        fill="url(#logoGradient)"
        stroke="#1E3A8A"
        strokeWidth="2"
      />

      <path
        d="M 35 50 L 35 75 M 50 50 L 50 75 M 65 50 L 65 75"
        stroke="#E0F2FE"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};
