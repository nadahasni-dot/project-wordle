import React from "react";
import { range } from "../../utils";

function Guess({ values }) {
  const cells = range(0, 5);

  return (
    <p className="guess">
      {cells.map((cell) => (
        <span key={cell} className={`cell ${values[cell]?.status}`}>
          {values[cell]?.letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
