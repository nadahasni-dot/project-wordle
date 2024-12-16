import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
import Banner from "../Banner/Banner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [result, setResult] = React.useState({
    isComplete: false,
    isCorrect: false,
    numOfGuesses: 0,
  });

  function handleSubmitGuess(guess) {
    if (guesses.length + 1 >= NUM_OF_GUESSES_ALLOWED) {
      setResult({
        isComplete: true,
        isCorrect: false,
        numOfGuesses: guesses.length + 1,
      });
    }

    const guessResult = checkGuess(guess, answer);

    const isWordCorrect = guessResult.every(
      (word) => word.status === "correct"
    );

    if (isWordCorrect) {
      setResult({
        isComplete: true,
        isCorrect: true,
        numOfGuesses: guesses.length + 1,
      });
    }

    const nextGuesses = [
      ...guesses,
      {
        id: crypto.randomUUID(),
        guess: guessResult,
      },
    ];

    setGuesses(nextGuesses);
  }

  return (
    <>
      {result.isComplete && (
        <Banner
          answer={answer}
          numOfGuesses={result.numOfGuesses}
          variant={result.isCorrect ? "happy" : "sad"}
        />
      )}
      <GuessResults guesses={guesses} />
      <GuessInput
        disabled={result.isComplete}
        onSubmitGuess={handleSubmitGuess}
      />
    </>
  );
}

export default Game;
