/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/api/vecSearch/:path*", // vecSearch로 시작하는 요청
      destination: "http://127.0.0.1:8080/vecSearch/qna-embedding/:path*", // vecSearch 관련 프록시
    },
    {
      source: "/api/koreanTextSearch/:path*", // koreanTextSearch로 시작하는 요청
      destination: "http://127.0.0.1:8080/koreanTextSearch/qna-index/:path*", // koreanTextSearch 관련 프록시
    },
  ],
};

export default nextConfig;
