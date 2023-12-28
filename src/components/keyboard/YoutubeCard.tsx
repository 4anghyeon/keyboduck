import React from 'react';
import styles from './youtube-card.module.css';

const YoutubeCard = ({link}: {link: string}) => {
  return (
    <div className={styles.container}>
      <iframe
        src={link}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeCard;
