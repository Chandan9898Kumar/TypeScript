import React, { useState, useRef, useCallback, memo } from "react";
import "./styles.css";

interface GameConfig {
  DEGREES: number[];
  PLAYERS: string[];
}

interface GameState {
  isSpinning: boolean;
  winner: string;
}

const GAME_CONFIG: GameConfig = {
  DEGREES: [0, 90, 180, 270, 360],
  PLAYERS: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 1"],
};

const App = () => {
  const [gameState, setGameState] = useState<GameState>({
    isSpinning: false,
    winner: "",
  });
  const rotator = useRef<HTMLDivElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSpin = useCallback(() => {
    setGameState((prev) => ({ ...prev, isSpinning: true }));

    timer.current = setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * GAME_CONFIG.DEGREES.length
      );
      if (rotator.current) {
        rotator.current.style.transform = `rotate(${GAME_CONFIG.DEGREES[randomIndex]}deg)`;
      }
      setGameState((prev) => ({
        ...prev,
        winner: GAME_CONFIG.PLAYERS[randomIndex],
      }));
    }, 1000);
  }, []);

  const handleReset = useCallback(() => {
    if (rotator.current) {
      rotator.current.style.transform = "rotate(0deg)";
    }
    setGameState({ isSpinning: false, winner: "" });
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  return (
    <div>
      <h1>
        Spin The Bottle: {gameState.winner && `Winner is ${gameState.winner}`}
      </h1>
      <RotatingBottle
        key={String(gameState.isSpinning)}
        rotator={rotator}
        isSpinning={gameState.isSpinning}
      />
      <GameControls
        isSpinning={gameState.isSpinning}
        onSpin={handleSpin}
        onReset={handleReset}
      />
    </div>
  );
};

interface GameControlsProps {
  isSpinning: boolean;
  onSpin: () => void;
  onReset: () => void;
}

const GameControls = memo(
  ({ isSpinning, onSpin, onReset }: GameControlsProps) => (
    <div className="btns">
      <button
        disabled={isSpinning}
        onClick={onSpin}
        aria-label="Spin the bottle"
      >
        Spin
      </button>
      <button onClick={onReset} aria-label="Reset the game">
        Reset
      </button>
    </div>
  )
);

interface RotatingBottleProps {
  rotator: React.RefObject<HTMLDivElement>;
  isSpinning: boolean;
}

const RotatingBottle = memo(({ rotator, isSpinning }: RotatingBottleProps) => {
  React.useEffect(() => {
    if (isSpinning && rotator.current) {
      rotator.current.style.animation = "rotate 0.5s linear 2";
    }
  }, [isSpinning, rotator]);

  return (
    <>
      <div className="top" role="region" aria-label="Player 1 position">
        <div>Player 1</div>
      </div>

      <div className="centers">
        <div>Player 4</div>
        <div
          ref={rotator}
          className="thumb"
          style={{ background: "transparent", fontSize: "3rem" }}
          role="img"
          aria-label="Spinning bottle"
        >
          👍
        </div>
        <div>Player 2</div>
      </div>

      <div className="top" role="region" aria-label="Player 3 position">
        <div>Player 3</div>
      </div>
    </>
  );
});

// Add display names for debugging
GameControls.displayName = "GameControls";
RotatingBottle.displayName = "RotatingBottle";

export default App;
