import type { NextConfig } from "next";
import type { Configuration as WebpackConfig, RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  devIndicators: false,
  trailingSlash: false,
  webpack(config: WebpackConfig) {
    const fileLoaderRule = config.module?.rules?.find(
      (rule): rule is RuleSetRule =>
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    config.module?.rules?.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    });

    return config;
  },
};

export default nextConfig;
