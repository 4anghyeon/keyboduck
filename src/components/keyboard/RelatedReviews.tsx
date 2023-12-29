import React from 'react';
import styles from './related-reviews.module.css';
import {Tables} from '@/shared/supabase/types/supabase';

const RelatedReviews = ({reviews}: {reviews: Tables<'review'>[]}) => {
  return (
    <section className={styles.container}>
      <h1>관련 리뷰</h1>
      {reviews.map(review => review.title)}
    </section>
  );
};

export default RelatedReviews;
