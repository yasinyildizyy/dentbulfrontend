module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "next/babel",
      {
        "preset-env": {
          modules: "commonjs",
        },
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true,
      },
    ],
    [
      "@babel/plugin-proposal-private-property-in-object",
      {
        loose: true,
      },
    ],
    [
      "@babel/plugin-proposal-private-methods",
      {
        loose: true,
      },
    ],
  ],
};
