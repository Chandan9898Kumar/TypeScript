import { ChangeEvent, FC, memo } from "react";

type Text = "text" | "password" | "email" | "number";

interface SuggestionProps {
  type: Text;
  placeholder: string;
  className?: string;
  style?: React.CSSProperties;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputSuggestions: FC<SuggestionProps> = ({
  type = "text",
  placeholder = "Search",
  className = "",
  style = {},
  onChange,
  value,
}) => {
  return (
    <section>
      <InputField
        type={type}
        placeholder={placeholder}
        className={className}
        style={style}
        value={value}
        onChange={onChange}
      />

      <SuggestionBox />
    </section>
  );
};
// Add display name for better debugging
InputSuggestions.displayName = "InputSuggestions";
export default memo(InputSuggestions);

const Field = ({
  type,
  placeholder,
  className,
  style,
  value,
  onChange,
}: SuggestionProps) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        style={style}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const InputField = memo(Field);

const Suggestion = () => {
  return <section>Suggestion</section>;
};

const SuggestionBox = memo(Suggestion);
