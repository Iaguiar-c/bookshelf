import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import SideBar from "../components/SideBar";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Livro Deletado com Sucesso", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);

        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div>
      <SideBar />
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Deletar Livro</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">
            Você Tem Certeza que Deseja Deletar este Livro?
          </h3>

          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDeleteBook}
          >
            Sim, Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
