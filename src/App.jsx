import './App.css';

import React, { useState, useEffect } from "react";
const LETTERS = "abcdefghijklmnop".split("");

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function MemoryGame() {
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("ready");
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    setShuffledLetters(shuffle(LETTERS));
  }, []);

  useEffect(() => {
    if (selectedLetters.length === shuffledLetters.length) {
      let newScore = 0;
      for (let i = 0; i < selectedLetters.length; i++) {
        if (selectedLetters[i] === shuffledLetters[i]) {
          newScore++;
        }
      }
      setScore(newScore);
      setSelectedLetters([]);
      setCurrentLetterIndex(0);
      setGameStatus("done");
    }
  }, [selectedLetters, shuffledLetters]);

  const handleStartGame = () => {
    setGameStatus("playing");
    setCurrentLetterIndex(0);
  };

  const handleLetterClick = (letter) => {
    if (gameStatus === "playing") {
      const expectedLetter = shuffledLetters[currentLetterIndex];
      if (letter === expectedLetter) {
        setSelectedLetters([...selectedLetters, letter]);
        setCurrentLetterIndex(currentLetterIndex + 1);
      } else {
        setGameStatus("done");
      }
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameStatus("ready");
    setShuffledLetters(shuffle(LETTERS));
    setSelectedLetters([]);
    setCurrentLetterIndex(0);
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <p className="score">Score: {score}</p>
      {gameStatus === "ready" && (
        <button className="start-button" onClick={handleStartGame}>
          Start Game
        </button>
      )}
      {gameStatus === "playing" && (
        <div className="letter-container">
          <div className="letter">
            {shuffledLetters[currentLetterIndex]}
          </div>
        </div>
      )}
      {gameStatus === "done" && (
        <div className="game-over">
          <p>Game Over!</p>
          <p>Your score is {score}.</p>
          <button className="play-again-button" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      )}
      <div className="letter-buttons">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            className={`letter ${
              selectedLetters.includes(letter) ? "selected" : ""
            }`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
