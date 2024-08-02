import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        VecSearch에 오신 것을 환영합니다
      </h1>
      <Link
        href="/search"
        className="text-blue-500 underline hover:text-blue-600"
      >
        검색 페이지로 이동
      </Link>
    </div>
  );
}
