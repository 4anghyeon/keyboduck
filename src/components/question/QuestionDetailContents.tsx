import React from 'react';
import styles from '@/components/question/QusetionDetailContents.module.css';
import {FaRegUserCircle} from 'react-icons/fa';
import {useRouter} from 'next/router';

import {QuestionType} from '@/pages/question/types/question';

const QuestionDetailContents = ({getQuestionData}: {getQuestionData: QuestionType[] | null}) => {
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
          <p>{findQuestion?.author}</p>
        </div>
      </div>
      <div className={styles['detail-date']}>
        <p>{findQuestion?.write_date?.substring(0, 10)}</p>
      </div>
      <div className={styles['detail-contents']}>
        <p>{findQuestion?.content}</p>
      </div>
      <div className={styles['detail-board-btn']}>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default QuestionDetailContents;
