import { useState, useEffect, memo, useCallback, ChangeEvent } from "react";
import styles from "./suggestion.module.css";
import InputSuggestions from "../../Components/SuggestionField/InputSuggestion";
import { Products } from "./InterfaceSuggestion";
const URL: string = "https://dummyjson.com/products";

const AutoSuggestion = () => {
  const [data, setData] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>("");

  const [fieldValue, setFieldValue] = useState<string>("");

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw new Error("Something Went wrong ...");
      }

      const product = await response.json();
      setData(product.products);
    } catch (error) {
      setIsError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(event.target.value);
    },
    []
  );

  if (isLoading) {
    return <div>Your Data is Being Loaded Please Wait ...</div>;
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <section>
      <h1>This is Auto-Suggestion Board</h1>

      <div>
        <InputSuggestions
          type="text"
          placeholder="Search Items"
          value={fieldValue}
          onChange={handleFieldChange}
          items={data}
        />
      </div>
      <ProductItems productDetails={data} />
    </section>
  );
};

export default AutoSuggestion;

interface DisplayItemProps {
  productDetails: Products[];
}

const DisplayItems = ({ productDetails }: DisplayItemProps) => {
  return (
    <section>
      <ul className={styles.container}>
        {productDetails.map((item) => {
          return (
            <li key={item.id} className={styles.lists}>
              <img src={item.images[0]} alt={item.title} loading="lazy" />
              <div className={styles.titles}>
                <span>{item.title}</span>
                <span>
                  Rs : {"  "}
                  {item.price}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const ProductItems = memo(DisplayItems);
