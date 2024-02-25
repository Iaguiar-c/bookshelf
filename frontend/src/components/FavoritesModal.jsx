/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Rating } from "@material-tailwind/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FavoritesModal = ({ book }) => {
  const [open, setOpen] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Recuperar a avaliação e o comentário do localStorage para este livro específico
    const savedRating = localStorage.getItem(`bookRating-${book._id}`);
    const savedComment = localStorage.getItem(`bookComment-${book._id}`);

    if (savedRating) {
      setRating(parseFloat(savedRating));
    }

    if (savedComment) {
      setComment(savedComment);
    }
  }, [book._id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSaveComment = () => {
    // Salvar a avaliação e o comentário no localStorage para este livro específico
    localStorage.setItem(`bookRating-${book._id}`, rating);
    localStorage.setItem(`bookComment-${book._id}`, comment);
    setOpen(false);
  };

  useEffect(() => {
    console.log("Rating state:", rating);
    console.log("Comment state:", comment);
  }, [rating, comment]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          enterTo="opacity-100 translate-y-0 md:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 md:scale-100"
          leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={book.imageURL}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {book.title}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <p className="text-2xl text-gray-900">{book.author}</p>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <form>
                          <Rating
                            key={rating} // Adicione esta linha
                            value={rating}
                            onChange={(value) => setRating(value)}
                          />

                          <div className="mt-4">
                            <label
                              htmlFor="comment"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Comentário
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              rows="4"
                              value={comment}
                              onChange={handleCommentChange}
                              className="mt-1 p-2 block w-full shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            ></textarea>
                          </div>

                          <button
                            type="button"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={handleSaveComment}
                          >
                            Avaliar e Comentar
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FavoritesModal;
