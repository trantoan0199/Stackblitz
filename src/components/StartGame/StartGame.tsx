import React, { useEffect, useState } from "react";
import { CircleType } from "../../types/circle.type";

interface Props {
  setCircles: React.Dispatch<React.SetStateAction<CircleType[]>>;
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  textCheck: { color: string; text: string };
  setTextCheck: React.Dispatch<
    React.SetStateAction<{
      color: string;
      text: string;
    }>
  >;
  inputPoints: number;
  setInputPoints: React.Dispatch<React.SetStateAction<number>>;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
}

export default function StartGame({
  setCircles,
  gameStarted,
  setGameStarted,
  textCheck,
  setTextCheck,
  inputPoints,
  setInputPoints,
  setPoint,
}: Props) {
  const [time, setTime] = useState(0);
  const [Restart, setRestart] = useState(true);

  const generateCircles = () => {
    const newCircles = [];
    for (let i = 1; i <= inputPoints; i++) {
      newCircles.push({
        id: i,
        x: Math.floor(Math.random() * 455),
        y: Math.floor(Math.random() * 455),
      });
    }
    setCircles(newCircles);
  };

  const startGame = () => {
    setTime(0);
    setGameStarted(true);
    generateCircles();
    setRestart(false);
    setPoint(1);
    setTextCheck({
      color: "black",
      text: "let's play",
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newValue = value > 0 ? value : 0;
    setInputPoints(newValue);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (gameStarted) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }

    return () => clearInterval(timer);
  }, [gameStarted]);

  return (
    <div>
      <h1 style={{ color: `${textCheck.color}`, textTransform: "uppercase" }}>
        {textCheck.text}
      </h1>
      <div className="score-board">
        <div>
          Points:
          <input
            type="number"
            value={inputPoints}
            onChange={handleChangeInput}
          />
        </div>
        <div>Time: {time.toFixed(1)}s</div>
      </div>
      <button disabled={inputPoints === 0} onClick={startGame}>
        {Restart ? "Play" : "Restart"}
      </button>
    </div>
  );
}
