import { ChangeEvent, FC, memo } from "react";
import styles from "./input.module.css";
import { Products } from "../../Pages/AutoSuggestion/InterfaceSuggestion";
type Text = "text" | "password" | "email" | "number";

interface SuggestionProps {
  type: Text;
  placeholder: string;
  className?: string;
  style?: React.CSSProperties;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  items: Products[];
}

const InputSuggestions: FC<SuggestionProps> = ({
  type = "text",
  placeholder = "Search",
  className = "",
  style = {},
  onChange,
  value,
  items,
}) => {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <InputField
          type={type}
          placeholder={placeholder}
          className={className}
          style={style}
          value={value}
          onChange={onChange}
        />

        <SuggestionBox suggestionItems={items} />
      </div>
    </section>
  );
};
// Add display name for better debugging
InputSuggestions.displayName = "InputSuggestions";
export default memo(InputSuggestions);

type InputProps = Omit<SuggestionProps, "items">;
const Field = ({
  type,
  placeholder,
  className,
  style,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      style={style}
      value={value}
      onChange={onChange}
    />
  );
};

const InputField = memo(Field);

interface SuggestionItemsProps {
  suggestionItems: Products[];
}

const Suggestion = ({ suggestionItems }: SuggestionItemsProps) => {
  

  return (
    <ul className={styles.suggestion}>
      {suggestionItems.map((item) => {
        return <li className={styles.titles} key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
};

const SuggestionBox = memo(Suggestion);
