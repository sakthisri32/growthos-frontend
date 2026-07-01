/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07060B',
          900: '#0B0A12',
          850: '#100E1B',
          800: '#15131F'
        },
        violet: {
          DEFAULT: '#7C3AED',
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9'
        },
        skyline: {
          DEFAULT: '#3B82F6',
          400: '#60A5FA'
        },
        amber: {
          DEFAULT: '#F5A623'
        },
        mist: {
          100: '#F5F3FF',
          300: '#C9C3DD',
          500: '#9C95B5',
          700: '#615A78'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'aurora': 'radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0) 70%), radial-gradient(40% 35% at 85% 15%, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 70%)',
        'grid': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
      },
      boxShadow: {
        glass: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: []
}
