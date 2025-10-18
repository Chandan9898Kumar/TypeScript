import { useState } from "react";
import "./drop.css";

interface FramerOptions {
  value: string;
  label: string;
}

interface DropDownProps {
  frameworkOptions: FramerOptions[];
  handleCheckItem: (value: FramerOptions) => void;
  selectedItem: FramerOptions[];
}

interface CheckBoxProps {
  checkItem: FramerOptions;
  handleCheckItem: (value: FramerOptions) => void;
  isChecked: boolean;
}

interface ContainerProps {
  isDropDownopen: boolean;
  setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: FramerOptions[];
}

const frameworkOptions: FramerOptions[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const Container = ({
  isDropDownopen,
  setIsDropDownOpen,
  selectedItem,
}: ContainerProps) => {
  return (
    <div className="container-drop-down">
      <div className="selected-item-box">
        {selectedItem?.map((item) => {
          return (
            <span className="selected-item" key={item.value}>
              {item.label}
            </span>
          );
        })}
      </div>
      <button onClick={() => setIsDropDownOpen((prev) => !prev)}>
        {!isDropDownopen ? "⬇️" : "⬆️"}
      </button>
    </div>
  );
};

const CheckBox = ({ checkItem, handleCheckItem, isChecked }: CheckBoxProps) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleCheckItem(checkItem)}
      />
    </div>
  );
};

const DropDown = ({
  frameworkOptions,
  handleCheckItem,
  selectedItem,
}: DropDownProps) => {
  return (
    <div className="drop-down">
      <ul>
        {frameworkOptions.map((item) => {
          return (
            <li key={item.value}>
              <CheckBox
                checkItem={item}
                handleCheckItem={handleCheckItem}
                isChecked={selectedItem.some(
                  (items) => items.value === item.value
                )}
              />
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default function DropDownSelectItem() {
  const [isDropDownopen, setIsDropDownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FramerOptions[]>([]);

  const handleCheckItem = (checkedItem: FramerOptions) => {
    setSelectedItem((prevSelected) =>
      prevSelected.some((item) => item.value === checkedItem.value)
        ? prevSelected.filter((item) => item.value !== checkedItem.value)
        : [...prevSelected, checkedItem]
    );
  };

  return (
    <div className="main-drop-down-container">
        <h1>Select Your Favorite Frameworks</h1>
      <Container
        isDropDownopen={isDropDownopen}
        setIsDropDownOpen={setIsDropDownOpen}
        selectedItem={selectedItem}
      />
      {isDropDownopen && (
        <DropDown
          frameworkOptions={frameworkOptions}
          handleCheckItem={handleCheckItem}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
}
