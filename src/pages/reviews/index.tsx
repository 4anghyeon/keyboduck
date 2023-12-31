import Image from 'next/image';
import React from 'react';
import {FaSearch} from 'react-icons/fa';
import styles from './index.module.css';
import Link from 'next/link';
import defaultImg from '../../assets/defaultImg.png';
import {useQuery} from '@tanstack/react-query';
import {fetchReview} from '../api/review';
import Loading from '@/components/layout/loading/Loading';

const ReviewPage = () => {
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>🙇🏻‍♀️ 리스트를 불러오지 못했습니다 🙇🏻‍♀️</h2>;
  }

  if (fetchReviewData?.data?.length === 0) {
    <h1>등록된 리뷰가 없습니다. 리뷰를 남겨주세요💁🏻‍♀️</h1>;
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
          {fetchReviewData?.data?.length === 0 ? (
            <h1>등록된 리뷰가 없습니다. 리뷰를 남겨주세요💁🏻‍♀️</h1>
          ) : (
            fetchReviewData?.data?.map(review => {
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
          <Link href="/reviews/write" className={styles['write-btn']}>
            작성하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
