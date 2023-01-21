const flashcardRouter = require("express").Router();
const Flashcard = require("../models/Flashcard");

flashcardRouter.get("/", async (request, response) => {
  const flashcards = await Flashcard.find({});
  return response.status(201).json(flashcards);
});

flashcardRouter.post("/", async (request, response) => {
  const data = request.body;
  const flashcard = new Flashcard({
    front: data.front,
    back: data.back,
    createdDate: new Date(),
    deck: data.deckId,
  });

  const newFlashcard = await flashcard.save();
  response.status(201).json(newFlashcard);
});

module.exports = flashcardRouter;
