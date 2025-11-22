"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Game() {
  const word = "REACT";
  const [guessed, setGuessed] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleGuess = () => {
    const letter = input.toUpperCase();
    if (letter && !guessed.includes(letter)) {
      setGuessed([...guessed, letter]);
    }
    setInput("");
  };

  const revealed = word
    .split("")
    .map((c) => (guessed.includes(c) ? c : "_"))
    .join(" ");

  const isComplete = word.split("").every((c) => guessed.includes(c));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-mono">{revealed}</div>
      {!isComplete && (
        <div className="flex gap-2">
          <Input
            type="text"
            maxLength={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            className="w-12 text-center"
          />
          <Button onClick={handleGuess}>Guess</Button>
        </div>
      )}
      {isComplete && <div className="text-green-600">You guessed it!</div>}
    </div>
  );
}
