/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/workout_ads',
  assetPrefix: '/workout_ads/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
