import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import userRoutes from './routes/userRoute.js'; 

const app = express();



// Middleware para analisar o corpo da solicitação
app.use(express.json());

// Middleware para lidar com a política CORS
app.use(cors());

// Rota padrão
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Olá");
});

// Rotas para livros
app.use('/books', booksRoute);

// Rotas do usuário
app.use('/api/user', userRoutes);

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App connected to the database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
