'use client';

import React, {useCallback, useEffect, useState} from 'react';
import styles from '@/pages/question/[questionId]/index.module.css';
import QuestionDetailContents from '@/components/question/QuestionDetailContents';
import QuestionDetailComment from '@/components/question/QuestionDetailComment';
import {useQuery} from '@tanstack/react-query';
import {getQuestion} from '@/pages/api/question';
import {getAnswer} from '@/pages/api/answer';
import Loading from '@/components/layout/loading/Loading';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/router';
import {Modal} from '@/components/modal/Modal';
import ModalContent from '@/components/modal/ModalContent';

const QuestionDetail = () => {
  const [author, setAuthor] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const router = useRouter();
  const questionId: number | null = Number(router.query.questionId);

  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      const author = info.data?.identities[0].identity_data?.name;
      if (author) setAuthor(author);
    });
  }, []);

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

  const answerQuestionIdFilter = answer?.getAnswerData!?.filter(item => item.question_id === questionId);

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
            <ModalContent author={author} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
          </Modal>
        )}
        <div className={styles['detail-answer-register-btn']}>
          <button onClick={clickOpenModal}>답변 등록하기</button>
        </div>
        {/* 댓글 들어가는 곳 */}
        {answerQuestionIdFilter?.map(item => {
          return <QuestionDetailComment key={item.id} author={author} getAnswer={item} />;
        })}
      </div>
    </div>
  );
};

export default QuestionDetail;
