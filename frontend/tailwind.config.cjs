/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agencyBg: 'var(--bg-base)',
        agencySurface: 'var(--bg-surface)',
        agencyPrimary: 'hsl(var(--primary))',
        agencySecondary: 'hsl(var(--secondary))',
        agencyAccent: 'hsl(var(--accent))',
        agencyBorder: 'hsl(var(--border))',
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
