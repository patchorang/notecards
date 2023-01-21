const deckRouter = require("express").Router();
const Deck = require("../models/Deck");

deckRouter.get("/", async (request, response) => {
  const decks = await Deck.find({}).populate("flashcards");
  response.json(decks);
});

deckRouter.post("/", async (request, response) => {
  const data = request.body;
  const deck = new Deck({
    name: data.name,
    createdDate: new Date(),
  });

  const savedDeck = await deck.save();
  return response.status(201).json(savedDeck);
});

module.exports = deckRouter;
