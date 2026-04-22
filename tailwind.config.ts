import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        muted: "#F5F5F5",
        accent: {
          yellow: "#FFDD33",
          pink: "#FF6B9D",
          blue: "#5B8FFF",
          green: "#8FE066",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Pretendard", "system-ui", "sans-serif"],
        body: ["Pretendard", "Space Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0 0 #000000",
        "brutal-lg": "6px 6px 0 0 #000000",
        "brutal-sm": "2px 2px 0 0 #000000",
      },
      borderWidth: {
        "3": "3px",
      },
    },
  },
  plugins: [],
};

export default config;
