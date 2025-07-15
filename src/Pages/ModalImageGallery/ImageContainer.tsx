import { useState } from "react";
import styles from "./Gallery.module.css";
import ImageModal from "./ImageModal";
import { Products } from "./Schema";

interface ImageContainerProps {
  images: Products[];
}

const ImageContainer = ({ images }: ImageContainerProps) => {
  const [imageIndex, setImageIndex] = useState<null | number>(null);

  const handleback = () => {
    document.startViewTransition(() => {
      setImageIndex(
        (prevIndex) =>
          ((prevIndex as number) - 1 + images.length) % images.length
      );
    });
  };

  const handleNext = () => {
    document.startViewTransition(() => {
      setImageIndex((prevIndex) => ((prevIndex as number) + 1) % images.length);
    });
  };

  return (
    <div>
      <ul role="list" className={styles.ul}>
        {images.map((item, index) => (
          <li
            className={styles.li}
            key={item.id}
            style={{ contentVisibility: "auto", containIntrinsicSize: "200px" }}
          >
            <button
              onClick={() => setImageIndex(index)}
              aria-label={`View image: ${item.title}`}
            >
              <img
                className={styles.img}
                src={item.images[0]}
                alt={item.title}
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      {imageIndex !== null && (
        <ImageModal
          selectedImage={images[imageIndex]}
          handleback={handleback}
          handleNext={handleNext}
          setImageIndex={setImageIndex}
        />
      )}
    </div>
  );
};

export default ImageContainer;
