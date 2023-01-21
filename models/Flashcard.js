const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  deck: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deck" }],
  createdDate: { type: Date, required: true },
});

flashcardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
