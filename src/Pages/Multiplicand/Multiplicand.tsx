import {
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  memo,
  RefObject,
  FC,
} from "react";

const validation = (value: string) => {
  return parseFloat(value) <= 1 ? true : false;
};

type InitialValue = number[];

type InputValue = string | null;

const initialValue: InitialValue = [5, 7, 20];

export default function Multiplicand() {
  const [isError, setIsError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputValue>(null);
  const [multiples, setMultiples] = useState<InitialValue>(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setIsError(false);
      const value = event.target.value.trim();
      if (value && !validation(value)) {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setIsError(true);
        setInputValue(null);
        setMultiples(initialValue);
        return;
      }

      setInputValue(value);
    },
    []
  );

  const handleMultiplicand = useCallback((): void => {
    const nextMultiplicand = multiples[multiples.length - 1];
    setMultiples((prev) => [...prev, nextMultiplicand * 2]);
  }, [multiples]);

  return (
    <div>
      <h1>
        Create a React application that allows users to input a number between 0
        and 1 and display multiples of that number!
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          type="number"
          placeholder="Type Number"
          onChange={handleChange}
          inputRef={inputRef}
        />
        <Error isError={isError} />
        <Display
          multiplicand={multiples}
          inputValue={inputValue}
          handleMultiplicand={handleMultiplicand}
        />
      </div>
    </div>
  );
}

interface InputFieldProps {
  type: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
}

const InputField: FC<InputFieldProps> = ({
  type = "text",
  placeholder = "Type",
  onChange = () => {},
  inputRef,
}) => {
  return (
    <div>
      <label>
        {" "}
        Enter Number :{"  "}
        <input
          ref={inputRef}
          name="number"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          inputMode="decimal"
        />
      </label>
    </div>
  );
};

const Input = memo(InputField);

interface ErrorMessageProps {
  isError: boolean;
  errorMessage?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
  isError = false,
  errorMessage = "Number should be between 0 & 1",
}) => {
  if (!isError) {
    return null;
  }

  return <h1 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h1>;
};

const Error = memo(ErrorMessage);

interface DisplayMessageProps {
  inputValue: InputValue;
  multiplicand: InitialValue;
  handleMultiplicand: () => void;
}

const DisplayMessage = ({
  inputValue = "",
  multiplicand = [],
  handleMultiplicand = () => {},
}: DisplayMessageProps) => {
  if (!inputValue) {
    return null;
  }

  const numberInt = Number(inputValue);

  return (
    <div>
      <ul>
        {multiplicand.map((item, index) => {
          return (
            <li key={item + index}>{`${numberInt} times is ${item} is ${
              numberInt * item
            }`}</li>
          );
        })}
      </ul>
      <button onClick={handleMultiplicand}>Add Next Multiplicand</button>
    </div>
  );
};

const Display = memo(DisplayMessage);

// Problem Statement: Create a React application that allows users to input a number between 0 and 1 and display multiples of that number. For example, if the user inputs 0.5, the app should show:

// 0.5 times 5 is 2.5

// 0.5 times 7 is 3.5

// 0.5 times 20 is 10

// Additionally, include a button labelled "Add next multiplicand." When clicked, this button should double the previous multiplicand and add it to the list, continuing the sequence:

// 0.5 times 40 is 20

// 0.5 times 80 is 40

// 0.5 times 160 is 80

// Refer to this CodeSandBox Link for solution

// This problem checks basic react knowledge including splitting logic into different components, managing state across parent & child components & input validations.
