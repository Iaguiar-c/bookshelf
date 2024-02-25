import { Link } from "react-router-dom";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { useState } from "react";
import BookModal from "./BookModal";
import FavoritesModal from "../FavoritesModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCloseFavoritesModal = () => {
    setShowFavoritesModal(false);
  };

  return (
    <div
      className="bg-white relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={book.imageURL}
            alt={book.title}
            className="h-[20rem] w-full object-cover object-center group-hover:opacity-75"
          />
          {isHovered && (
            <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full opacity-80 hover:opacity-100"
            onClick={() => setShowFavoritesModal(true)}
          >
            Avaliar
          </button>
          )}
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{book.author}</h3>
        <h2 className="mt-4 text-sm text-gray-700">{book.status}</h2>

        <p className="mt-1 text-lg font-medium text-gray-900">{book.title}</p>
        <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
          <BiShow
            className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal(true)}
          />

          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
          </Link>
        </div>
        {showModal && (
          <BookModal book={book} onClose={() => setShowModal(false)} />
        )}
        {showFavoritesModal && (
          <FavoritesModal
            key={`favorites-modal-${Date.now()}`}
            book={book}
            onClose={handleCloseFavoritesModal}
          />
        )}
      </div>
    </div>
  );
};
export default BookSingleCard;
