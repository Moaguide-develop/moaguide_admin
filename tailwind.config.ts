import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Tailwind 클래스 검색 경로
  theme: {
    extend: {}, // 커스텀 테마 확장
  },
  plugins: [],
};

export default config;
