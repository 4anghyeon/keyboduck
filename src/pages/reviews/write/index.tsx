import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';

const ReviewWrite = () => {
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>REVIEW</h1>
        <div className={styles['search-wrap']}>
          <button>키보드 종류 검색</button>
        </div>
        <div className={styles['write-container']}>
          <div className={styles.title}>
            <input type="text" placeholder="제목을 입력해주세요(최대 15자)" />
          </div>
          <div className={styles.image}>
            <p>이미지는 필수입니다(최대5장)</p>
            <div className={styles['image-drag']}>
              <input id="inputImg" type="file" accept="image/*" />
              <label htmlFor="inputImg">드래그하거나 클릭하여 이미지를 업로드해주세요</label>
            </div>
            <div className={styles['image-preview']}>
              <Image src="" alt="preview" />
            </div>
            <div className={styles.contents}>
              <textarea type="text" placeholder="내용을 입력해주세요(최대 300자)" />
            </div>
          </div>
        </div>
        <div className={styles['submit-btn']}>
          <Link href="/reviews/reviewId">상세페이지</Link>
          <button>등록하기</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWrite;
