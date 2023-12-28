'use client';

import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md';
import defaultImg from '../../../assets/defaultImg.png';
import reviewImg from '../../../assets/reviewImg.jpeg';
import ReviewDetailComment from '@/components/review/ReviewDetailComment';

const ReviewDetail = () => {
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>제목입니다</h1>
        <div className={styles['user-profile']}>
          <Image src={defaultImg} alt="profile-image" width={60} height={60} />
          <p>유저닉네임</p>
        </div>
        <div className={styles.wrap}>
          <span>2023-12-27</span>
          <div>
            <button>수정 |</button>
            <button>삭제</button>
          </div>
        </div>

        <div className={styles['image-slide']}>
          <button>
            <MdOutlineArrowBackIos />
          </button>
          <div className={styles['image-container']}>
            <Image src={reviewImg} alt="review-image" className={styles['review-image']} />
          </div>
          <button>
            <MdOutlineArrowForwardIos />
          </button>
        </div>
        <div className={styles.contents}>
          <p>내용입니다</p>
        </div>
        <ReviewDetailComment />
      </div>
    </div>
  );
};

export default ReviewDetail;
