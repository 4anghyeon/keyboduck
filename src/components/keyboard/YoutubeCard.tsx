import React from 'react';
import styles from './youtube-card.module.css';

const YoutubeCard = () => {
  return (
    <div className={styles.container}>
      <iframe
        src="https://www.youtube.com/embed/zd8wnvT--yU?si=nA1Vu3JfhHVDPKUo&amp;controls=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeCard;
