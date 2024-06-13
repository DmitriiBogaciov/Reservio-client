import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:
      {
        "light-greenish":"#D0D3AE",
        "greenish":"#8F9646",
        "dark-greenish":"#424520",
        "light-grayish":"#E3E3E3",
        "grayish":"#75766C"
      }
    },
  },
  plugins: [],
}
export default config
