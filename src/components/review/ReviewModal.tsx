import React, {PropsWithChildren} from 'react';
import styles from '@/components/review/reviewModal.module.css';

export const ReviewModal = ({children}: PropsWithChildren<ModalDefaultType>) => {
  return (
    <div className={styles['modal-container']}>
      <dialog className={styles['dialog-box']}>
        <div className={styles['modal-content']}>{children}</div>
      </dialog>
      <div className={styles['backdrop']} />
    </div>
  );
};
