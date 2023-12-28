'use client';

import Image from 'next/image';
import React from 'react';
import {FaSearch} from 'react-icons/fa';
import styles from './index.module.css';
import Link from 'next/link';
import defaultImg from '../../assets/defaultImg.png';
import reviewImg from '../../assets/reviewImg.jpeg';
import {useQuery} from '@tanstack/react-query';
import {fetchReview} from '../api/review';
import Loading from '@/components/layout/loading/Loading';

const ReviewPage = () => {
  const {isLoading, isError, data} = useQuery({
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
        <div className={styles['content-container']}>
          <div className={styles['content-wrap']}>
            <Image src={reviewImg} alt="review-image" className={styles['content-image']} />
            <div>
              <div className={styles['user-wrap']}>
                <div className={styles['user']}>
                  <Image src={defaultImg} alt="유저프로필" className={styles['user-profile']} />
                  <p>유저닉네임</p>
                </div>
                <p>2023-12-27</p>
              </div>
              <span>제목입니다</span>
            </div>
          </div>
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
