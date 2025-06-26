  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    devIndicators: false,
    webpack(config) {
      // Add SVGR loader
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg')
      );
      if (fileLoaderRule) {
        // Exclude SVG files from the default loader
        fileLoaderRule.exclude = /\.svg$/;
      }

      // Add a new rule for .svg files
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/, // Only when imported from TS/JS files
        use: ["@svgr/webpack"],
      });

      return config;
    },
  };

  export default nextConfig;
