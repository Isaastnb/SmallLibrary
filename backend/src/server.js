const { webcrypto } = require('crypto');
if(!globalThis.crypto){
  globalThis.crypto = webcrypto;
}
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const Book = require("./models/Book");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/book", bookRoutes);

app.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Erro ao buscar livros: ', error);
    res.status(500).json({message: 'Erro ao buscar os livros'});
  }
});

const MONGO_URL = process.env.MONGO_URI || "mongodb://localhost:27017/library";

mongoose.connect(MONGO_URL).then(() => console.log("Conectado ao MongoDB!"))
.catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

