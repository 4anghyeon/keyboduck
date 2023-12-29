'use client';

import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md';
import defaultImg from '../../../assets/defaultImg.png';
import ReviewDetailComment from '@/components/review/ReviewDetailComment';
import {useState} from 'react';
import {ReviewType} from '@/shared/types/review';
import {useEffect} from 'react';
import {supabase} from '@/shared/supabase/supabase';

const ReviewDetail = () => {
  const [reviewList, setReviewList] = useState<ReviewType[] | null>([]);
  const router = useRouter();
  const reviewId: number | null = Number(router.query.reviewId);
  const detailReviewId = reviewList?.find(review => {
    return review.id === reviewId;
  });

  useEffect(() => {
    const getReviewList = async () => {
      const {data: fetchReviewList, error} = await supabase.from('review').select('*');
      setReviewList(fetchReviewList);
    };
    getReviewList();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div>
          <div className={styles['title-wrap']}>
            <h1 className={styles.title}>{detailReviewId?.title}</h1>
            <div className={styles['user-profile']}>
              <Image src={defaultImg} alt="profile-image" width={60} height={60} />
              <p>{detailReviewId?.author}</p>
            </div>
            <div className={styles.wrap}>
              <span>{detailReviewId?.write_date!.replace('T', ' ').substring(0, 19)}</span>
              <div>
                <button>수정 |</button>
                <button>삭제</button>
              </div>
            </div>
          </div>
          <div className={styles['image-slide']}>
            <button>
              <MdOutlineArrowBackIos />
            </button>
            <div className={styles['image-container']}>
              {detailReviewId?.photo ? <img src={detailReviewId.photo[0]} alt="review-image" /> : null}
            </div>
            <button>
              <MdOutlineArrowForwardIos />
            </button>
          </div>
          <div className={styles.contents}>
            <p>{detailReviewId?.content}</p>
          </div>
        </div>

        <ReviewDetailComment />
      </div>
    </div>
  );
};

export default ReviewDetail;
