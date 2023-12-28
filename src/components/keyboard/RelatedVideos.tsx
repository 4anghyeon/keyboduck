import React from 'react';
import styles from './related-videos.module.css';
import YoutubeCard from '@/components/keyboard/YoutubeCard';
import {Tables} from '@/shared/supabase/types/supabase';

const RelatedVideos = ({item}: {item: Tables<'keyboard'>}) => {
  return (
    <section className={styles.container}>
      <h1>관련 영상</h1>
      <div className={styles.row}>{item.youtube_link?.map(link => <YoutubeCard key={link} link={link} />)}</div>
    </section>
  );
};

export default RelatedVideos;
