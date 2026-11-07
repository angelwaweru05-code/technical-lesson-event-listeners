/**
 * App is the root component for the quiz proof of concept.
 * It renders Question, the component that owns the answer buttons
 * and the selected-answer state.
 *
 * Connected to: Question.jsx
 */
import '../App.css'
import Question from './Question'

function App() {

  return (
    <>
      <Question/>
    </>
  )
}

export default App
