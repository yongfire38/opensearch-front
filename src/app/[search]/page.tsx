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

export default function SearchPage({ params }: { params: { search: string } }) {
  // 상태 관리
  const [query, setQuery] = useState<string>(""); // 문자열로 초기화
  const [searchResults, setSearchResults] = useState<
    { id: string; url: string; questionSubject: string }[]
  >([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    string[]
  >([]); // 자동완성 제안
  const [isAutocompleteVisible, setIsAutocompleteVisible] =
    useState<boolean>(false); // 자동완성 표시 여부
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
      const response = await fetch(
        `/api/${params.search}/${encodeURIComponent(query)}`
      );
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

  // 자동완성 핸들러
  const handleAutocomplete = async (input: string) => {
    if (input.trim() === "") {
      setAutocompleteSuggestions([]);
      return;
    }

    try {
      // 자동완성 API 요청
      const response = await fetch(
        `/api/koreanTextSearch/${encodeURIComponent(input)}`
      );
      const data: SearchResult | undefined = await response.json();

      // 응답 데이터가 정의되었는지 확인
      if (data && data.resultCode === 200) {
        const suggestions = data.result.resultList.map(
          (item) => item.questionSubject
        );
        console.log("Autocomplete Suggestions:", suggestions);
        setAutocompleteSuggestions(suggestions);
      } else {
        console.error("Invalid data format:", data);
        setAutocompleteSuggestions([]);
      }
    } catch (error) {
      console.error("자동완성 에러 발생:", error);
      setAutocompleteSuggestions([]);
    }
  };

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    handleAutocomplete(inputValue);
  };

  // 포커스가 입력창에 들어갔을 때 자동완성 표시
  const handleInputFocus = () => {
    setIsAutocompleteVisible(true);
  };

  // 포커스가 입력창에서 벗어났을 때 자동완성 숨김
  const handleInputBlur = () => {
    setIsAutocompleteVisible(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">검색</h1>
      <div className="flex mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="검색어를 입력하세요"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {isAutocompleteVisible &&
            autocompleteSuggestions &&
            autocompleteSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded shadow-md mt-1 z-10">
                {autocompleteSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => {
                      setQuery(suggestion);
                      setAutocompleteSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-2"
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
