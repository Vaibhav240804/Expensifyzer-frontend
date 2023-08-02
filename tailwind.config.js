/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#000',
      'white': '#fff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'darkgray': '#111827',
      'bermuda': '#78dcca',
      'rose':{
        '300':'#fda4af',
      },      
      'cyan':{
        '100':'#cffafe',
        '200':'#a5f3fc',
        '300':'#67e8f9',
        '400':'#22d3ee',
        '500':'#06b6d4',
        '800':'#155e75',
        '900':'#164e63',
      },
      'sky':{
        '600':'#0284c7',
      },
      'stone':{
        '100':'#f5f5f4',
        '300':'#d6d3d1',
        '400':'#a8a29e',
        '600':'#57534e',
        '500':'#78716c',
        '700':'#44403c',
      },
      'slate':{
        '300':'#cbd5e1',
        '400':'#94a3b8',
        '500':'#64748b',
        '600':'#475569',
        '700':'#334155',
        '800':'#1e293b',
        '900':'#0f172a',
        '950':'#020617',
      },
      'gray':{
        '300': '#d1d5db',
        'DEFAULT': '#4b5563',
        '800':'#1f2937',
        '900':'#111827',
      },
      'zink':{
        '700':'#3f3f46',
        '500':'#71717a',
      },
      'blue':{
        '300':'#93c5fd',
        '600':'#2563eb',
        '700':'#1d4ed8',
        '800':'#1e40af',
        '950':'#172554',
      },
      'red':{
        '100':'#fee2e2',
        'DEFAULT':'#dc2626',
      }
    },
    extend: {},
  },
  plugins: [],
}

