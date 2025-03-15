import { useRef, Dispatch, SetStateAction, memo } from "react";
import styles from "./element.module.css";

interface ScrollProps {
  scrollData: number;
  //  Here in setScrollData function,we used Dispatch and SetStateAction because :
  //  1. The function can accept a direct value of type number  : setState(42); // direct value
  //  2. The function can also accept a function that receives the previous state and returns a new value: setState(prev => prev + 1); // updater function
  //  3. This ensures that setUserData can be used in both ways:
  //  Both of these are type-safe:
  // setUserData(100);                    // direct value
  // setUserData((prev) => prev + 50);    // updater function

  setScrollData: Dispatch<SetStateAction<number>>;
}

const ScrollOnElement = ({ scrollData, setScrollData }: ScrollProps) => {
  const refElement = useRef<HTMLDivElement>(null);
  // 1. Added an isLoading ref to prevent multiple simultaneous loading requests.
  // 2. Without the loading flag, rapidly scrolling could trigger multiple setUserData calls before the first one completes
  // 3. This could lead to duplicate data loading or state updates.
  // 4. Using useState instead of useRef would cause re-renders and might not immediately reflect the current loading state.
  // 5. So we used useRef: // This updates synchronously and doesn't cause re-renders.
  // 6. It helps in Race Condition Prevention : When Network requests can take time to complete
  const isLoading = useRef<boolean>(false);
  // Add debouncing to prevent rapid firing
  const debounceTimer = useRef<NodeJS.Timeout>();
  const handleScroll = () => {
  
    if (!refElement.current || isLoading.current) {
      return;
    }

    const { clientHeight, scrollTop, scrollHeight } = refElement.current;
    const threshold = 100;

    if (clientHeight + scrollTop >= scrollHeight - threshold) {
      isLoading.current = true;

      // Clear any existing timeout
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        // Use requestAnimationFrame for smoother updates.
        // requestAnimationFrame synchronizes our state update with the browser's rendering cycle
        // Helps prevent visual junk and ensures smooth animations
        // Better performance than direct updates
        requestAnimationFrame(() => {
          if (document.startViewTransition) {
            document.startViewTransition(() => {
              setScrollData((prev) => prev + 50);
            });
          } else {
            setScrollData((prev) => prev + 50);
          }
          // Add a small delay before allowing new loads
          setTimeout(() => {
            isLoading.current = false;
          }, 500);
        });
      }, 200);
    }
  };
  return (
    <div className={styles.main}>
      <h1>This is Infinite Scroller On Element</h1>
      <div onScroll={handleScroll} ref={refElement} className={styles.scroller}>
        {[...Array(scrollData)].fill("").map((_, index) => {
          return <p key={index}>{index + 1}</p>;
        })}
      </div>
    </div>
  );
};

export default memo(ScrollOnElement);
