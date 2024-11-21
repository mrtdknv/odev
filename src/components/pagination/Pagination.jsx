import React from "react";

function Pagination() {
  return (
    <div className="flex justify-center gap-4">
      <button
        className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 font-sans text-xs font-bold text-center text-red-800 uppercase align-middle transition-all rounded-full select-none hover:bg-red-900/10 active:bg-red-800/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          ></path>
        </svg>
        Previous
      </button>
      <div className="flex items-center gap-2">
        <button
          className="relative w-5 h-5 md:w-10 md:h-10 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            1
          </span>
        </button>
        <button
          className="relative w-5 h-5 md:w-10 md:h-10 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            2
          </span>
        </button>
        <button
          className="relative w-5 h-5 md:w-10 md:h-10 select-none rounded-full bg-red-800 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-red-800/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            3
          </span>
        </button>
        <button
          className="relative w-5 h-5 md:w-10 md:h-10 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            4
          </span>
        </button>
        <button
          className="relative w-5 h-5 md:w-10 md:h-10 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            5
          </span>
        </button>
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 font-sans text-xs font-bold text-center text-red-800 uppercase align-middle transition-all rounded-full select-none hover:bg-red-900/10 active:bg-red-800/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
