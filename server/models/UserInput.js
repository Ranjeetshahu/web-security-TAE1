const mongoose = require("mongoose");

const userInputSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("UserInput", userInputSchema);
