import React, { useEffect, useState } from "react";

const URL = "https://dummyjson.com/products";

// First, define an interface for your product data
interface ProductRequired {
  id: number;
  title: string;
  images: string[];
}

interface ProductOptional {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: (string | number)[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  warrantyInformation: string;
  weight: number;
}

type Product = ProductRequired & Partial<ProductOptional>;

const Carousel: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

  function fetchImages(url: string): void {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.products.slice(0, 5));
      })
      .catch((error) => {
        console.log(error, "error fetching images");
      });
  }

  useEffect(() => {
    fetchImages(URL);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Carousel</h1>
      <Images imageData={data} />
    </div>
  );
};

export default Carousel;

interface CarouselOptions {
  imageData: Product[];
}

const Images: React.FC<CarouselOptions> = ({ imageData }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNextImage = (): void => {
    document.startViewTransition(() => {
      setCurrentIndex((prev) => (prev + 1) % imageData.length);
    });
  };

  const handlePrevImage = (): void => {
    document.startViewTransition(() => {
      setCurrentIndex((prev) => (prev - 1 + imageData.length) % imageData.length
      );
    });
  };

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setCurrentIndex((prev) => (prev + 1) % imageData.length);
  //     }, 3000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, [currentIndex, imageData]);

  return (
    <>
      <div className="image-carousel">
        <span
          role="button"
          aria-label="Previous image"
          onClick={handlePrevImage}
          className="image-button"
        >
          Back
        </span>
        <img
          src={imageData[currentIndex]?.images[0]}
          alt="carousel-image"
          loading="eager"
          width="400"
          height="300"
        />

        <span
          role="button"
          aria-label="Next image"
          onClick={handleNextImage}
          className="image-button"
        >
          Next
        </span>
      </div>
    </>
  );
};
