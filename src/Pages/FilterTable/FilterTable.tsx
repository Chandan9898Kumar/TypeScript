import { useState, useEffect, useCallback, useMemo, ChangeEvent } from "react";
import "./style.css";

const columns = ["id", "title", "price", "rating", "returnPolicy"];

const URL = "https://dummyjson.com/products";

interface CheckedFace {
  id: number;
  title: string;
  value: number;
  condition: string;
  checked: boolean;
}

interface DataProps {
  [key: string]: unknown;
  availabilityStatus: string;
  category: string;
  description: string;
  dimensions: object;
  discountPercentage: number;
  id: number;
  images: [];
  meta: object;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: [];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: [];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}
const FilterTable = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [checked, setChecked] = useState<CheckedFace[]>([
    { id: 1, title: "50 >", value: 50, condition: "greater", checked: false },
    { id: 2, title: "< 50", value: 50, condition: "lesser", checked: false },
  ]);

  const getResult = useCallback(async () => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result.products);
    } catch (error) {
      setIsError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getResult();
  }, [getResult]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
      if (inputValue) {
        setChecked((prev) => prev.map((item) => ({ ...item, checked: false })));
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const optimizedData = useMemo(() => {
    const isChecked = checked.find((item) => item.checked);

    if (isChecked) {
      if (isChecked.condition === "greater") {
        return data.filter((item) => item.price > isChecked.value);
      } else {
        return data.filter((item) => item.price < isChecked.value);
      }
    } else if (debouncedValue) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(debouncedValue.toLowerCase())
      );
    } else {
      return data;
    }
  }, [debouncedValue, data, checked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue("");
    const newChecked = checked.map((item) => {
      if (item.id === parseInt(event.target.id)) {
        item.checked = !item.checked;
      } else {
        item.checked = false;
      }
      return item;
    });
    setChecked(newChecked);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="error">Error: {isError}</div>;
  }

  return (
    <div>
      <h1>Debounced Search with filter</h1>

      <div className="search_filter">
        <input
          value={inputValue}
          type="text"
          placeholder="search"
          onChange={(event) => setInputValue(event.target.value)}
        />
        <details>
          <summary>Filter</summary>
          <label>
            {checked?.map((item) => {
              return (
                <div key={item.id}>
                  {item.title} {"  "}
                  <input
                    id={item.id.toString()}
                    type="checkbox"
                    name={item.title}
                    checked={item.checked}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </label>
        </details>
      </div>

      <Table data={optimizedData} columns={columns} />
    </div>
  );
};

export default FilterTable;

interface TableProps {
  data: DataProps[];
  columns: string[];
}
const Table = ({ data = [], columns = [] }: TableProps) => {
  if (!data || data.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns?.map((column) => (
              <th key={column}>{column.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id || index}>
              {columns?.map((column) => (
                <td key={`${item.id}-${column}`}>{String(item[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
