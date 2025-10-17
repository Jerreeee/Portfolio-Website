  /** @type {import('next').NextConfig} */

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

  const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: true,
    webpack(config) {
      config.plugins.push(new CaseSensitivePathsPlugin());

      // Find the existing file-loader rule that handles SVGs
      const fileLoaderRule = config.module.rules.find(
        (rule) =>
          typeof rule === 'object' &&
          rule !== null &&
          'test' in rule &&
          rule.test instanceof RegExp &&
          rule.test.test('.svg')
      );

      // Exclude .svg from the default file loader
      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/;
      }

      // Add svg-inline-loader for inline SVGs
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false,
          svgo: { plugins: [{ name: 'removeDimensions', active: false }] }
        }
      });

      return config;
    },
  };

  module.exports = nextConfig;
