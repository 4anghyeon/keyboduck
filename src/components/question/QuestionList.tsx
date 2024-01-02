import React from 'react';
import styles from '@/components/question/QuestionList.module.css';
import Link from 'next/link';
import {Tables} from '@/shared/supabase/types/supabase';

const QuestionList = ({question}: {question: Tables<'question'>}) => {
  return (
    <div className={styles['qna-a-tag']}>
      <Link href={`/question/${question.id}`}>
        <div className={styles['qna-list-item']}>
          <p>{question.write_date?.substring(0, 10)}</p>
          <p>{question.category}</p>
          <p>{question.title}</p>
          <p>{question.profiles.username}</p>
        </div>
      </Link>
    </div>
  );
};

export default QuestionList;
