import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface BookCardProps {
  book: {
    title?: string;
    authors?: string[];
    averageRating?: number;
    imageLinks?: {
      thumbnail?: string;
    };
    publisher?: string;
    publishedDate?: string;
  };
  id: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, id }) => {
  let title = book.title || "";
  const newTitle = title.slice(0, 100);

  const authors = Array.isArray(book.authors)
    ? book.authors.slice(0, 20).join(", ")
    : "";

  const fallbackImage = "/illustration-of-book-icon.jpeg";

  const wholeStars = Math.floor(book.averageRating || 0);
  const halfStar = (book.averageRating || 0) % 1 >= 0.5;

  return (
    <div className="flex flex-col sm:flex-row h-auto sm:h-64 w-full max-w-full shadow-xl bg-white dark:bg-gray-900 dark:shadow-cyan-900 rounded-lg overflow-hidden hover:-translate-y-2.5">
      <div className="w-full sm:w-1/2 lg:w-1/3 h-48 sm:h-auto flex-none bg-cover rounded-l-lg overflow-hidden">
        <a href={`/search/book/${id}`}>
          <img
            src={book.imageLinks?.thumbnail || fallbackImage}
            alt="Book Cover"
            className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:cursor-pointer"
          />
        </a>
      </div>
      <div className="w-full sm:w-1/2 lg:w-3/4 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between leading-normal">
        <div className="mb-4">
          <div className="text-gray-900 dark:text-slate-100 font-bold text-lg mb-2">
            {newTitle}
          </div>
          <p className="text-gray-800 dark:text-slate-300 text-base leading-none">
            {authors}
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            {book.publisher && `${book.publisher} | `} Release Date{" "}
            {book.publishedDate}
          </p>
        </div>
        <div>
          <div className="flex items-center mb-2 text-base">
            {Array(5)
              .fill(null)
              .map((_, index) => {
                if (index < wholeStars) {
                  return (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className="text-yellow-300"
                    />
                  );
                } else if (index === wholeStars && halfStar) {
                  return (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStarHalfStroke}
                      className="text-yellow-300"
                    />
                  );
                } else {
                  return (
                    <FontAwesomeIcon
                      key={index}
                      icon={farStar}
                      className="text-gray-300"
                    />
                  );
                }
              })}
          </div>
          <button className="p-2 w-24 bg-blue-600 dark:bg-cyan-900 text-white text-sm rounded hover:bg-blue-700 dark:hover:bg-cyan-800 hover:shadow-md transition duration-200">
            <a href={`/search/book/${id}`}>More &#8250;</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
