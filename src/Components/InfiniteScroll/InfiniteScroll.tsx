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
const Scroller = ({ data, isLoading, isError, onPageSet }: ScrollerProps) => {
  const elementToBeObserved = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entities) => {
      console.log("entities", entities[0].isIntersecting);
      const intersectingElement = entities[0];

      if (intersectingElement.isIntersecting) {
        document.startViewTransition(() => {
          onPageSet((prev) => prev + 1);
        });
      }
    },
    [onPageSet]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (elementToBeObserved.current) {
      observer.observe(elementToBeObserved.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, handleObserver]);

  if (!isLoading && !data.length) {
    return;
  }

  return (
    <section>
      <div className={styles.main}>
        <div className={styles.scroller}>
          {data?.map((item, index) => {
            return <p key={index}>{item.Title}</p>;
          })}
          {isLoading && (
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
