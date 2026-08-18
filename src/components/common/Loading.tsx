"use client";

import React from "react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  text = "Loading...",
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen
          ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm"
          : "min-h-[200px]"
      }`}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

      <p className="text-sm font-medium text-gray-600">
        {text}
      </p>
    </div>
  );
};

export default Loading;