import { ChangeEvent, useState } from "react";

const Practice = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 data-testid="header">Testing Practice</h1>

      <div>
        <input
          data-testid='input'
          type="text"
          value={inputValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
        />
      </div>
      <div>
        <button data-testid="btn" onClick={() => setCounter(counter + 1)}>
          Add
        </button>
      </div>

      <div>
        <p data-testid="counter">Counter: {counter}</p>
        <p data-testid="inputValue">Input Value: {inputValue}</p>
      </div>
    </div>
  );
};

export default Practice;
