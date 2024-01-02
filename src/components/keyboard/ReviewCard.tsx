import React from 'react';
import styles from './review-card.module.css';
import {Tables} from '@/shared/supabase/types/supabase';
import Image from 'next/image';
import defaultImg from '@/assets/reviewImg.jpeg';
import defaultProfileImg from '@/assets/defaultImg.png';
import moment from 'moment';
import {useRouter} from 'next/router';

const ReviewCard = ({review}: {review: Tables<'review'>}) => {
  const router = useRouter();

  return (
    <div className={styles.container} onClick={() => router.push(`/reviews/${review.id}`)}>
      <Image src={review.photo?.[0] ?? defaultImg} alt={review.title ?? ''} width={300} height={300} />
      <div className={styles['review-info']}>
        <div>
          <Image
            src={review.profiles?.avatar_url ?? defaultProfileImg}
            alt={review.profiles?.username ?? ''}
            width={300}
            height={300}
            className={styles.profile}
          />
          <span>{review.profiles?.username}</span>
        </div>
        <span className={styles.date}>{moment(review.write_date).format('yyyy-MM-DD')}</span>
      </div>
      <h3 className={styles.title}>{review.title}</h3>
    </div>
  );
};

export default ReviewCard;
