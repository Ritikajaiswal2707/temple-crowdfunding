/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.pexels.com' }
    ],
  },
  // Expose mock flag to the client for conditional UI
  env: {
    NEXT_PUBLIC_MOCK_MODE: process.env.MOCK_MODE === 'true' ? 'true' : 'false',
  },
};

export default nextConfig;
