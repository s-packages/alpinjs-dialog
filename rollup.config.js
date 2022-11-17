import css from "rollup-plugin-import-css";

export default {
  input: "index.js",
  output: { file: "dist/index.js", format: "esm" },
  plugins: [css()],
};
