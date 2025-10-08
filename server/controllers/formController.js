const UserInput = require("../models/UserInput");

const submitForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newEntry = new UserInput({ name, email, message });
    await newEntry.save();

    res.status(201).json({ success: true, message: "Data saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { submitForm };
