'use client';

import { useEffect, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  // закриваємо модалку по натисканню Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      // якщо є колбек, викликаємо його, інакше повертаємось назад по історії
      if (onClose) {
        onClose();
        return;
      }

      router.back();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose, router]);

  // закриваємо модалку по кліку на бекдроп
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClose) {
      onClose();
      return;
    }

    router.back();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}

export default Modal;
