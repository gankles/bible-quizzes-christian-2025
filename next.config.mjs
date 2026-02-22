/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next-build',
  // Enable ISR for static generation
  trailingSlash: false,
  // Optimize images
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
    ],
    unoptimized: false,
  },
  // Enable compression
  compress: true,
  // Skip lint during build (run separately)
  eslint: { ignoreDuringBuilds: true },
  // Disable type checking in build (handled by IDE/CI)
  typescript: { ignoreBuildErrors: true },
  // PWA and performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
