import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        body6: ['14px', { lineHeight: 'normal', fontWeight: '600' }],
      },
      colors: {
        normal: '#6F36E8',
      },
    },
  },
  plugins: [],
};

export default config;
