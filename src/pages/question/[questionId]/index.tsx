'use client';

import React, {useCallback, useEffect, useState} from 'react';
import styles from '@/pages/question/[questionId]/index.module.css';
import QuestionDetailContents from '@/components/question/QuestionDetailContents';
import QuestionDetailComment from '@/components/question/QuestionDetailComment';
import {Modal} from '@/components/questionModal/Modal';
import ModalContent from '@/components/questionModal/ModalContent';
import {supabase} from '@/shared/supabase/supabase';

import {QuestionType} from '../types/question';

const QuestionDetail = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [getQuestion, setGetQuestion] = useState<QuestionType[] | null>([]);

  useEffect(() => {
    const getQuestion = async () => {
      const {data: question, error} = await supabase.from('question').select('*');
      setGetQuestion(question);
    };
    getQuestion();
  }, []);

  const clickOpenModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className={styles['detail-container']}>
      <QuestionDetailContents questionData={getQuestion} />
      <div className={styles['detail-answer-container']}>
        {isOpenModal && (
          <Modal onClickToggleHandler={clickOpenModal}>
            <ModalContent />
          </Modal>
        )}
        <div className={styles['detail-answer-register-btn']}>
          <button onClick={clickOpenModal}>답변 등록하기</button>
        </div>
        {/* 댓글 들어가는 곳 */}
        <QuestionDetailComment />
      </div>
    </div>
  );
};

export default QuestionDetail;
