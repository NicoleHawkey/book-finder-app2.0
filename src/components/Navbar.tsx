import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
      setIsDark(storedTheme === "dark");
    } else {
      const userPrefersDark: boolean =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(userPrefersDark);
      document.documentElement.classList.toggle("dark", userPrefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4 text-white shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold">
          BookFinder
        </Link>
        <div className="flex space-x-4">
          <Link
            href="https://github.com/NicoleHawkey/book-finder-app"
            className="text-white dark:text-slate-200 hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </Link>
          <Link
            href="https://www.linkedin.com/in/nicole-hawkey123/"
            className="text-white dark:text-slate-200 hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </Link>
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {isDark ? (
              <span className="bg-black p-1 text-xl rounded-full">🌙</span>
            ) : (
              <span className="bg-blue-800 p-1 text-xl rounded-full">☀️</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
