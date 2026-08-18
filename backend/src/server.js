const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use((cors));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Está rodando!");
});

const MONGO_URL = "mongodb://localhost:27017/library";

mongoose.connect(MONGO_URL).then(() => console.log("Conectado ao MongoDB!"))
.catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

