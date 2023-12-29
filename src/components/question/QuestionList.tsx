import React from 'react';
import styles from '@/components/question/QuestionList.module.css';
import Link from 'next/link';
import {QuestionType} from '@/pages/question/types/question';

const QuestionList = ({question}: {question: QuestionType}) => {
  return (
    <div className={styles['qna-a-tag']}>
      <Link href={`/question/${question.id}`}>
        <div className={styles['qna-list-item']}>
          <p>{question.write_date?.substring(0, 10)}</p>
          <p>{question.title}</p>
          <p>{question.author}</p>
        </div>
      </Link>
    </div>
  );
};

export default QuestionList;
