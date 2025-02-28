import { ChangeEvent, FC, memo, useRef, useEffect } from "react";
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
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <InputField
          type={type}
          placeholder={placeholder}
          className={className}
          style={style}
          onChange={onChange}
          searchField={searchField}
        />

        <SuggestionBox
          suggestionItems={items}
          searchField={searchField}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </section>
  );
};
// Add display name for better debugging
InputSuggestions.displayName = "InputSuggestions";
export default memo(InputSuggestions);

//        Input Field

type InputProps = Omit<SuggestionProps, "items" | "setSelectedItem">;
const Field = ({
  type,
  placeholder,
  className,
  style,
  onChange,
  searchField,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchField;
    }
  }, [searchField]);
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
    <ul className={styles.suggestion}>
      {suggestionItems?.map((item) => {
        return (
          <li
            className={styles.titles}
            key={item.id}
            onClick={() => setSelectedItem(item.title)}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
};

const SuggestionBox = memo(Suggestion);
