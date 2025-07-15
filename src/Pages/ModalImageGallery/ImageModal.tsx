import { Products } from "./Schema";
import styles from "./Gallery.module.css";

interface ImageModalProps {
  setImageIndex: (index: null | number) => void;
  selectedImage: Products;
  handleback: () => void;
  handleNext: () => void;
}

const ImageModal = ({
  setImageIndex,
  selectedImage,
  handleback,
  handleNext,
}: ImageModalProps) => {
  return (
    <div
      className={styles.modal}
      onClick={() => {
        setImageIndex(null);
      }}
    >
      <div
        className={styles.container}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button title="Back" className={styles.btn} onClick={handleback}>
          {"<"}
        </button>
        <img
          src={selectedImage.images[0]}
          alt={selectedImage.title}
          loading="lazy"
        />
        <button title="Next" className={styles.btn} onClick={handleNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
