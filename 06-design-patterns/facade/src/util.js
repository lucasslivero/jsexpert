const safeRegex = require("safe-regex");

class InvalidRegexError extends Error {
  constructor(exp) {
    super(`This ${exp} is unsafe !`);
    this.name = "InvalidRegexError";
  }
}

function evaluateRegex(expression) {
  const isSafe = safeRegex(expression);
  if (isSafe) {
    return expression;
  }
  throw new InvalidRegexError(expression);
}

module.exports = { evaluateRegex, InvalidRegexError };
