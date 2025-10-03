import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeMap = {
    sm: { width: 18, height: 24 },
    md: { width: 27, height: 36 },
    lg: { width: 36, height: 48 },
  };

  const { width, height } = sizeMap[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Pocket Showdown Logo"
    >
      <g clipPath="url(#clip0_1_69)">
        <mask id="path-1-inside-1_1_69" fill="white">
          <path d="M0 120H180V220C180 231.046 171.046 240 160 240H20C8.9543 240 0 231.046 0 220V120Z" />
        </mask>
        <path
          d="M0 120H180V220C180 231.046 171.046 240 160 240H20C8.9543 240 0 231.046 0 220V120Z"
          fill="#D9D9D9"
        />
        <path
          d="M-12 114H192L168 126H12L-12 114ZM192 220C192 237.673 177.673 252 160 252H20C2.32689 252 -12 237.673 -12 220H12C12 224.418 15.5817 228 20 228H160C164.418 228 168 224.418 168 220H192ZM20 252C2.32689 252 -12 237.673 -12 220V114L12 126V220C12 224.418 15.5817 228 20 228V252ZM192 114V220C192 237.673 177.673 252 160 252V228C164.418 228 168 224.418 168 220V126L192 114Z"
          fill="#181717"
          mask="url(#path-1-inside-1_1_69)"
        />
        <mask id="path-3-inside-2_1_69" fill="white">
          <path d="M0 20C0 8.95431 8.95431 0 20 0H160C171.046 0 180 8.95431 180 20V120H0V20Z" />
        </mask>
        <path
          d="M0 20C0 8.95431 8.95431 0 20 0H160C171.046 0 180 8.95431 180 20V120H0V20Z"
          fill="#1F2937"
        />
        <path
          d="M-12 20C-12 2.32689 2.32689 -12 20 -12H160C177.673 -12 192 2.32689 192 20H168C168 15.5817 164.418 12 160 12H20C15.5817 12 12 15.5817 12 20H-12ZM192 126H-12L12 114H168L192 126ZM-12 126V20C-12 2.32689 2.32689 -12 20 -12V12C15.5817 12 12 15.5817 12 20V114L-12 126ZM160 -12C177.673 -12 192 2.32689 192 20V126L168 114V20C168 15.5817 164.418 12 160 12V-12Z"
          fill="#181717"
          mask="url(#path-3-inside-2_1_69)"
        />
        <circle cx="90" cy="120" r="26" fill="#D9D9D9" stroke="#181717" strokeWidth="12" />
        <rect x="27" y="12" width="23" height="102" fill="#CE9511" />
        <rect x="130" y="12" width="23" height="102" fill="#CE9511" />
      </g>
      <defs>
        <clipPath id="clip0_1_69">
          <rect width="180" height="240" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
