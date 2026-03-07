import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  color?: "pink" | "white" | "gray";
  fullScreen?: boolean;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  color = "pink",
  fullScreen = false,
  text,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    pink: "border-pink-600 border-t-pink-200",
    white: "border-white border-t-white/50",
    gray: "border-gray-600 border-t-gray-200",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin`}
      />
      {text && (
        <p className={`mt-4 text-${color === "white" ? "white" : "gray-600"}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loading;
