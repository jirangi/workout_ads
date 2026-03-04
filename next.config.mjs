/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 정적 사이트로 배포
  basePath: '/workout_ads', // 리포지토리 이름과 일치시켜야 함
  images: {
    unoptimized: true, // GitHub Pages는 이미지 최적화를 지원하지 않음
  },
};

export default nextConfig;
