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
import {useRouter} from 'next/router';
import {GrPowerReset} from 'react-icons/gr';
import {Tables} from '@/shared/supabase/types/supabase';
import {FaSearch} from 'react-icons/fa';

const OPTION = ['전체', '가격', '성능', '고장', '기타'];

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
  const [category, setCategory] = useState<string>('전체');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuestions, setSearchQuestions] = useState<Tables<'question'>[]>([]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const clickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset category state when searching
    setCategory('전체');

    const searchString = search.toLocaleLowerCase();
    const filteredList = categoryFiltering()?.filter(question =>
      question.title?.toLocaleLowerCase().includes(searchString),
    );
    setSearchQuestions(filteredList || []);
    setIsSearching(true);
    setPage(1);

    router.push(`/question?keyword=${search}`, undefined, {shallow: true});
  };

  const resetSearch = () => {
    setSearch('');
    setCategory('전체');
    setSearchQuestions([]);
    setIsSearching(false);
    setPage(1);
    router.push('/question');
  };

  // 검색 초기화
  const clickSearchReset = () => {
    resetSearch();
  };

  const categoryFiltering = () => {
    if (category === '전체') {
      return questionList?.getQuestionData;
    } else {
      return questionList?.getQuestionData?.filter(item => category === item.category);
    }
  };

  const isSearchingcategoryfilter = () => {
    if (category === '전체') {
      return searchQuestions;
    } else {
      return searchQuestions?.filter(item => category === item.category);
    }
  };

  const filteredQuestions = categoryFiltering();
  // 검색 중일 때 카테고리 필터 돌린 값
  const isSearchingfilteredQuestions = isSearchingcategoryfilter();

  // 현재 페이지
  const [page, setPage] = useState(1);
  // 게시물 총 개수
  const total = filteredQuestions?.length || 0;
  // 한 페이지에 보여질 게시물 개수
  const limit = 10;
  // 페이지의 총 개수
  const numPages = Math.ceil(total / limit);
  // 첫 게시물의 인덱스
  const offset = (page - 1) * limit;

  useEffect(() => {
    // 전체데이터가 변할 때마다 게시물 수 업데이트
    setPage(1);
  }, [filteredQuestions, search]);

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
      <div className={styles['qna-search-bar']}>
        <select className={styles['qna-search-select']} onChange={onChangeCategory}>
          {OPTION.map(item => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <form className={styles['qna-search-form']} onSubmit={clickSearch}>
          <input value={search} onChange={onChangeSearch} type="text" placeholder="검색어를 입력해주세요" />
          <button type="submit">
            <FaSearch />
          </button>
          {isSearching ? (
            <button type="button" onClick={clickSearchReset}>
              <GrPowerReset size={20} />
            </button>
          ) : null}
        </form>
      </div>
      <div className={styles['qna-list']}>
        <div className={styles['qna-list-title']}>
          <p>날짜</p>
          <p>카테고리</p>
          <p>제목</p>
          <p>작성자</p>
        </div>
        {/* 데이터 들어갈 자리 */}
        {total === 0 ? (
          <div className={styles['nothing']}>
            <p>{isSearching ? '검색 결과가 없습니다😭' : '게시물이 없습니다😭'}</p>
          </div>
        ) : isSearching ? (
          isSearchingfilteredQuestions
            .slice(offset, offset + limit)
            .map(question => <QuestionList key={question.id} question={question} />)
        ) : (
          filteredQuestions
            ?.slice(offset, offset + limit)
            .map(question => <QuestionList key={question.id} question={question} />)
        )}
      </div>
      <div className={styles['qna-registration-btn']}>
        {!!userData && !isSearching ? (
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
