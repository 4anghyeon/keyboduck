import React from 'react';
import styles from '@/pages/question/index.module.css';
import Link from 'next/link';
import QuestionList from '@/components/question/QuestionList';
import {getQuestion} from '../api/question';
import {useQuery} from '@tanstack/react-query';
import Loading from '@/components/layout/loading/Loading';

const Question = () => {
  const {
    isLoading,
    isError,
    data: questionList,
  } = useQuery({
    queryKey: ['getQuestion'],
    queryFn: getQuestion,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles['qna-container']}>
      <div className={styles['qna-title']}>
        <h2>QnA</h2>
      </div>
      <div className={styles['qna-sreach-bar']}>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button>⌕</button>
      </div>
      <div className={styles['qna-list']}>
        <div className={styles['qna-list-title']}>
          <p>날짜</p>
          <p>제목</p>
          <p>작성자</p>
        </div>
        {/* 데이터 들어갈 자리 */}
        {questionList?.getQuestionData?.map(question => {
          return <QuestionList key={question.id} question={question} />;
        })}
      </div>
      <div className={styles['qna-registration-btn']}>
        <Link href="/question/write">
          <button>등록하기</button>
        </Link>
      </div>
    </div>
  );
};

export default Question;
