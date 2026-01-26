import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //追加
  typescript: {
    // ビルド時の型チェックをスキップ
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLintのチェックもスキップ
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;