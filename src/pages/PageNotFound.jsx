import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <p className="text-4xl font-semibold text-red-600">Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="cursor-pointer border border-gray-400 text-xl px-6 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
