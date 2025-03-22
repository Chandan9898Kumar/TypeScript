import { memo, MouseEvent, useCallback, useEffect, useState } from "react";
import "./styles.css";

const totalNumber = 9;
const boxes:string[] = [...Array(totalNumber)].fill("");
const TicTacToe = () => {
  const [gridBox, setGridBox] = useState<string[]>(boxes);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>("");
  const [winnerBox, setWinnerBox] = useState<number[]>([]);

  const winnerDeclaration = useCallback(() => {
    const matchedBoxes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const item of matchedBoxes) {
      const [a, b, c] = item;
      if (
        gridBox[a] &&
        gridBox[a] === gridBox[b] &&
        gridBox[b] === gridBox[c] &&
        gridBox[a] === gridBox[c]
      ) {
        requestAnimationFrame(() => {
          document.startViewTransition(() => {
            setWinner(gridBox[a]);
            setWinnerBox(item);
          });
        });
        return;
      }
    }

    if (gridBox.every(Boolean)) {
      setWinner("Draw");
    }
  }, [gridBox]);

  useEffect(() => {
    winnerDeclaration();
  }, [winnerDeclaration]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const index = (event.target as HTMLDivElement).dataset.index;
    if (!index) {
      return;
    }

    if (gridBox[Number(index)]) {
      return;
    }

    const newGridBox = [...gridBox];
    newGridBox[Number(index)] = isXNext ? "X" : "o";

    setGridBox(newGridBox);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setGridBox(boxes);
    setIsXNext(true);
    setWinner("");
    setWinnerBox([]);
  };
  return (
    <div>
      <h1>Hello StackBlitz!</h1>

      <div className="main" onClick={handleClick}>
        {gridBox?.map((item, index) => {
          return (
            <div
              data-index={index}
              className={`grid ${winner ? "disabled" : ""}`}
              key={item + index}
              style={{
                background: winner && winnerBox.includes(index) ? "plum" : "",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="btn">
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="info" role="message">
        <span className="text">Current Player</span> :{" "}
        <span className="chance" data-player={isXNext}>
          {isXNext ? "X" : "O"}
        </span>
      </div>

      <div className="info" role="message">
        <span className="text">Winner is :</span>{" "}
        <span className="chance">{winner}</span>
      </div>
    </div>
  );
};

export default memo(TicTacToe);
