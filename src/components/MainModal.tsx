import React from "react";
import { InfoCardProps } from "./InfoCard";

import { Modal } from "flowbite";

// import "../global.css";
import "tailwindcss/tailwind.css";

interface MainModalProps {
  closeModal: () => void;
  bookItem: InfoCardProps["bookItem"];
}

const MainModal: React.FC<MainModalProps> = ({ closeModal, bookItem }) => {
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 flex items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-[#f6f6f6] rounded-lg shadow dark:bg-gray-900">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {bookItem?.volumeInfo?.title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Categories: {bookItem?.volumeInfo?.categories}
            </p>
            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-800">
              {bookItem?.saleInfo?.retailPrice?.amount}{" "}
              {bookItem?.saleInfo?.retailPrice?.currencyCode}
            </p>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-900 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800 dark:shadow-cyan-800"
            >
              <a
                href={bookItem?.saleInfo?.buyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainModal;
