import Image from 'next/image';
import React from 'react';
import {FaSearch} from 'react-icons/fa';
import styles from './index.module.css';
import Link from 'next/link';
import defaultImg from '../../assets/defaultImg.png';
import {useQuery} from '@tanstack/react-query';
import {fetchReview} from '../api/review';
import Loading from '@/components/layout/loading/Loading';
import {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {useToast} from '@/hooks/useToast';
import {useRouter} from 'next/router';

const ReviewPage = () => {
  const [userId, setUserId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [sortedReview, setSortedReview] = useState([]);
  const userInfo = useSelector((state: RootState) => state.userSlice);
  const {warnTopCenter} = useToast();
  const router = useRouter();
  const currentPageReview = 6;
  const {
    isLoading,
    isError,
    data: fetchReviewData,
  } = useQuery({
    queryKey: ['fetchReviewList'],
    queryFn: fetchReview,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });

  // 최신순으로 정렬하기
  // useEffect(() => {
  //   if (fetchReviewData?.data) {
  //     const sortedData = [...fetchReviewData.data].sort((a, b) => b.write_date! - a.write_date!);
  //     setSortedReview(sortedData);
  //   }
  // }, [fetchReviewData]);

  useEffect(() => {
    if (userInfo.id !== '') setUserId(userInfo.id);
  }, [userInfo]);

  // 로그인 안하고 작성하기 클릭 시
  const writeButtonHandler = () => {
    if (userId === '') {
      warnTopCenter({message: '로그인 후 리뷰 작성이 가능합니다', timeout: 2000});
      return;
    }
    router.push('/reviews/write');
  };

  const indexOfLastReview = currentPage * currentPageReview;
  const indexOfFirstReview = indexOfLastReview - currentPageReview;
  const currentReview = fetchReviewData?.data?.slice(indexOfFirstReview, indexOfLastReview);

  // 페이지 이동
  const pagination = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumber = [];
  if (fetchReviewData?.data)
    for (let i = 1; i <= Math.ceil(fetchReviewData?.data?.length / currentPageReview); i++) {
      pageNumber.push(i);
    }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>🙇🏻‍♀️ 리스트를 불러오지 못했습니다 🙇🏻‍♀️</h2>;
  }

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>REVIEW</h1>
        <div className={styles['search-wrap']}>
          <input type="text" placeholder="검색어를 입력해주세요" maxLength={20} />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className={styles['grid-container']}>
          {currentReview?.length === 0 ? (
            <h1>등록된 리뷰가 없습니다. 리뷰를 남겨주세요💁🏻‍♀️</h1>
          ) : (
            currentReview?.map(review => {
              return (
                <div className={styles['content-container']} key={review.id}>
                  <Link href={`/reviews/${review.id}`} className={styles['content-link']}>
                    <div className={styles['content-wrap']}>
                      {review.photo ? (
                        <img src={review.photo[0]} alt="review-image" className={styles['content-image']} />
                      ) : null}
                      <div>
                        <div className={styles['user-wrap']}>
                          <div className={styles['user']}>
                            <Image src={defaultImg} alt="유저프로필" className={styles['user-profile']} />
                            <p>{review.profiles.username}</p>
                          </div>
                          <p>{review.write_date?.substring(0, 10)}</p>
                        </div>
                        <span>{review.title}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
        <div className={styles['write-wrap']}>
          <button onClick={writeButtonHandler} className={styles['write-btn']}>
            작성하기
          </button>
        </div>
        <div className={styles['pagination-button-wrap']}>
          {pageNumber.map(number => (
            <button
              key={number}
              onClick={() => pagination(number)}
              className={number === currentPage ? styles['select-button'] : styles['button']}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
