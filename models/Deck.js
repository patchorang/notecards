const mongoose = require("mongoose");

const deckSchema = new mongoose.Schema({
  flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flashcard" }],
  name: String,
  createdDate: { type: Date, required: true },
});

deckSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Deck", deckSchema);
