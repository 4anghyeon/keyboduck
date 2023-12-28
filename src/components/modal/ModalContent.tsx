import React from 'react';
import styles from '@/components/modal/modalContent.module.css';

const ModalContent = () => {
  return (
    <div className={styles['modal-comment-container']}>
      <textarea rows={15} className={styles['modal-comment']} placeholder="답변을 입력하세요" />
      <button className={styles['modal-button']}>등록하기</button>
    </div>
  );
};

export default ModalContent;
