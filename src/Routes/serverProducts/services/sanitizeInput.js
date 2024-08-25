const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9_-]/g, "");
};

module.exports = sanitizeInput;
