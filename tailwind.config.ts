import type { Config } from "tailwindcss";

const config: Config = {
  // 1. ESTO ES LO CRUCIAL PARA EL MODO DARK
  darkMode: "class",

  // 2. AQUÍ LE DECIMOS DÓNDE BUSCAR TUS COMPONENTES
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      // Por si usas estructura antigua
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Por si usas estructura antigua
  ],

  theme: {
    extend: {
      // 3. DEFINICIÓN DE ANIMACIONES PERSONALIZADAS (Para el Hero)
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;