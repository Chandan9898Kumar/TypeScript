import { lazy, Suspense, useEffect, useState } from "react";
import styles from './Gallery.module.css';
import { Products } from "./Schema";
const URL = "https://dummyjson.com/product";
const ImageContainer = lazy(() => import("./ImageContainer"));


export default function ModalImageGallery() {
  const [imagesData, setImageData] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getImage() {
      try {
        const response = await fetch(URL);
        const result = await response.json();
        setImageData(result.products);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    }

    getImage();
  }, []);

  return (
    <div>
      <h1 className={styles.h1}>Image Pop up</h1>
      {!isLoading && (
        <Suspense fallback={<div>Loading...</div>}>
          <ImageContainer images={imagesData} />
        </Suspense>
      )}
    </div>
  );
}
