import React, {useEffect, useState} from 'react';
import styles from '@/pages/question/index.module.css';
import Link from 'next/link';
import QuestionList from '@/components/question/QuestionList';
import {getQuestion} from '../api/question';
import {useQuery} from '@tanstack/react-query';
import Loading from '@/components/layout/loading/Loading';
import Pagination from '@/components/question/Pagination';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {Tables} from '@/shared/supabase/types/supabase';
import {useRouter} from 'next/router';

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
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.userSlice);
  const [userData, setUserData] = useState('');
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuestions, setSearchQuestions] = useState<Tables<'question'>[]>([]);
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const clickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchString = search.toLocaleLowerCase();
    const filteredList = questionList?.getQuestionData?.filter(question => {
      return question.title?.toLowerCase().includes(searchString);
    });
    setSearchQuestions(filteredList!);
    setIsSearching(true);

    // router.push 대신에 router.push의 as 옵션을 사용하여 쿼리 매개변수 변경
    router.push(`/question?keyword=${search}`, undefined, {shallow: true});
  };

  const resetSearch = () => {
    setSearch('');
    setSearchQuestions([]);
    setIsSearching(false);
    router.push('/question');
  };

  // 뒤로 가기 이벤트 핸들러
  const handlePopState = () => {
    // 뒤로 가기 시 검색 상태 초기화
    resetSearch();
  };

  const QUESTION = isSearching ? searchQuestions : questionList?.getQuestionData;
  // 현재 페이지
  const [page, setPage] = useState(1);
  // 게시물 총 개수
  const total = isSearching ? searchQuestions.length : QUESTION?.length || 0;
  // 한 페이지에 보여질 게시물 개수
  const limit = 10;
  // 페이지의 총 개수
  const numPages = Math.ceil(total / limit);
  // 첫 게시물의 인덱스
  const offset = (page - 1) * limit;

  useEffect(() => {
    // popstate 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    // 전체데이터가 변할 때마다 게시물 수 업데이트
    if (!isSearching) {
      setPage(1);
    }
  }, [QUESTION, isSearching]);

  useEffect(() => {
    if (userInfo.id !== '') setUserData(userInfo.id);
  }, [userInfo]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>🙇 정보를 불러오지 못했습니다 🙇</div>;
  }

  return (
    <div className={styles['qna-container']}>
      <div className={styles['qna-title']}>
        <h2>QnA</h2>
      </div>
      <form onSubmit={clickSearch} className={styles['qna-sreach-bar']}>
        <input value={search} onChange={onChangeSearch} type="text" placeholder="검색어를 입력해주세요" />
        <button type="submit">⌕</button>
      </form>
      <div className={styles['qna-list']}>
        <div className={styles['qna-list-title']}>
          <p>날짜</p>
          <p>제목</p>
          <p>작성자</p>
        </div>
        {/* 데이터 들어갈 자리 */}
        {total === 0 ? (
          <p>{isSearching ? '검색 결과가 없습니다' : '게시물이 없습니다'}</p>
        ) : (
          QUESTION?.slice(offset, offset + limit).map(question => (
            <QuestionList key={question.id} question={question} />
          ))
        )}
      </div>
      <div className={styles['qna-registration-btn']}>
        {!!userData ? (
          <Link href="/question/write">
            <button>등록하기</button>
          </Link>
        ) : null}
      </div>
      <Pagination page={page} setPage={setPage} numPages={numPages} />
    </div>
  );
};

export default Question;
