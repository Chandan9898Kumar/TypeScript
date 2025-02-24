import { useEffect } from 'react';
import styles from "./toast.module.css";

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    message: string;
    onClose: () => void;
    position?: ToastPosition;
    type?: ToastType;
    duration?: number;
    index?: number; // Add index for horizontal positioning
    showIcon?: boolean;
}

const ToastBar = ({
    message,
    onClose,
    position = 'top-right',
    type = 'info',
    duration = 3000,
    index = 0,
    showIcon = true
}: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
                return 'ℹ';
            default:
                return '';
        }
    };

    return (
        <div 
            className={`${styles.toast} ${styles[position]} ${styles[type]}`}
            style={{ 
                transform: `translateX(${index * 320}px)` // Offset each toast horizontally
            }}
        >
            <div className={styles.toastContent}>
                {showIcon && <span className={styles.icon}>{getIcon()}</span>}
                <p className={styles.message}>{message}</p>
                <button 
                    onClick={onClose}
                    className={styles.closeButton}
                    aria-label="Close notification"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default ToastBar;
