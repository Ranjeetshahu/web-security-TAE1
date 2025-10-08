const { body, validationResult } = require("express-validator");

const validateInputRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only letters and spaces"),

  body("email")
    .trim()
    .isEmail().withMessage("Invalid email address"),

  body("message")
    .trim()
    .notEmpty().withMessage("Message cannot be empty")
    .isLength({ max: 200 }).withMessage("Message cannot exceed 200 characters"),
];

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// CommonJS export
module.exports = { validateInputRules, validateInput };
