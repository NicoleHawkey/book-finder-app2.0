import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

import "tailwindcss/tailwind.css";

const Home: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const checkDarkMode = () =>
    setIsDark(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    checkDarkMode();

    const themeChanged = (e: TransitionEvent): void => {
      if (e.propertyName === "classList") {
        checkDarkMode();
      }
    };

    document.documentElement.addEventListener("transitionend", themeChanged);

    return () => {
      document.documentElement.removeEventListener(
        "transitionend",
        themeChanged
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-800">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:pt-28 text-center">
        <h1 className="text-4xl sm:text-6xl mb-6 mt-10 sm:mb-10 dark:text-white">
          Discover{" "}
          <span className="inline-flex space-x-1">
            <span
              className="text-blue-400 dark:text-cyan-700 animate-bounce"
              style={{ animationDelay: "0.1s" }}
            >
              b
            </span>
            <span
              className="text-blue-400 dark:text-cyan-700 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            >
              o
            </span>
            <span
              className="text-blue-400 dark:text-cyan-700 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            >
              o
            </span>
            <span
              className="text-blue-400 dark:text-cyan-700 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            >
              k
            </span>
            <span
              className="text-blue-400 dark:text-cyan-700 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              s
            </span>
          </span>{" "}
          from all corners of the world.
        </h1>
        <p className="text-lg sm:text-xl mb-4 sm:mb-6 dark:text-white">
          Whether you remember the book's title, its author, or even the
          publisher, <br /> just type in what you recall and begin your search.
        </p>
        <Link href="/search">
          <button className="p-3 sm:p-4 w-44 sm:w-52 bg-blue-600 dark:bg-cyan-900 text-white text-sm sm:text-base rounded hover:bg-blue-700 dark:hover:bg-cyan-800 hover:shadow-lg transition duration-200">
            Search now &#8594;
          </button>
        </Link>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-36 sm:w-48 h-36 sm:h-48">
            <Image
              src={"/book_lover.svg"}
              alt="Reading"
              priority={false}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
