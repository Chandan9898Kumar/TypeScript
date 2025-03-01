import {
  ChangeEvent,
  FC,
  memo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import styles from "./input.module.css";
import { Products } from "../../Pages/AutoSuggestion/InterfaceSuggestion";
type Text = "text" | "password" | "email" | "number";

interface SuggestionProps {
  type: Text;
  placeholder: string;
  className?: string;
  style?: React.CSSProperties;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  items: Products[];
  searchField: string;
  setSelectedItem: (value: string) => void;
}

const InputSuggestions: FC<SuggestionProps> = ({
  type = "text",
  placeholder = "Search",
  className = "",
  style = {},
  onChange,
  items,
  searchField,
  setSelectedItem,
}) => {
  // Add local input state
  const [inputValue, setInputValue] = useState(searchField);
  // Update local state when searchField prop changes
  useEffect(() => {
    setInputValue(searchField);
  }, [searchField]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const handleSelectedItem = (value: string) => {
    setInputValue(value);
    setSelectedItem(value);
  };
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <InputField
          type={type}
          placeholder={placeholder}
          className={className}
          style={style}
          onChange={handleInputChange}
          value={inputValue}
        />

        <SuggestionBox
          suggestionItems={items}
          searchField={inputValue}
          setSelectedItem={handleSelectedItem}
        />
      </div>
    </section>
  );
};
// Add display name for better debugging
InputSuggestions.displayName = "InputSuggestions";
export default memo(InputSuggestions);

//        Input Field

type InputProps = Omit<
  SuggestionProps,
  "items" | "setSelectedItem" | "searchField"
> & {
  value: string;
}; //  & { value: string } adds a new property value of type string to the resulting type.
const Field = ({
  type,
  placeholder,
  className,
  style,
  onChange,
  value,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);
  return (
    <input
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      className={className}
      style={style}
      onChange={onChange}
    />
  );
};

const InputField = memo(Field);

//  Auto Suggestions Box
interface SuggestionItemsProps {
  suggestionItems: Products[];
  searchField: string;
  setSelectedItem: (value: string) => void;
}

const Suggestion = ({
  suggestionItems,
  searchField,
  setSelectedItem,
}: SuggestionItemsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  // Reset selectedIndex when searchField or suggestionItems change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchField, suggestionItems]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Only handle navigation if we have items
      if (!suggestionItems?.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const nextIndex =
              prev < suggestionItems.length - 1 ? prev + 1 : prev;
            scrollItemIntoView(nextIndex);
            return nextIndex;
          });
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const nextIndex = prev > 0 ? prev - 1 : 0;
            scrollItemIntoView(nextIndex);
            return nextIndex;
          });
          break;

        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < suggestionItems.length) {
            setSelectedItem(suggestionItems[selectedIndex].title);
          }
          break;

        case "Escape":
          setSelectedIndex(-1);
          break;
      }
    },
    [suggestionItems, selectedIndex, setSelectedItem]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  //  This Function is likely used to scroll to a specific item in a list based on its index position.
  const scrollItemIntoView = (index: number) => {
    // listRef.current: It's checking if the ref has a current value (i.e., if it's attached to a DOM element)
    if (listRef.current) {
      // Gets the child element at the specified index from the ref's children.
      //  The as HTMLElement is a TypeScript type assertion to treat the element as an HTML element.
      const element = listRef.current.children[index] as HTMLElement;
      if (element) {
        // scrollIntoView : This is a built-in DOM method that scrolls the element into the visible area of its container
        element.scrollIntoView({
          block: "nearest", // block: "nearest": Scrolls to the nearest edge of the container
          behavior: "smooth", // behavior: "smooth": Creates a smooth scrolling animation instead of jumping instantly
        });
      }
    }
  };

  // Early return if no search field
  if (!searchField) {
    return null;
  }

  // Early return for empty results with search
  if (searchField && !suggestionItems?.length) {
    return (
      <ul className={styles.suggestion}>
        <div className={styles.notfound}>No Data Found</div>
      </ul>
    );
  }

  return (
    <ul
      ref={listRef}
      className={styles.suggestion}
      role="listbox"
      aria-label="Suggestions"
    >
      {suggestionItems?.map((item, index) => {
        return (
          <li
            className={`${styles.titles} ${
              selectedIndex === index ? styles.active : ""
            }`}
            key={item.id}
            role="option"
            aria-selected={selectedIndex === index}
            tabIndex={selectedIndex === index ? 0 : -1}
            onClick={() => {
              setSelectedItem(item.title);
              setSelectedIndex(index);
            }}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
};

const SuggestionBox = memo(Suggestion);
