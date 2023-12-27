import React, {useEffect, useState} from 'react';
import styles from './detail.module.css';
import Image from 'next/image';
import {Tables} from '@/shared/supabase/types/supabase';
import {FaBluetooth, FaKeyboard} from 'react-icons/fa';
import {AiFillCalendar, AiFillShopping} from 'react-icons/ai';
import {GiMoneyStack} from 'react-icons/gi';
import {VscDebugDisconnect} from 'react-icons/vsc';
import {useKeyboardLike} from '@/hooks/useKeyboardLike';
import {supabase} from '@/shared/supabase/supabase';

const Detail = ({item}: {item: Tables<'keyboard'>}) => {
  const {likes, isLikePending, addLike, removeLike} = useKeyboardLike(item.id);
  const [isLiked, setIsLiked] = useState(false);

  const onClickLike = async () => {
    const {data} = await supabase.auth.getUserIdentities();
    if (data) {
      if (!isLiked) {
        addLike();
      } else {
        removeLike();
      }
    }
  };

  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      const {data} = info;
      if (data && likes) {
        if (likes.map(l => l.user_id).includes(data.identities[0].user_id)) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }
    });
  }, [likes]);

  if (!item) return <p>Loading...</p>;

  return (
    <section className={styles.container}>
      <div className={styles['grid-1']}>
        <Image src={item.photo ?? ''} alt={item.name} width={400} height={400} />
      </div>
      <div className={styles.header}>
        <h1>{item.name}</h1>
        <button className={[styles['like-button'], isLiked ? styles['liked'] : ''].join(' ')} onClick={onClickLike}>
          ❤️ {isLikePending ? '...' : likes?.length}
        </button>
      </div>
      <div>
        <ul>
          <li className={[styles.label, styles['bg-maker']].join(' ')}>
            <FaKeyboard /> 제조사: {item.brand}
          </li>
          <li className={[styles.label, styles['bg-release']].join(' ')}>
            <AiFillCalendar /> 출시일: {item.release_date}
          </li>
          <li className={[styles.label, styles['bg-price']].join(' ')}>
            <GiMoneyStack /> 가격:{' '}
            {new Intl.NumberFormat('ko-KO', {style: 'decimal', currency: 'KRW'}).format(item.price)} 원
          </li>
          <li className={[styles.label, styles['bg-connect']].join(' ')}>
            {item.is_wireless ? <FaBluetooth /> : <VscDebugDisconnect />} 연결방식: {item.is_wireless ? '무선' : '유선'}
          </li>
          <li>
            <button className={styles['buy-button']}>
              <a href={item.purchase_link} target={'_blank'}>
                <AiFillShopping size={20} /> <span>구매하러 가기</span>
              </a>
            </button>
          </li>
        </ul>
      </div>
      <hr />
    </section>
  );
};

export default Detail;
