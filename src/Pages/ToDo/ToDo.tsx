import { useState, memo, useCallback, ChangeEvent, MouseEvent } from "react";
import styles from "./todo.module.css";
import { v4 as uuidv4 } from "uuid";

// Types
type TodoItemId = string | number;

interface TodoItem {
  id: TodoItemId;
  text: string;
}

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface ButtonEventProps {
  type?: "button" | "submit" | "reset";
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

interface DisplayToDoItemsProps {
  item: TodoItem;
  disabled: boolean;
  deleteItem: (event: MouseEvent<HTMLButtonElement>, item: TodoItem) => void;
  editItem: (event: MouseEvent<HTMLButtonElement>, item: TodoItem) => void;
}

// Component definitions
const InputField = ({
  type = "text",
  placeholder = "Type",
  value = "",
  onChange = () => {},
  ...rest
}: InputFieldProps) => (
  <div className={styles.input_field}>
    <label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </label>
  </div>
);

const Input = memo(InputField);

const ButtonEvent = ({
  type = "button",
  label = "Add",
  onClick = () => {},
  ...rest
}: ButtonEventProps) => (
  <div className={styles.btn}>
    <button type={type} onClick={onClick} {...rest}>
      {label}
    </button>
  </div>
);

const Button = memo(ButtonEvent);

const DisplayToDoItems = ({
  item,
  disabled,
  deleteItem,
  editItem,
}: DisplayToDoItemsProps) => (
  <li className={styles.ulLi}>
    <div>{item.text}</div>
    <div className={styles.add_edit}>
      <ButtonEvent
        disabled={disabled}
        type="button"
        label="Edit"
        onClick={(event) => editItem(event, item)}
      />
      <ButtonEvent
        type="button"
        label="Delete"
        onClick={(event) => deleteItem(event, item)}
      />
    </div>
  </li>
);

const Display = memo(DisplayToDoItems);

// Main component
export default function TodoApp() {
  const [inputField, setInputField] = useState<string>("");
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    { id: 1, text: "John" },
    { id: 2, text: "Cena" },
  ]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<TodoItemId | null>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputField(event.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    if (inputField.trim() === "") return;

    if (!isEdit) {
      setTodoItems((prev) => [
        ...prev,
        { id: uuidv4(), text: inputField.trim() },
      ]);
    } else {
      setTodoItems((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, text: inputField.trim() } : item
        )
      );
      setIsEdit(false);
      setEditId(null);
    }

    setInputField("");
  }, [inputField, isEdit, editId]);

  const modifyTodoItem = useCallback(
    (
      _: React.MouseEvent<HTMLButtonElement>,
      todoItem: TodoItem,
      type: string
    ) => {
      if (type === "edit") {
        setInputField(todoItem.text);
        setEditId(todoItem.id);
        setIsEdit(true);
      } else if (type === "delete") {
        setTodoItems((prev) => prev.filter((item) => item.id !== todoItem.id));
      }
    },
    []
  );

  return (
    <div>
      <h1 className={styles.header}>To-Do App</h1>

      <div className={styles.event}>
        <Input
          type="text"
          placeholder="Add Your Item"
          value={inputField}
          onChange={handleChange}
        />
        <Button
          type="button"
          label={isEdit ? "Save" : "Add"}
          onClick={handleAdd}
        />
      </div>

      {todoItems.length > 0 && (
        <div className={styles.display}>
          <ul className={styles.ulList}>
            {todoItems.map((item) => (
              <Display
                disabled={item.id === editId}
                key={item.id}
                item={item}
                editItem={(event, editItem) =>
                  modifyTodoItem(event, editItem, "edit")
                }
                deleteItem={(event, deleteItem) =>
                  modifyTodoItem(event, deleteItem, "delete")
                }
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
