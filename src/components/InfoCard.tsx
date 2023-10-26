import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import MainModal from "./MainModal";

export interface InfoCardProps {
  bookId: string;
  bookItem: {
    volumeInfo?:
      | {
          imageLinks?:
            | {
                thumbnail?: string | undefined;
              }
            | undefined;
          title?: string | undefined;
          authors?: string[] | undefined;
          description?: string | undefined;
          pageCount?: number | undefined;
          infoLink?: string | undefined;
          categories: string;
        }
      | undefined;
    saleInfo?: {
      buyLink?: string | undefined;
      retailPrice?:
        | {
            amount: string;
            currencyCode: string;
          }
        | undefined;
    };
  };
}

const InfoCard: React.FC<InfoCardProps> = ({ bookItem, bookId }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const stripPTags = (input: any) => {
    return input?.replace(/<\/?p>/g, "") || "";
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-4 mt-16 mx-4 md:mx-44 space-y-4 md:space-y-0 md:space-x-4">
      <div
        className="w-full md:w-246 h-64 md:h-370 bg-cover bg-center rounded-lg shadow-lg mb-4 md:mb-0"
        style={{
          backgroundImage: `url(${bookItem?.volumeInfo?.imageLinks?.thumbnail})`,
        }}
      />
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-md w-full dark:bg-slate-900 dark:shadow-cyan-900">
        <p className="text-xl font-bold mb-2 dark:text-slate-100">
          {bookItem?.volumeInfo?.title}
        </p>
        <p className="text-lg dark:text-slate-300 mb-4">
          {bookItem?.volumeInfo?.authors?.join(", ")}
        </p>

        <div
          className="text-sm text-gray-700 dark:text-slate-400"
          dangerouslySetInnerHTML={{
            __html: stripPTags(bookItem?.volumeInfo?.description),
          }}
        />
        <p className="text-slate-600 text-xs mt-2 dark:text-slate-300">
          {bookItem?.volumeInfo?.pageCount} Pages
        </p>
        <div className="flex flex-row justify-between ">
          {bookItem?.volumeInfo?.infoLink ? (
            <button className="p-2 w-24 bg-blue-500 text-white text-sm rounded hover:bg-blue-700 dark:bg-cyan-900 dark:hover:bg-cyan-800 hover:shadow-lg transition duration-200 mt-6">
              <a
                href={bookItem.volumeInfo.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                More Info
              </a>
            </button>
          ) : null}
          {bookItem?.saleInfo?.buyLink ? (
            <button
              onClick={toggleModal}
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className="block text-white bg-blue-500 hover:bg-blue-700 dark:bg-cyan-900 dark:hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded text-sm p-2 w-24 mt-6 text-center"
              type="button"
            >
              Buy
            </button>
          ) : null}
        </div>
        {showModal && (
          <MainModal closeModal={toggleModal} bookItem={bookItem} />
        )}
      </div>
    </div>
  );
};

export default InfoCard;
