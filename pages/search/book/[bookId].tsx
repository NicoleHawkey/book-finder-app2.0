import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import InfoCard from "@/components/InfoCard";
import "tailwindcss/tailwind.css";
import { InfoCardProps } from "@/components/InfoCard";

const BookDetail: React.FC = () => {
  const router = useRouter();
  const { bookId } = router.query as { bookId: string };
  const [bookItem, setBookItem] = useState<InfoCardProps["bookItem"] | null>(
    null
  );

  useEffect(() => {
    if (bookId && !bookItem) {
      fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok" + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => setBookItem(data))
        .catch((error: Error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [bookId]);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <button
        onClick={goBack}
        className="p-2 w-24 bg-blue-500 dark:bg-cyan-900 dark:hover:bg-cyan-800 text-white text-sm rounded hover:bg-blue-700 hover:shadow-md transition duration-200 m-4"
      >
        &#8249; Back
      </button>
      {bookItem && <InfoCard bookId={bookId} bookItem={bookItem} />}
    </div>
  );
};

export default BookDetail;
