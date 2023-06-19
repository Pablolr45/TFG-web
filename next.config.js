/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:3001/:path*" },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
