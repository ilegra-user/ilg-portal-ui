module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      boxShadow: {
        focus: "rgb(99 179 237) 0px 0px 0px 1px",
        md: "0 1px 5px 0px rgb(0 0 0 / 0.1), 0 0px 3px -2px rgb(0 0 0 / 0.1)"
      },
      colors: {
        focus: "rgb(99, 179, 237)",
        orange: {
          25: "rgb(254 161 40)",
          50: "#ff6b0d",
          100: "rgb(231 105 70)",
          200: "rgb(228 82 44)",
          300: "rgb(224 61 21)",
        },
        purple: "#7c35a6",
        outline: "#f2b8b5",
        "gray-bold": "#75787a",
      },

      width: {
        320: "1280px",
      },
    },
  },
  plugins: [],
};
