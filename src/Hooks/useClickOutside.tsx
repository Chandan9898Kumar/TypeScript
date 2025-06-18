import React, { useRef } from "react";

const useOutsideClick = (callback = () => {}) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;
