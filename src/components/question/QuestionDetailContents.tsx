import React from 'react';
import styles from '@/components/question/QusetionDetailContents.module.css';
import {FaRegUserCircle} from 'react-icons/fa';
import {useRouter} from 'next/router';

import {QuestionType} from '@/pages/question/types/question';

const QuestionDetailContents = ({
  getQuestionData,
  userId,
}: {
  getQuestionData: QuestionType[] | null;
  userId: string;
}) => {
  const router = useRouter();
  const questionId: number | null = Number(router.query.questionId);
  const findQuestion = getQuestionData?.find(question => question.id === questionId);

  return (
    <div className={styles['detail-contents-container']}>
      <div className={styles['detail-category']}>
        {/* 카테고리 이름 */}
        <p>{findQuestion?.category}</p>
      </div>
      <div className={styles['detail-title']}>
        <h2>{findQuestion?.title}</h2>
        <div className={styles['detail-user']}>
          <FaRegUserCircle size="25" color="#83e0a5" />
          <p>{findQuestion?.profiles.username}</p>
        </div>
      </div>
      <div className={styles['detail-date']}>
        <p>{findQuestion?.write_date?.substring(0, 10)}</p>
      </div>
      <div className={!!userId ? styles['detail-contents-login'] : styles['detail-contents-logout']}>
        <p>{findQuestion?.content}</p>
      </div>
      {!!userId && findQuestion?.user_id === userId ? (
        <div className={styles['detail-board-btn']}>
          <button>수정</button>
          <button>삭제</button>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionDetailContents;
