import React, { useState } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="relative m-[2px] mb-3 mr-5 float-left">
      <label htmlFor="inputSearch" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          id="inputSearch"
          type="text"
          placeholder="Título, Gênero, Autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 text-neutral-500 dark:text-neutral-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
        {filteredBooks.map((item) => (
          <BookSingleCard key={item._id} book={item} />
        ))}
      </div>
    </div>
  );
};

export default BooksCard;
