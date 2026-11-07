/**
 * Checks that an answer is one of the four valid quiz choices (1-4).
 * Used by Question.jsx before an answer is saved to component state.
 */
export default function isValidAnswer(answer) {
  return Number.isInteger(answer) && answer >= 1 && answer <= 4;
}
