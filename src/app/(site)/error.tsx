"use client";
import React from "react";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <BounceLoader color="#000000" size={64} />
      </div>
      <div className="font-bold my-2">Something went wrong...</div>
      <button
        onClick={handleGoBack}
        className="bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600"
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default Error;
