"use client";

import React, { useState, useEffect } from "react";

interface ThemeToggleProps {
  defaultDark?: boolean;
  onChange?: (isDark: boolean) => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ defaultDark = false, onChange, className = "" }) => {
  const [isDark, setIsDark] = useState(defaultDark);

  useEffect(() => {
    // Initialize from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document and save to localStorage
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    if (onChange) {
      onChange(isDark);
    }
  }, [isDark, onChange]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`inline-block ${className}`}>
      <label className="relative inline-block w-16 h-8">
        <input type="checkbox" className="sr-only" checked={isDark} onChange={toggleTheme} aria-label="Toggle dark mode" />
        <div
          className={`absolute cursor-pointer inset-0 rounded-full transition-colors duration-300 overflow-hidden ${
            isDark ? "bg-black" : "bg-blue-500"
          }`}
        >
          {/* Sun/Moon */}
          <div
            className={`absolute h-6 w-6 bottom-1 rounded-full transition-all duration-300 z-10 ${
              isDark ? "left-9 bg-gray-100 animate-[rotate-360_0.6s_ease-in-out]" : "left-1 bg-yellow-300"
            }`}
          >
            {/* Moon craters */}
            <div
              className={`absolute w-1.5 h-1.5 rounded-full bg-gray-400 left-2.5 top-0.5 transition-opacity duration-300 ${
                isDark ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute w-2 h-2 rounded-full bg-gray-400 left-0.5 top-2.5 transition-opacity duration-300 ${
                isDark ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute w-1 h-1 rounded-full bg-gray-400 left-4 top-4 transition-opacity duration-300 ${
                isDark ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>

          {/* Light rays */}
          <div
            className={`absolute left-0 top-0 w-10 h-10 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`absolute left-0 top-0 w-12 h-12 rounded-full bg-white/10 -translate-x-2/3 -translate-y-2/3 transition-opacity duration-300 ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`absolute left-0 top-0 w-14 h-14 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
          ></div>

          {/* Clouds */}
          <div
            className={`absolute left-2 top-1 flex gap-1 transition-opacity duration-300 ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-8 h-2 bg-white/80 rounded-full animate-[cloud-move_6s_infinite]"></div>
            <div className="w-4 h-2 bg-white/80 rounded-full animate-[cloud-move_6s_1s_infinite]"></div>
            <div className="w-6 h-2 bg-white/80 rounded-full animate-[cloud-move_6s_2s_infinite]"></div>
          </div>

          <div
            className={`absolute left-2 top-1 flex gap-1 transition-opacity duration-300 ${
              isDark ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-8 h-2 bg-gray-600 rounded-full animate-[cloud-move_6s_infinite]"></div>
            <div className="w-4 h-2 bg-gray-600 rounded-full animate-[cloud-move_6s_1s_infinite]"></div>
            <div className="w-6 h-2 bg-gray-600 rounded-full animate-[cloud-move_6s_2s_infinite]"></div>
          </div>

          {/* Stars */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-2 animate-[twinkle_2s_infinite]"></div>
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-4 left-1 animate-[twinkle_2s_0.3s_infinite]"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full top-5 left-3 animate-[twinkle_2s_0.6s_infinite]"></div>
            <div className="absolute w-2 h-2 bg-white rounded-full top-0.5 left-5 animate-[twinkle_2s_1.3s_infinite]"></div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
