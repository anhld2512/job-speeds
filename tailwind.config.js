/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake",'halloween','bumblebee'],
  },
  // Themes 1 Dark
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: "#009eff",
  //         secondary: "#008aff",
  //         accent: "#e20000",
  //         neutral: "#31252a",
  //         "base-100": "#262738",
  //         info: "#00a3e6",
  //         success: "#6ca500",
  //         warning: "#c45100",
  //         error: "#ff7384",
  //       },
  //     },
  //   ],
  // },
  // Themes 1 Brows
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: "#0055ff",

  //         secondary: "#006cff",

  //         accent: "#f70000",

  //         neutral: "#0c1314",

  //         "base-100": "#352827",

  //         info: "#00f6ff",

  //         success: "#587300",

  //         warning: "#ff7e00",

  //         error: "#da0043",
  //       },
  //     },
  //   ],
  // },
  plugins: [require("daisyui")],
};
