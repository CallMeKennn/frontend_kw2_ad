/** @type {import('next').NextConfig} */
const nextConfig = {
     reactStrictMode: false,
     typescript: {
          ignoreBuildErrors: true, // Bỏ qua lỗi TypeScript khi build
     },
     eslint: {
          ignoreDuringBuilds: true, // Bỏ qua lỗi ESLint khi build
     },
};

export default nextConfig;
