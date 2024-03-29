import React, { useState } from "react";

const BooksTable = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="relative m-[2px] mb-3 mr-5 float-left">
        <label htmlFor="inputSearch" className="sr-only">
          Search
        </label>
        <input
          id="inputSearch"
          type="text"
          placeholder="Título, Gênero, Autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
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
      <table className="w-full border-separate border-spacing-2">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                ></input>
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Nº
            </th>
            <th scope="col" className="px-6 py-3">
              Título
            </th>
            <th scope="col" className="px-6 py-3">
              Autor
            </th>
            <th scope="col" className="px-6 py-3">
              Gênero
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr
              key={book._id}
              className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${index + 1}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ></input>
                  <label
                    htmlFor={`checkbox-table-search-${index + 1}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {indexOfFirstBook + index + 1}
              </th>
              <td className="px-6 py-4">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">{book.category}</td>
              <td className="px-6 py-4">{book.status}</td>
              <td className="px-6 py-4 space-x-2">
                <a
                  href={`/books/details/${book._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Ver
                </a>

                <a
                  href={`/books/edit/${book._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline "
                >
                  Editar
                </a>

                <a
                  href={`/books/delete/${book._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline "
                >
                  Deletar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="mt-5 flex items-center justify-between text-sm"
        aria-label="Page navigation example"
      >
        <p>
          Mostrando{" "}
          <strong>
            {indexOfFirstBook + 1}-
            {Math.min(indexOfLastBook, filteredBooks.length)}
          </strong>{" "}
          de <strong>{filteredBooks.length}</strong>
        </p>

        <ul className="list-style-none flex">
          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#!"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
            >
              Anterior
            </a>
          </li>

          {/* Números das páginas */}
          {Array.from(
            { length: Math.ceil(filteredBooks.length / booksPerPage) },
            (_, index) => (
              <li key={index}>
                <a
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                    currentPage === index + 1
                      ? "font-medium text-blue-700 bg-blue-100"
                      : "text-neutral-600"
                  } transition-all duration-300`}
                  href="#!"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            )
          )}

          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#!"
              onClick={() =>
                paginate(
                  Math.min(
                    currentPage + 1,
                    Math.ceil(filteredBooks.length / booksPerPage)
                  )
                )
              }
            >
              Próximo
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BooksTable;
