"use client";
import React from "react";
import { BounceLoader } from "react-spinners";

const Error = () => {
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <BounceLoader color="#000000" size={64} />
      </div>
      <div className="font-bold my-2">Something went wrong...</div>
    </div>
  );
};

export default Error;
