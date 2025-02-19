import { useState } from "react";
import styles from "./message.module.css";
import ModalComponent from "../../Components/Modal/Modal";
const MessageComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  return (
    <section className={styles.main}>
      <h1>Custom Modal Component </h1>
      <header className={styles.headers}>
        ▶️ A Modal is a dialog that appears on top of the app's content, and
        must be dismissed by the app before interaction can resume. It is useful
        as a select component when there are a lot of options to choose from, or
        when filtering items in a list, as well as many other use cases.
      </header>

      <div className={styles.btn}>
        <button type="button" aria-label="open modal" onClick={openModal}>
          Open
        </button>
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Example Custom Modal Component"
        message="A Modal is a dialog that appears on top of the app's content, and must be dismissed by the app before interaction can resume. It is useful as a select component when there are a lot of options to choose from, or when filtering items in a list, as well as many other use cases."
      />
    </section>
  );
};

export default MessageComponent;
