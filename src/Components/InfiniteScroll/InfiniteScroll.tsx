import {
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
} from "react";
import styles from "./element.module.css";

interface DataProp {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface ScrollerProps {
  data: DataProp[];
  isLoading: boolean;
  isError: string | null;
  onPageSet: Dispatch<SetStateAction<number>>;
}

interface ObserverEntity {
  isIntersecting: boolean;
}

const Scroller = ({ data, isLoading, onPageSet }: ScrollerProps) => {
  const elementToBeObserved = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entities: ObserverEntity[]) => {
      const intersectingElement = entities[0];
      if (intersectingElement.isIntersecting) {
        requestAnimationFrame(() => {
          document.startViewTransition(() => {
            onPageSet((prev) => prev + 1);
          });
        });
      }
    },
    [onPageSet]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px", // Increased margin for earlier loading
      threshold: 0.5, // Lower threshold for better performance
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (elementToBeObserved.current && !!data.length) {
      observer.observe(elementToBeObserved.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, handleObserver, data]);

  return (
    <section>
      <div className={styles.main}>
        <div className={styles.scroller}>
          {data?.map((item, index) => {
            return <p key={index}>{item.Title}</p>;
          })}
          {!isLoading && !!data.length && (
            <div ref={elementToBeObserved}>
              <h2 style={{ textAlign: "center" }}> Loading ...</h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Scroller);
