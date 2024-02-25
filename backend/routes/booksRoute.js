import express from "express";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { validationResult } from "express-validator";
import './userRoute.js'

import jwt from "jsonwebtoken";

const router = express.Router();

//route for save/create a new book
router.post("/upload-book", async (request, response) => {
    try {
      // Certifique-se de que o ID do usuário está disponível na solicitação
      const userId = request.body.userId; // Supondo que você envie o ID do usuário no corpo da solicitação
  
      // Verifique se o userId é válido, dependendo da lógica do seu aplicativo
  
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
  
      // Criar um novo livro
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
        category: request.body.category,
        bookDescription: request.body.bookDescription,
        imageURL: request.body.imageURL,
        status: request.body.status,
        user: userId,
      };
  
      const book = await Book.create(newBook);
  
      // Adicione o ID do livro ao array de livros do usuário
      await User.findByIdAndUpdate(
        userId,
        { $push: { books: book._id } },
        { new: true }
      );
  
      return response.status(201).json(book);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

//route for get ALL books from database
router.get("/", async (request, response) => {
    try {
      const userId = request.query.userId;
      
  
      const user = await User.findById(userId).populate('books');
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      const responseData = {
        bookCount: user.books ? user.books.length : 0,
        books: user.books || [],
      };
  
      response.status(200).json(responseData);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  

//route for get ONE book from database
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for update a Book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.category ||
      !request.body.bookDescription ||
      !request.body.imageURL ||
      !request.body.status
    ) {
      return response.status(400).send({
        message:
          "Send all required fiels: title, author, publishYear, category, bookDescription, imageURL",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//att status



//route for delete a book

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
