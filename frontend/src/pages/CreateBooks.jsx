import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import SideBar from "../components/SideBar";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [category, setCategory] = useState("");
  const [bookDescription, setbookDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = () => {
    // Redireciona para a página desejada
    navigate("/home");
  };

  const handleSaveBook = () => {
    const userId = localStorage.getItem("userId");

    const data = {
      title,
      author,
      publishYear,
      category,
      bookDescription,
      imageURL,
      status,
      userId,
    };

    setLoading(true);

    axios
      .post("http://localhost:5555/books/upload-book", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Livro Adicionado com Sucesso!", {
          variant: "success",
        });
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
      <form>
        {loading ? <Spinner /> : ""}
        <div className="flex justify-center items-center">
          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <div className=" gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <BackButton />
              <h1 className="text-3xl my-4">Adicione um Livro</h1>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Título
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Autor
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Categoria
                  </label>
                  <div className="mt-2">
                    <select
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                    >
                      <option>--</option>
                      <option>Romance</option>
                      <option>Young Adult</option>
                      <option>Ficção</option>
                      <option>Fantasia</option>
                      <option>Terror</option>
                      <option>Suspense</option>
                      <option>Mangá</option>
                      <option>Poesia</option>
                      <option>Educação</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3 ">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ano de Publicação
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Sinopse
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={bookDescription}
                      onChange={(e) => setbookDescription(e.target.value)}
                      rows={6}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Fale um pouco sobre o Livro
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Imagem URL
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Status
                  </label>
                  <div className="mt-2">
                    <select
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                    >
                      <option>--</option>
                      <option>Não lido</option>
                      <option>Lido</option>
                      <option>Lendo</option>
                      <option>Parado</option>
                      <option>Largado</option>
                      <option>Não vou ler</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSaveBook}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBooks;
