import React, { useState } from "react";
import { CircleType } from "../../types/circle.type";

interface Props {
  onClick: (id: number) => void;
  circle: CircleType;
  totalCircles: number;
  disable: boolean;
}

export default function Circle({
  onClick,
  circle,
  totalCircles,
  disable,
}: Props) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);

  const style: React.CSSProperties = {
    position: "absolute",
    left: `${circle.x}px`,
    top: `${circle.y}px`,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid black",
    display: visible ? "flex" : "none",
    alignItems: "center",
    color: "black",
    justifyContent: "center",
    backgroundColor: clicked ? "red" : "white",
    cursor: disable ? "not-allowed" : "pointer",
    zIndex: totalCircles - circle.id + 1,
  };

  const handleClick = () => {
    if (disable) {
      return;
    }
    onClick(circle.id);
    setClicked(true);
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  };

  if (!visible) {
    return null;
  }

  return (
    <div key={circle.id} className="circle" style={style} onClick={handleClick}>
      {circle.id}
    </div>
  );
}
