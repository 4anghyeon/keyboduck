'use client';

import React from 'react';
import styles from '@/pages/question/[questionId]/index.module.css';
import QuestionDetailContents from '@/components/question/QuestionDetailContents';
import QuestionDetailComment from '@/components/question/QuestionDetailComment';

const QuestionDetail = () => {
  return (
    <div className={styles['detail-container']}>
      <QuestionDetailContents />
      <div className={styles['detail-answer-container']}>
        <div className={styles['detail-answer-register-btn']}>
          <button>답변 등록하기</button>
        </div>
        {/* 댓글 들어갈 곳 */}
        <QuestionDetailComment />
      </div>
    </div>
  );
};

export default QuestionDetail;
