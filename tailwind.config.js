/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
      colors: {
        "artist-blue": "#c4dee6",
        "artist-purple": "#8b5cf6",
        "artist-cyan": "#06b6d4",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.5)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.3)",
      },
    },
  },
  plugins: [],
};
