import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose(): void;
  title: string;
  message: string;
}

const ModalComponent: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      y: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      y: -50,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <section>
          <motion.div
            className={styles.modalOverlay}
            onClick={onClose}
            role="presentation"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.modalHeader}>
                <motion.h2
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {title}
                </motion.h2>
                <motion.button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  ×
                </motion.button>
              </div>

              <motion.div 
                className={styles.modalBody}
                variants={itemVariants}
              >
                {message}
              </motion.div>

              <motion.div 
                className={styles.closeBtn}
                variants={itemVariants}
              >
                <motion.button
                  onClick={onClose}
                  aria-label="Close modal"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
};

export default ModalComponent;
