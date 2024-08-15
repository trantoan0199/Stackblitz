import React, { Fragment, useState } from "react";
import StartGame from "../StartGame";
import Circle from "../Circle";
import { CircleType } from "../../types/circle.type";

export default function Game() {
  const [circles, setCircles] = useState<CircleType[]>([]);
  const [point, setPoint] = useState<number>(1);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [inputPoints, setInputPoints] = useState<number>(3);
  const [textCheck, setTextCheck] = useState<{ color: string; text: string }>({
    color: "black",
    text: "let's play",
  });

  const handleCircleClick = (id: number) => {
    setTimeout(() => {
      setCircles((prev) => prev.filter((circle) => circle.id !== id));
      if (point === Number(inputPoints)) {
        setGameStarted(false);
        setPoint(1);
        setTextCheck({ color: "green", text: "All Cleared" });
      }
    }, 1500);
    if (id === point) {
      setPoint(point + 1);
    } else {
      setTextCheck({ color: "red", text: "Game Over" });
      setGameStarted(false);
      setPoint(1);
    }
  };

  const StartGameProps = {
    setCircles,
    gameStarted,
    setGameStarted,
    textCheck,
    setTextCheck,
    setInputPoints,
    inputPoints,
    setPoint,
  };

  return (
    <Fragment>
      <StartGame {...StartGameProps} />
      <div
        style={{
          marginTop: "20px",
          width: "500px",
          height: "500px",
          position: "relative",
          border: "1px solid black",
        }}
      >
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            circle={circle}
            disable={!gameStarted}
            onClick={handleCircleClick}
            totalCircles={inputPoints}
          />
        ))}
      </div>
    </Fragment>
  );
}
