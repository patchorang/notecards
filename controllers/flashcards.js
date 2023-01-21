const flashcardRouter = require("express").Router();
const Flashcard = require("../models/Flashcard");
const Deck = require("../models/Deck");

// Get flashcards
flashcardRouter.get("/", async (request, response) => {
  const flashcards = await Flashcard.find({});
  return response.status(201).json(flashcards);
});

// get flashcard by id
flashcardRouter.get("/:id", async (request, response) => {
  const flashcard = await Flashcard.findOne({ id: request.params.id });
  return response.status(201).json(flashcard);
});

// Create flashcard
flashcardRouter.post("/", async (request, response) => {
  const data = request.body;
  const flashcard = new Flashcard({
    front: data.front,
    back: data.back,
    createdDate: new Date(),
    deckId: data.deckId,
  });

  const newFlashcard = await flashcard.save();

  // TODO: HANDLE DECK NOT FOUND
  const deck = await Deck.findOne({ id: data.deckId });
  deck.flashcards = deck.flashcards.concat(newFlashcard);
  await deck.save();

  response.status(201).json(newFlashcard);
});

// Update flashcard
flashcardRouter.put("/:id", async (request, response) => {
  const data = request.body;
  const updateFlashcard = await Flashcard.findByIdAndUpdate(
    request.params.id,
    data,
    { new: true }
  );
  return response.status(201).json(updateFlashcard);
});

// Remove flashcard
flashcardRouter.delete("/:id", async (request, response) => {
  const flashcardId = request.params.id;
  const deletedCard = await Flashcard.findOneAndDelete({ id: flashcardId });

  // TODO: HANDLE DECK NOT FOUND
  const deck = await Deck.findOne({ id: deletedCard.deck });
  deck.flashcards = deck.flashcards.filter(
    (flashcard) => flashcard.toString() !== flashcardId
  );
  await deck.save();
  return response.status(204).end();
});

module.exports = flashcardRouter;
