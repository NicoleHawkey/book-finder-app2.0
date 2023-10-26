import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import Image from "next/image";

import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    infoLink: string;
  };
}

const Search: React.FC = () => {
  const isDarkMode =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAllResults, setShowAllResults] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);

  const router = useRouter();
  const urlSearch = router.query;

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const data = await response.json();
      if (data.items) {
        setBooks(data.items);
      }
    } catch (err: any) {
      console.error("Error with fetching", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const topBooks = books?.slice(0, 4);
  const displayedBooks = showAllResults ? books : topBooks;
  const showSeeMoreButton = books.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      query: {
        search_query: query,
      },
    });

    const updatedSearchHistory = [query, ...searchHistory].slice(0, 8);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
    setSearchHistory(updatedSearchHistory);
  };

  const seeMoreHandler = () => {
    setShowAllResults(!showAllResults);
    if (showAllResults) {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (urlSearch && urlSearch.search_query) {
      handleSearch(urlSearch.search_query as string);
    }
  }, [urlSearch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHistory = localStorage.getItem("searchHistory");
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const handleHistoryBtn = () => {
    setIsHistoryVisible(true);
  };

  const hideHistory = () => {
    setIsHistoryVisible(false);
  };

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-800">
      <Navbar />
      <div className="mt-10 p-4 md:mt-20 md:p-6 flex flex-col justify-center items-center text-sm md:text-2xl w-full md:w-3/4 mx-auto ">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className="flex flex-col text-center dark:text-white w-full md:w-2/3 mb-6 md:mb-0">
            <p className="px-2">
              You can still locate the{" "}
              <span className="text-blue-400 dark:text-cyan-700">book</span>{" "}
              without knowing its title. <br className="hidden md:inline" />{" "}
              Simply enter the author's or publisher's name, search, and
              discover!
            </p>
            <div className="flex flex-col md:flex-row mt-5 mb-5 justify-center md:justify-start">
              <form onSubmit={handleSubmit} className="relative w-full ">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type book name, author, ..."
                  className="bg-slate-300 p-3 dark:text-black w-full md:w-96 rounded-full lg:rounded-l-lg lg:rounded-r-none text-sm mt-6 md:mt-10"
                />
                <button className="p-3 w-full md:w-40 bg-blue-600 dark:bg-cyan-900 text-white text-sm hover:bg-blue-700 rounded-full lg:rounded-r-lg lg:rounded-l-none hover:shadow-md dark:hover:bg-cyan-800 transition duration-200 mt-6 md:mt-10">
                  Search
                </button>
              </form>
              {error && <p className="text-red-500 mt-5">{error}</p>}
            </div>
          </div>
          <div className="w-3/4 sm:w-2/3 md:w-1/3 lg:w-1/3 xl:w-1/4 mt-6">
            <Image
              src={"/bookshelves.svg"}
              alt="book"
              width={350}
              height={250}
              className="w-full"
            />
          </div>
        </div>
        <div
          className={`fixed top-0 right-0 bottom-0 left-0 bg-opacity-30 bg-white flex justify-center items-center ${
            isLoading ? "block" : "hidden"
          }`}
        >
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500 dark:border-cyan-600"></div>
        </div>
        <ul className="flex flex-wrap justify-center items-center w-full mt-10">
          {displayedBooks.map((book) => (
            <li
              key={book.id}
              className="m-2 md:m-4 lg:m-8 w-full md:w-1/2 lg:w-1/3"
            >
              <BookCard book={book?.volumeInfo} id={book?.id} />
            </li>
          ))}
        </ul>
        {showSeeMoreButton && (
          <button
            onClick={seeMoreHandler}
            className={`px-4 py-2 md:py-3 md:w-32 text-lg bg-blue-600 dark:bg-cyan-900 text-white hover:bg-blue-700 hover:shadow-md dark:hover:bg-cyan-700 transition duration-200 rounded-lg mt-2 md:mt-10 animate-bounce 
            ${showAllResults ? "hidden" : "block"}`}
          >
            See More
          </button>
        )}
        {/* Search History */}
        {!isHistoryVisible && (
          <button
            className="fixed bottom-2 right-2 lg:bottom-8 lg:right-8 rounded-full border w-12 h-12 bg-blue-400 hover:bg-blue-500 dark:bg-cyan-900 dark:hover:bg-cyan-700 text-white"
            onClick={handleHistoryBtn}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl" />
          </button>
        )}
        {isHistoryVisible && (
          <div className="fixed bottom-4 right-4 w-64 md:w-52 sm:w-36 md:h-52 sm:h-40 bg-slate-50 border border-gray-800 dark:bg-gray-900 dark:border-gray-50 overflow-y-auto shadow-lg p-4 rounded text-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-base md:text-md dark:text-white">
                Search History
              </h2>
              <button className="text-base md:text-sm">
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={hideHistory}
                  className="text-md hover:animate-spin-slow dark:text-white"
                />
              </button>
            </div>
            <ul className="text-xs md:text-xs text-gray-600 dark:text-gray-200 flex-grow list-decimal ml-4">
              {searchHistory.map((term) => (
                <li key={term} className="mb-2">
                  {term}
                </li>
              ))}
            </ul>
            <button
              onClick={handleClear}
              className="mt-auto rounded-md bg-rose-500 hover:bg-rose-600 dark:text-white w-16 h-8 text-xs self-end"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
