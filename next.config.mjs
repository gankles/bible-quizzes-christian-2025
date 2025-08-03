/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Enable ISR for static generation
  trailingSlash: false,
  // Optimize images
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  // Enable compression
  compress: true,
  // PWA and performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
