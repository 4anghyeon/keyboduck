import Image from 'next/image';
import React from 'react';
import loadingBar from '../../../assets/Spinner-1s-147px.gif';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <p>키보드를 배달중입니다</p>
      <Image src={loadingBar} alt="loading" />
    </div>
  );
};

export default Loading;
