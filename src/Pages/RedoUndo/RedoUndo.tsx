import { useState, useRef } from "react";
import "./RedoUndo.css";

function RedoUndo() {
  const [input, setInput] = useState("");

  const index = useRef([""]);
  const total = useRef(0);

  const undoFunction = () => {
    total.current -= 1;
    if (total.current >= 0) {
      const element = index.current[total.current];
      setInput(element);
    }
  };

  const redoFunction = () => {
    total.current += 1;
    if (total.current <= index.current.length) {
      const element = index.current[total.current];
      setInput(element);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (total.current === 0 && e.target.value.length) {
      index.current = [""];
    }
    const newValue = e.target.value;
    setInput(newValue);
    index.current.push(newValue);
    total.current += 1;
  };

  return (
    <div className="redo-undo-container">
      <h1>Redo Undo Functionality</h1>

      <div className="button-group">
        <button onClick={undoFunction} disabled={total.current === 0}>
          UNDO
        </button>
        <button
          onClick={redoFunction}
          disabled={total.current === index.current.length - 1}
        >
          REDO
        </button>
      </div>

      <input type="text" value={input} onChange={handleInputChange} />

      <p>Current Input: {input}</p>
    </div>
  );
}

export default RedoUndo;

// function useUndoableState(initialState) {
//   const [state, setState] = useState(initialState);
//   const history = useRef([initialState]);
//   const historyIndex = useRef(0);

//   const setUndoableState = useCallback((newState) => {
//     // If we're not at the end of history (meaning we've undone actions),
//     // clear the "future" history before adding a new state.
//     if (historyIndex.current < history.current.length - 1) {
//       history.current = history.current.slice(0, historyIndex.current + 1);
//     }
//     history.current.push(newState);
//     historyIndex.current = history.current.length - 1;
//     setState(newState);
//   }, []);

//   const undo = useCallback(() => {
//     if (historyIndex.current > 0) {
//       historyIndex.current -= 1;
//       setState(history.current[historyIndex.current]);
//     }
//   }, []);

//   const redo = useCallback(() => {
//     if (historyIndex.current < history.current.length - 1) {
//       historyIndex.current += 1;
//       setState(history.current[historyIndex.current]);
//     }
//   }, []);

//   return [state, setUndoableState, undo, redo];
// }

// function MyComponent() {
//   const [value, setValue, undo, redo] = useUndoableState('');

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={value} onChange={handleChange} />
//       <button onClick={undo}>Undo</button>
//       <button onClick={redo}>Redo</button>
//       <p>Current Value: {value}</p>
//     </div>
//   );
// }

// export default MyComponent;
