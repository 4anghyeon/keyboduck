import React from 'react';
import styles from '@/components/question/QuestionDetailComment.module.css';
import {AnswerType} from '@/pages/question/types/question';
import {useRouter} from 'next/router';

const QuestionDetailComment = ({getAnswer}: {getAnswer: AnswerType[] | null}) => {
  console.log(getAnswer);
  const router = useRouter();
  const questionId: number | null = Number(router.query.questionId);

  const answerQuestionIdFilter = getAnswer?.filter(item => item.question_id === questionId);

  return (
    <div>
      {answerQuestionIdFilter?.map(item => {
        return (
          <div key={item.id} className={styles['detail-answer']}>
            <div className={styles['detail-answer-user']}>
              <p>{item.author}</p>
              <div className={styles['detail-answer-select']}>
                <button>채택하기</button>
                <div className={styles['detail-answer-btn']}>
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </div>
            </div>
            <div className={styles['detail-answer-date']}>
              <p>{item.write_date?.substring(0, 10)}</p>
            </div>
            <div className={styles['detail-answer-content']}>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionDetailComment;
