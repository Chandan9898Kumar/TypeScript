import { useState, useMemo, memo } from "react";
import "./swatch.css";

type color = "red" | "pink" | "blue" | "green" | "orange";

interface BoxProps {
  colorSelected: string | null;
}

interface SwatchBoxesProps {
  item: string;
  setColorSelected: (value: string) => void;
}

interface ContainerBoxProps {
  colors: color[];
}

const colors: color[] = ["red", "pink", "blue", "green", "orange"];

const limit = 4;

function sampleCounter(callback: (value: string) => void, limit: number) {
  let count = 0;

  return function (value: string) {
    count++;
    console.log(count, value);
    if (count === limit) {
      callback(value);
      count = 0;
    }
  };
}

export default function SwatchBoxMainContainer() {
  return (
    <div>
      <ContainerBox colors={colors} />
    </div>
  );
}
const Box = ({ colorSelected }: BoxProps) => {
  return (
    <div
      className="box"
      style={{ background: colorSelected ? colorSelected : "white" }}
    ></div>
  );
};

const HeadBox = memo(Box);

const SwatchBoxes = ({ item, setColorSelected }: SwatchBoxesProps) => {
  console.log("swatchess");
  const sampler = useMemo(
    () => sampleCounter(setColorSelected, limit),
    [setColorSelected]
  );

  return (
    <button
      className="items"
      style={{ "--color": item } as React.CSSProperties}
      onClick={() => sampler(item)}
    >
      {item.toUpperCase()}
    </button>
  );
};

const SwatchBox = memo(SwatchBoxes);
const ContainerBox = ({ colors }: ContainerBoxProps) => {
  const [colorSelected, setColorSelected] = useState<string | null>(null);
  const [data, setData] = useState(0);

  return (
    <div className="container">
      <HeadBox colorSelected={colorSelected} />

      <div className="color-item">
        {colors.map((item) => (
          <SwatchBox
            item={item}
            key={item}
            setColorSelected={setColorSelected}
          />
        ))}
      </div>
      <button  className="re-render-button" onClick={() => setData(data + 1)}>
        {"re-render testing" +" "+data}
      </button>
    </div>
  );
};
