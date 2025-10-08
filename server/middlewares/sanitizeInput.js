const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (req, res, next) => {
  const sanitized = {};
  for (const key in req.body) {
    sanitized[key] = sanitizeHtml(req.body[key], {
      allowedTags: [],      // remove all HTML tags
      allowedAttributes: {}, 
    }).trim();
  }
  req.body = sanitized;
  next();
};

// CommonJS export
module.exports = { sanitizeInput };
