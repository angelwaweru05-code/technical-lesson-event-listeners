/**
 * Question displays the quiz question and four answer buttons.
 * Each button calls handleClick with its answer number. The handler
 * validates the number, stores the selection in state, and logs the
 * result so the UI updates immediately.
 *
 * Rendered by: App.jsx
 * Uses: ../utils/isValidAnswer.js
 */
import { useState } from "react";
import isValidAnswer from "../utils/isValidAnswer";

function Question() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function handleClick(number) {
    // Ignore invalid answers so only 1-4 can become the selected state.
    if (!isValidAnswer(number)) {
      return;
    }
    setSelectedAnswer(number);
    console.log(`User selected Answer ${number}!`);
  }

  return (
    <>
      <h1> QUESTION HERE </h1>
      <button onClick={() => handleClick(1)}> Answer 1</button>
      <button onClick={() => handleClick(2)}> Answer 2</button>
      <button onClick={() => handleClick(3)}> Answer 3</button>
      <button onClick={() => handleClick(4)}> Answer 4</button>
      {selectedAnswer !== null && (
        <p role="status">User selected Answer {selectedAnswer}!</p>
      )}
    </>
  );
}
export default Question;
