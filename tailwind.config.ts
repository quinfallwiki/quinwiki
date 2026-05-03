import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070d',
          900: '#0a0e1a',
          850: '#0d1322',
          800: '#101830',
          700: '#172241',
          600: '#1f2d54',
          500: '#2a3a6b',
          400: '#3d4f86',
        },
        frost: {
          50: '#eaf6ff',
          100: '#cfeaff',
          200: '#a4d8ff',
          300: '#6cc1ff',
          400: '#33a6ff',
          500: '#1689e6',
          600: '#0d6cc2',
          700: '#0a559b',
          800: '#0a447b',
          900: '#0a3760',
        },
        steel: {
          100: '#e6e9ef',
          200: '#c7cdd9',
          300: '#a3acbf',
          400: '#7c8aa3',
          500: '#5a6884',
          600: '#414d68',
          700: '#2d3650',
        },
        ember: {
          300: '#ffd98a',
          400: '#f7b955',
          500: '#e89324',
          600: '#b96a14',
        },
        rarity: {
          common: '#a3acbf',
          uncommon: '#4caf50',
          rare: '#33a6ff',
          epic: '#a855f7',
          legendary: '#f7b955',
          mythic: '#ef4444',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', '"Trajan Pro"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(51, 166, 255, 0.35)',
        'glow-strong': '0 0 48px rgba(51, 166, 255, 0.55)',
        ember: '0 0 24px rgba(247, 185, 85, 0.35)',
        panel: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse at center, rgba(51,166,255,0.15) 0%, rgba(10,14,26,0) 60%)',
        'panel-grad': 'linear-gradient(180deg, rgba(23,34,65,0.6) 0%, rgba(10,14,26,0.9) 100%)',
        'rune-grain':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.05  0 0 0 0 0.08  0 0 0 0 0.15  0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 16px rgba(51,166,255,0.25)' },
          '50%': { boxShadow: '0 0 32px rgba(51,166,255,0.55)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
