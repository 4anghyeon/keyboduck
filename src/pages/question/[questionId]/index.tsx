import React, {useCallback, useEffect, useState} from 'react';
import styles from '@/pages/question/[questionId]/index.module.css';
import QuestionDetailContents from '@/components/question/QuestionDetailContents';
import QuestionDetailComment from '@/components/question/QuestionDetailComment';
import {useQuery} from '@tanstack/react-query';
import {getQuestion} from '@/pages/api/question';
import {getAnswer} from '@/pages/api/answer';
import Loading from '@/components/layout/loading/Loading';
import {useRouter} from 'next/router';
import {Modal} from '@/components/modal/Modal';
import ModalContent from '@/components/modal/ModalContent';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

const QuestionDetail = () => {
  const [userId, setUserId] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.userSlice);

  const router = useRouter();
  const questionId: number | null = Number(router.query.questionId);

  useEffect(() => {
    if (userInfo.id !== '') setUserId(userInfo.id);
  }, [userInfo]);

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

  const getQuestionUserId = data?.getQuestionData?.find(question => question.id === questionId)?.user_id;
  const accept = data?.getQuestionData?.find(question => question.id === questionId)?.accept;
  const answerQuestionIdFilter = answer
    ?.getAnswerData!?.filter(item => item.question_id === questionId)
    ?.sort((a, b) => Number(b.is_accept) - Number(a.is_accept));

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>🙇정보를 불러오지 못했습니다.🙇</div>;
  }

  return (
    <div className={styles['detail-container']}>
      <QuestionDetailContents userId={userId} getQuestionData={data?.getQuestionData!} />
      <div className={styles['detail-answer-container']}>
        {isOpenModal && (
          <Modal onClickToggleHandler={clickOpenModal}>
            <ModalContent
              userId={userId}
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
              getQuestionData={data?.getQuestionData!}
              questionId={questionId}
            />
          </Modal>
        )}
        {!!userId ? (
          <div className={styles['detail-answer-register-btn']}>
            <button onClick={clickOpenModal}>답변 등록하기</button>
          </div>
        ) : null}
        {/* 댓글 들어가는 곳 */}
        {answerQuestionIdFilter?.map(item => {
          return (
            <QuestionDetailComment
              getQuestionUserId={getQuestionUserId!}
              key={item.id}
              userId={userId}
              getAnswer={item}
              accept={accept}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionDetail;
