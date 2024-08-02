/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://127.0.0.1:8080/vecSearch/qna-embedding/:path*",
    },
  ],
};

export default nextConfig;
