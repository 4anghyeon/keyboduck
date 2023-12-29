'use client';

import React, {useCallback, useState} from 'react';
import styles from '@/pages/question/[questionId]/index.module.css';
import QuestionDetailContents from '@/components/question/QuestionDetailContents';
import QuestionDetailComment from '@/components/question/QuestionDetailComment';
import {Modal} from '@/components/questionModal/Modal';
import ModalContent from '@/components/questionModal/ModalContent';
import {useQuery} from '@tanstack/react-query';
import {getQuestion} from '@/pages/api/question';
import {getAnswer} from '@/pages/api/answer';
import Loading from '@/components/layout/loading/Loading';

const QuestionDetail = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const {isLoading, isError, data} = useQuery({
    queryKey: ['getQuestion'],
    queryFn: getQuestion,
    refetchOnWindowFocus: false,
  });

  const {data: answer} = useQuery({
    queryKey: ['getAnswer'],
    queryFn: getAnswer,
    refetchOnWindowFocus: false,
  });

  const clickOpenModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>🙇정보를 불러오지 못했습니다.🙇</div>;
  }

  return (
    <div className={styles['detail-container']}>
      <QuestionDetailContents getQuestionData={data?.getQuestionData!} />
      <div className={styles['detail-answer-container']}>
        {isOpenModal && (
          <Modal onClickToggleHandler={clickOpenModal}>
            <ModalContent isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
          </Modal>
        )}
        <div className={styles['detail-answer-register-btn']}>
          <button onClick={clickOpenModal}>답변 등록하기</button>
        </div>
        {/* 댓글 들어가는 곳 */}
        <QuestionDetailComment getAnswer={answer?.getAnswerData!} />
      </div>
    </div>
  );
};

export default QuestionDetail;
