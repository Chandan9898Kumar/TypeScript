import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isThemeDark: boolean; // A boolean value that indicates if theme is dark or not
  setIsThemeDark: React.Dispatch<React.SetStateAction<boolean>>; // A state setter function from useState
  // setIsThemeDark: React.Dispatch<React.SetStateAction<boolean>>  This is the type for the setState function that comes from useState:
  // React.Dispatch is a TypeScript type representing a function that can update state
  // React.SetStateAction<boolean> represents what kind of value can be passed to the setState function
  // It can accept either a boolean value directly or a function that receives the previous state and returns a boolean
}

interface ReactChild {
  children: React.ReactNode; // React.ReactNode is a TypeScript type that represents all possible types that can be rendered in React.

  // React.ReactNode can accept all these types:
  //  type ReactNode =
  // | string                // "Hello World"
  // | number                // 42
  // | boolean               // true/false
  // | null                  // null
  // | undefined            // undefined
  // | React.ReactElement   // <div>Hello</div>
  // | React.ReactFragment  // <>...</>
  // | React.ReactPortal    // Created by ReactDOM.createPortal
  // | Array<ReactNode>     // Array of any of these types
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
//                              We can also Provide a default value :
// const ThemeContext = createContext<ThemeContextType>({isThemeDark: false,setIsThemeDark: (): void => {}});

export const ContextManager = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};


const ThemeManager = ({ children }: ReactChild) => {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(false);

  useEffect(() => {
    const Theme = isThemeDark ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", Theme);
  }, [isThemeDark]);

  return (
    <ThemeContext.Provider value={{ isThemeDark, setIsThemeDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeManager;
