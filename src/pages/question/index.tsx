import React, {useState} from 'react';
import styles from '@/pages/question/index.module.css';
import Link from 'next/link';
import QuestionList from '@/components/question/QuestionList';
import {getQuestion} from '../api/question';
import {useQuery} from '@tanstack/react-query';
import Loading from '@/components/layout/loading/Loading';
import Pagination from '@/components/question/Pagination';

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
  // 현재 페이지
  const [page, setPage] = useState(1);
  // 게시물 총 개수
  const [total] = useState(questionList?.getQuestionData?.length);
  // 한 페이지에 보여질 게시물 개수
  const limit = 10;
  // 페이지의 총 개수
  const numPages = Math.ceil(total! / limit);
  // 첫 게시물의 인덱스
  const offset = (page - 1) * limit;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>🙇정보를 불러오지 못했습니다🙇</div>;
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
        {questionList?.getQuestionData?.slice(offset, offset + limit).map(question => {
          return <QuestionList key={question.id} question={question} />;
        })}
      </div>
      <div className={styles['qna-registration-btn']}>
        <Link href="/question/write">
          <button>등록하기</button>
        </Link>
      </div>
      <Pagination page={page} setPage={setPage} numPages={numPages} />
    </div>
  );
};

export default Question;
