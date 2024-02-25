import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import BookDeleteModal from "../components/home/BookModal";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Obtenha o ID do usuário do localStorage
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:5555/books?userId=${userId}`)
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleUploadBook = () => {
    navigate("/books/create");
  };

  const totalBooks = books.length;

  return (
    <div>
      <SideBar />

      <div className="p-4">
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
        <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Total: {totalBooks}</h1>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleUploadBook}
          >
            Novo +
          </button>
         
        </div>
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
