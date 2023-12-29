import React from 'react';
import styles from './related-reviews.module.css';
import {Tables} from '@/shared/supabase/types/supabase';
import ReviewCard from '@/components/keyboard/ReviewCard';
import Link from 'next/link';

const RelatedReviews = ({reviews}: {reviews: Tables<'review'>[]}) => {
  return (
    <section className={styles.container}>
      <h1>관련 리뷰</h1>
      <div className={styles.row}>
        {reviews.length === 0 && (
          <div className={styles['no-data']}>
            <p>등록 된 리뷰가 없습니다. 😥</p>
            <Link href={'/reviews/write'}>가장 먼저 리뷰 남기러 가기</Link>
          </div>
        )}
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default RelatedReviews;
