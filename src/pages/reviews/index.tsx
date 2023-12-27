import Image from 'next/image';
import React from 'react';
import {FaSearch} from 'react-icons/fa';
import styles from './index.module.css';
import Link from 'next/link';
import defaultImg from '../../assets/defaultImg.png';
import reviewImg from '../../assets/reviewImg.jpeg';

const ReviewPage = () => {
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
            <div className={styles['user-wrap']}>
              <div className={styles['user']}>
                <Image src={defaultImg} alt="유저프로필" className={styles['user-profile']} />
                <p>유저닉네임</p>
              </div>
              <p>2023-12-27</p>
            </div>
            <p>제목입니다</p>
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
