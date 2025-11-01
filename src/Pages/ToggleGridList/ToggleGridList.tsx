import { useCallback, useEffect, useRef, useState } from "react";
import "./toggleGridList.css";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductCard = ({ image, title, price, rating }: ProductCardProps) => {
  return (
    <div className="child">
      <img src={image} alt={title} width={100} height={100} loading="lazy" />
      <span>{title}</span>
      <span>${price}</span>
      <span>⭐ {rating}</span>
    </div>
  );
};

export default function ToggleGridList() {
  const [productsData, setProductsData] = useState<Product[]>([]);

  const [isError, setIsError] = useState("");
  const [isGrid, setIsGrid] = useState(false);
  const [offset, setOffset] = useState(0);
  const refElement = useRef<HTMLDivElement | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null); // Store AbortController

  const getProductsData = useCallback(async () => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      setIsError("");

      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${offset}`,
        { signal } // Pass signal to fetch
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const result = await response.json();
      // Append new products to existing ones
      setProductsData((prevData) => [...prevData, ...result.products]);
    } catch (error: unknown) {
      // Don't set error if request was aborted
      if (error && (error as Error).name === "AbortError") {
        console.log("Request was cancelled");
      } else {
        setIsError((error as Error).message ?? String(error));
      }
    }
  }, [offset]);

  useEffect(() => {
    getProductsData();
    // Cleanup: abort request on unmount or when offset changes
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [getProductsData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          requestAnimationFrame(() => {
            document.startViewTransition(() => {
              setOffset((prev) => prev + 10);
            });
          });
        }
      },
      { rootMargin: "150px" }
    );
    console.log(refElement.current, "refElement.current");
    const currentRef = refElement.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [productsData.length]);

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div>
      <div className="button">
        <button onClick={() => setIsGrid((prev) => !prev)}>
          {isGrid ? "Grid List" : "List"}
        </button>
      </div>

      {!productsData.length && <div className="load">Loading...</div>}

      <div
        className="container"
        style={{
          gridTemplateColumns: `repeat(${isGrid ? 3 : 1}, 1fr)`,
          gridTemplateRows: `repeat(${isGrid ? 2 : 0}, 1fr)`,
        }}
      >
        {productsData.map((product) => {
          return (
            <ProductCard
              key={product.id}
              image={product.images[0]}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          );
        })}
      </div>

      {!!productsData.length && (
        <div ref={refElement} className="load">
          Loading...
        </div>
      )}
    </div>
  );
}

// Also we can use like this:

/**


import React, { useState, useRef, useCallback } from 'react';
export default function App() {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const fetchCats = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=cats&page=${page.current}`
    );
    const data = await response.json();
    setIsLoading(false);
    page.current += 1;
    setCats((prevData) => [...prevData, ...data.data]);
  };
  const observer = useRef();
  const lastAnchor = useCallback(
    (node) => {
      if (!node || isLoading) {
        console.log(node, 'return >>>>>>>>>>>', isLoading);
        return;
      }
      if (observer.current) {
        console.log('disconnect >>>>>>>>>>>', observer.current);
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchCats();
        }
      });
      console.log(node, 'node', isLoading, observer.current);
      observer.current.observe(node);
    },
    [isLoading]
  );

  console.log(cats, 'cats');
  return (
    <div className="App">
      <div>
        {cats.map((cat) => (
          <img
            key={cat.id}
            src={cat?.thumbnail?.lqip}
            height="150"
            width="150"
          />
        ))}
      </div>
      <div ref={lastAnchor}>Loading...</div>
    </div>
  );
}

 */
