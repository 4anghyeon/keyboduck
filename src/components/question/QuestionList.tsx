import React from 'react';
import styles from '@/components/question/QuestionList.module.css';
import {QuestionType} from '@/pages/question/types/question';

const QuestionList = ({question}: {question: QuestionType}) => {
  console.log(question);
  return (
    <>
      <div className={styles['qna-list-item']}>
        <p>{question.write_date?.substring(0, 10)}</p>
        <p>{question.title}</p>
        <p>{question.author}</p>
      </div>
    </>
  );
};

export default QuestionList;
