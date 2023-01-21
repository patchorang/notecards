require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const deckRouter = require("./controllers/decks");
const flashcardRouter = require("./controllers/flashcards");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/decks", deckRouter);
app.use("/api/flashcards", flashcardRouter);

module.exports = app;
