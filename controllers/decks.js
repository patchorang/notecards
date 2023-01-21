const deckRouter = require("express").Router();
const Deck = require("../models/Deck");
const Flashcard = require("../models/Flashcard");

// Get all decks
deckRouter.get("/", async (request, response) => {
  const decks = await Deck.find({}).populate("flashcards");
  response.json(decks);
});

// Get deck by id
deckRouter.get("/:id", async (request, response) => {
  const deck = await Deck.findById(request.params.id).populate("flashcards");
  return response.json(deck);
});

// remove deck
deckRouter.delete("/:id", async (request, response) => {
  await Deck.findByIdAndDelete(request.params.id);
  await Flashcard.deleteMany({ deckId: request.params.id });
  return response.status(204).end();
});

// Add deck
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
