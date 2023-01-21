const flashcardRouter = require("express").Router();
const Flashcard = require("../models/Flashcard");
const Deck = require("../models/Deck");

// Get flashcards
flashcardRouter.get("/", async (request, response) => {
  const flashcards = await Flashcard.find({});
  return response.status(201).json(flashcards);
});

// get flashcard by id
// TODO: Will match key of deck and return
flashcardRouter.get("/:id", async (request, response) => {
  const flashcard = await Flashcard.findById(request.params.id);
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
  const deck = await Deck.findById(data.deckId);
  deck.flashcards = deck.flashcards.concat(newFlashcard._id);
  await deck.save();

  return response.status(201).json(newFlashcard);
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
  const deletedCard = await Flashcard.findByIdAndDelete(flashcardId);

  // TODO: HANDLE DECK NOT FOUND
  const deck = await Deck.findById(deletedCard.deckId);
  deck.flashcards = deck.flashcards.filter(
    (flashcard) => flashcard.toString() !== flashcardId
  );
  await deck.save();
  return response.status(204).end();
});

module.exports = flashcardRouter;
