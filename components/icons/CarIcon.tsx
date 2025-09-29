
import React from 'react';

export const CarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M14 16.5a2.5 2.5 0 1 0-5 0" />
        <path d="M5 18v-5.83c0-.52.21-1.02.58-1.39l4.58-4.58c.37-.37.87-.58 1.4-.58h1.88c.52 0 1.02.21 1.39.58l4.58 4.58c.37.37.58.87.58 1.39V18" />
        <path d="M5 18h14" />
        <path d="M19 18h.5a1.5 1.5 0 0 0 1.5-1.5v-2.09c0-.45-.3-.85-.75-.98" />
        <path d="M5 18h-.5a1.5 1.5 0 0 1-1.5-1.5v-2.09c0-.45.3-.85.75-.98" />
    </svg>
);
