'use client';

import React, {useCallback, useState} from 'react';
import styles from '@/pages/question/[questionId]/index.module.css';
import QuestionDetailContents from '@/components/question/QuestionDetailContents';
import QuestionDetailComment from '@/components/question/QuestionDetailComment';
import {Modal} from '@/components/questionModal/Modal';
import ModalContent from '@/components/questionModal/ModalContent';

const QuestionDetail = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const clickOpenModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className={styles['detail-container']}>
      <QuestionDetailContents />
      <div className={styles['detail-answer-container']}>
        {isOpenModal && (
          <Modal onClickToggleHandler={clickOpenModal}>
            <ModalContent />
          </Modal>
        )}
        <div className={styles['detail-answer-register-btn']}>
          <button onClick={clickOpenModal}>답변 등록하기</button>
        </div>
        {/* 댓글 들어갈 곳 */}
        <QuestionDetailComment />
      </div>
    </div>
  );
};

export default QuestionDetail;
