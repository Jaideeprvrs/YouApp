// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// ✅ For SVG support (react-native-svg-transformer)
// If you don't use this, you can delete this block.
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

const { assetExts, sourceExts } = config.resolver;
config.resolver.assetExts = assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts = [...sourceExts, "svg"];

module.exports = config;
