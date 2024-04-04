/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    extend: {
      fontFamily: {
        paragraph: ["Caviar Dreams", "system-ui", "sans-serif"],
        title: ["EVER LOOSER", "Caviar Dreams", "system-ui", "sans-serif"],
        subTitle: [
          "Rayville Free Personal Use",
          "Caviar Dreams",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [animations],
};
