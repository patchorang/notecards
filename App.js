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

// const path = require("path");
const path = __dirname + "/client/public";
app.use(express.static(path));
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});
// app.use(express.static(path.join(__dirname, "/client/public")));
app.use("/api/decks", deckRouter);
app.use("/api/flashcards", flashcardRouter);

module.exports = app;
