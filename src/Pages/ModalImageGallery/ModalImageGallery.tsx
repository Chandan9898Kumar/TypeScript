import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import ImageContainer from "./ImageContainer";
import { Products } from "./Schema";
const URL = "https://dummyjson.com/product";

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
      {!isLoading && <ImageContainer images={imagesData} />}
    </div>
  );
}
