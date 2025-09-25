export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // light-blue
          dark: "#2563EB",   // darker hover blue
          light: "#E0F2FE",  // very soft background
        },
        secondary: "#14B8A6", // teal accent (optional)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // modern & clean font
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
}
