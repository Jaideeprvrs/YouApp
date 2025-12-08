// babel.config.js (using ES Module syntax)
export default function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
}
