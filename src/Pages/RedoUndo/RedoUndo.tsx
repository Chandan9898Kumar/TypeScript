import { useState, useRef, ChangeEvent } from "react";
import "./RedoUndo.css";

function RedoUndo() {
  const [input, setInput] = useState("");

  const history = useRef([""]);
  const currentIndex = useRef(0);

  const undoFunction = () => {
    if (currentIndex.current > 0) {
      currentIndex.current -= 1;
      setInput(history.current[currentIndex.current]);
    }
  };

  const redoFunction = () => {
    if (currentIndex.current < history.current.length - 1) {
      currentIndex.current += 1;
      setInput(history.current[currentIndex.current]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    // Remove any future history when typing after undo
    history.current = history.current.slice(0, currentIndex.current + 1);
    history.current.push(newValue);
    currentIndex.current = history.current.length - 1;
  };

  return (
    <div className="redo-undo-container">
      <h1>Redo Undo Functionality</h1>

      <div className="button-group">
        <button onClick={undoFunction} disabled={currentIndex.current === 0}>
          UNDO
        </button>
        <button
          onClick={redoFunction}
          disabled={currentIndex.current === history.current.length - 1}
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

// The Command Pattern provides structure to undo/redo logic by encapsulating each user action (like typing, deleting, moving, etc.) as a command object with two key methods:

// execute() — performs the action

// undo() — reverses the action

// This allows maintaining separate stacks for executed commands (for undo) and undone commands (for redo). When a command is executed, it’s pushed onto the undo stack. When an undo is performed, the command is popped from the undo stack, its undo() method is called, and it’s pushed onto the redo stack. Conversely, when a redo is performed, the command is popped from the redo stack, its execute() method is called again, and it’s pushed back onto the undo stack.

/**
 * // Step 1: Define a generic Command interface
class Command {
  execute() {}
  undo() {}
}

// Step 2: Create specific command classes
class AddTextCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }

  execute() {
    this.editor.addText(this.text);
  }

  undo() {
    this.editor.removeText(this.text.length);
  }
}

// Step 3: The receiver (text editor)
class TextEditor {
  constructor() {
    this.content = "";
  }
  addText(text) {
    this.content += text;
  }
  removeText(length) {
    this.content = this.content.slice(0, -length);
  }
  getContent() {
    return this.content;
  }
}

// Step 4: Command manager to handle undo/redo stacks
class CommandManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  executeCommand(command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = []; // clear redo history after new command
  }

  undo() {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo() {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}

// Step 5: Using the pattern
const editor = new TextEditor();
const manager = new CommandManager();

manager.executeCommand(new AddTextCommand(editor, "Hello "));
manager.executeCommand(new AddTextCommand(editor, "World!"));
console.log(editor.getContent()); // Hello World!
manager.undo();
console.log(editor.getContent()); // Hello
manager.redo();
console.log(editor.getContent()); // Hello World!

 */
