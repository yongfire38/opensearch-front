import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        open Search 에 오신 것을 환영합니다
      </h1>
      <div>
        <Link
          href="/vecSearch"
          className="text-blue-500 underline hover:text-blue-600"
        >
          벡터 검색 페이지로 이동
        </Link>
      </div>
      <div>
        <Link
          href="/koreanTextSearch"
          className="text-pink-500 underline hover:text-blue-600"
        >
          텍스트 검색 페이지로 이동
        </Link>
      </div>
    </div>
  );
}
