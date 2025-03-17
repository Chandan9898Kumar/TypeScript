import { useEffect, useState } from "react";
import Scroller from "../../Components/InfiniteScroll/InfiniteScroll";

interface DataProp {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const InfiniteScrollerComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<DataProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getData = async () => {
      try {
        setIsError(null);
        setIsLoading(true);
        // Add timeout to abort long-running requests
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=93789fba&s=batman&page=${page}`,
          { signal }
        );
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (!result.Search) {
          throw new Error("No results found");
        }
        setData((prevData) => [...prevData, ...result.Search]);
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          setIsError("Request timed out");
        } else {
          setIsError((error as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getData();

    return () => {
      controller.abort();
    };
  }, [page]);

  return (
    <section>
      <h1>Infinite Scroller</h1>
      <Scroller
        data={data}
        isLoading={isLoading}
        isError={isError}
        onPageSet={setPage}
      />
    </section>
  );
};

export default InfiniteScrollerComponent;
