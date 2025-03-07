import type { Config } from 'tailwindcss';

export default {
     darkMode: ['class'],
     content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
          extend: {
               colors: {
                    'neon-pink': '#FF2E63',
                    'neon-purple': '#9D4EDD',
                    'neon-blue': '#00F5FF',
                    'neon-green': '#39FF14',
                    'cyber-dark': '#0A0B1E',
                    'cyber-light': '#2A2B3D',
                    background: 'hsl(var(--background))',
                    foreground: 'hsl(var(--foreground))',
                    backgroundImage: {
                         'grid-pattern':
                              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                         'cyber-grid': `linear-gradient(to right, rgba(0,245,255,0.1) 1px, transparent 1px),
                       linear-gradient(to bottom, rgba(0,245,255,0.1) 1px, transparent 1px)`,
                    },
                    card: {
                         DEFAULT: 'hsl(var(--card))',
                         foreground: 'hsl(var(--card-foreground))',
                    },
                    popover: {
                         DEFAULT: 'hsl(var(--popover))',
                         foreground: 'hsl(var(--popover-foreground))',
                    },
                    primary: {
                         DEFAULT: 'hsl(var(--primary))',
                         foreground: 'hsl(var(--primary-foreground))',
                    },
                    secondary: {
                         DEFAULT: 'hsl(var(--secondary))',
                         foreground: 'hsl(var(--secondary-foreground))',
                    },
                    muted: {
                         DEFAULT: 'hsl(var(--muted))',
                         foreground: 'hsl(var(--muted-foreground))',
                    },
                    accent: {
                         DEFAULT: 'hsl(var(--accent))',
                         foreground: 'hsl(var(--accent-foreground))',
                    },
                    destructive: {
                         DEFAULT: 'hsl(var(--destructive))',
                         foreground: 'hsl(var(--destructive-foreground))',
                    },
                    border: 'hsl(var(--border))',
                    input: 'hsl(var(--input))',
                    ring: 'hsl(var(--ring))',
                    chart: {
                         '1': 'hsl(var(--chart-1))',
                         '2': 'hsl(var(--chart-2))',
                         '3': 'hsl(var(--chart-3))',
                         '4': 'hsl(var(--chart-4))',
                         '5': 'hsl(var(--chart-5))',
                    },
               },
               borderRadius: {
                    lg: 'var(--radius)',
                    md: 'calc(var(--radius) - 2px)',
                    sm: 'calc(var(--radius) - 4px)',
               },
               fontFamily: {
                    syncopate: ['Syncopate', 'sans-serif'],
                    'space-grotesk': ['Space Grotesk', 'sans-serif'],
               },
               animation: {
                    gradient: 'gradient 8s linear infinite',
                    'grid-move': 'gridMove 20s linear infinite',
                    'hologram-float': 'hologramFloat 3s ease-in-out infinite',
               },
               keyframes: {
                    gradient: {
                         '0%': { backgroundPosition: '0% 50%' },
                         '100%': { backgroundPosition: '300% 50%' },
                    },
                    gridMove: {
                         '0%': { backgroundPosition: '0 0' },
                         '100%': { backgroundPosition: '50px 50px' },
                    },
                    hologramFloat: {
                         '0%, 100%': { transform: 'translateY(0) rotateX(0)' },
                         '50%': { transform: 'translateY(-10px) rotateX(5deg)' },
                    },
               },
               backgroundSize: {
                    grid: '50px 50px',
               },
               borderWidth: {
                    '3': '3px',
               },
          },
     },
     plugins: [require('tailwindcss-animate')],
} satisfies Config;
