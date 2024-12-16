import React from "react";

function GuessInput({ onSubmitGuess, disabled = false }) {
  const [input, setInput] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({ guess: input });
    onSubmitGuess(input);

    setInput("");
  }

  function handleChange(event) {
    const value = event.target.value.toUpperCase();
    setInput(value);
  }

  return (
    <form onSubmit={handleSubmit} className="guess-input-wrapper">
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={input}
        maxLength={5}
        required={true}
        pattern="[a-zA-Z]{5}"
        onChange={handleChange}
        disabled={disabled}
      />
    </form>
  );
}

export default GuessInput;
