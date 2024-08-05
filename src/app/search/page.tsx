"use client";

import { useState } from "react";
import Loading from "../(site)/loading";
import Error from "../(site)/error";

// API 응답 인터페이스 정의
interface SearchResult {
  resultCode: number;
  resultMessage: string;
  result: {
    resultList: {
      id: string;
      url: string;
      questionSubject: string;
      questionContent: string;
      score: number;
    }[];
  };
}

export default function SearchPage() {
  // 상태 관리
  const [query, setQuery] = useState<string>(""); // 문자열로 초기화
  const [searchResults, setSearchResults] = useState<
    { id: string; url: string; questionSubject: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 관리
  const [hasError, setHasError] = useState<boolean>(false); // 에러 상태 관리

  // 검색 핸들러
  const handleSearch = async () => {
    // query가 빈 문자열인지 확인
    if (query.trim() === "") {
      console.error("검색어가 비어 있습니다.");
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      // API 요청
      const response = await fetch(`/api/search/${encodeURIComponent(query)}`);
      const data: SearchResult = await response.json();

      // 응답 처리
      if (data.resultCode === 200) {
        const results = data.result.resultList.map((item) => ({
          id: item.id,
          url: item.url,
          questionSubject: item.questionSubject,
        }));
        setSearchResults(results);
      } else {
        console.error("검색 실패:", data.resultMessage);
        setHasError(true);
      }
    } catch (error) {
      console.error("에러 발생:", error);
      setHasError(true);
    } finally {
      setIsLoading(false); // 로딩 상태 업데이트
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">검색</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="flex-1 p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          검색
        </button>
      </div>

      {isLoading ? (
        <Loading /> // 로딩 컴포넌트 표시
      ) : hasError ? (
        <Error /> // 에러 컴포넌트 표시
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">검색 결과</h2>
          <ul className="list-disc list-inside">
            {searchResults.map(({ id, url, questionSubject }) => (
              <li key={id}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline cursor-pointer"
                >
                  {questionSubject}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
