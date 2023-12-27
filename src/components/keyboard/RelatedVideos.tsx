import React from 'react';
import styles from './related-videos.module.css';
import YoutubeCard from '@/components/keyboard/YoutubeCard';

const RelatedVideos = () => {
  return (
    <section className={styles.container}>
      <h1>관련 영상</h1>
      <div className={styles.row}>
        <YoutubeCard />
        <YoutubeCard />
        <YoutubeCard />
      </div>
    </section>
  );
};

export default RelatedVideos;
