import React, {PropsWithChildren} from 'react';
import styles from '@/components/review/reviewModal.module.css';

export const ReviewModal = ({onClickToggleHandler, children}: PropsWithChildren<ModalDefaultType>) => {
  const onRequestClose = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleHandler) {
      onClickToggleHandler();
    }
  };

  return (
    <div className={styles['modal-container']}>
      <dialog className={styles['dialog-box']} onClick={onRequestClose}>
        <div className={styles['modal-content']}>{children}</div>
      </dialog>
      <div className={styles['backdrop']} onClick={onRequestClose} />
    </div>
  );
};
