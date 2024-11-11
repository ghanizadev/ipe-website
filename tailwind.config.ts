import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        backdrop: 'rgba(0, 0, 0, .35)',
      },
      gridTemplateColumns: {
        sidebar: 'min-content 1fr',
      },
    },
  },
  plugins: [],
};
export default config;
