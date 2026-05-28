import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        platinum: "#eef2f6",
        gold: "#b8892f",
        ruby: "#9f1239",
        emerald: "#047857"
      },
      boxShadow: {
        soft: "0 14px 45px rgba(17,24,39,.08)"
      }
    }
  },
  plugins: []
};

export default config;
