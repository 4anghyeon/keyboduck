import React, {PropsWithChildren} from 'react';
import styles from '@/components/modal/modal.module.css';

export const Modal = ({onClickToggleHandler, children}: PropsWithChildren<ModalDefaultType>) => {
  return (
    <div className={styles['modal-container']}>
      <dialog className={styles['dialog-box']}>{children}</dialog>
      <div className={styles['backdrop']} />
    </div>
  );
};
