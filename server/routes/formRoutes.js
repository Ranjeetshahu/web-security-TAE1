const express = require("express");
const { validateInputRules, validateInput } = require("../middlewares/validateInput"); // path to match your folder name
const { sanitizeInput } = require("../middlewares/sanitizeInput");
const { submitForm } = require("../controllers/formController");

const router = express.Router();

router.post("/submit", validateInputRules, validateInput, sanitizeInput, submitForm);

module.exports = router;
