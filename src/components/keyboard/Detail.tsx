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
import {RiKeyboardFill} from 'react-icons/ri';
import {IoLogoApple, IoLogoWindows} from 'react-icons/io5';
import {useToast} from '@/hooks/useToast';

interface UserInfo {
  userId: string;
}

const Detail = ({item}: {item: Tables<'keyboard'>}) => {
  const {likes, isLikePending, addLike, removeLike} = useKeyboardLike(item.id);
  const [isLiked, setIsLiked] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const {errorTopRight} = useToast();

  // 좋아요 버튼 클릭
  const onClickLike = async () => {
    // 로그인한 유저만 가능
    if (userInfo) {
      if (!isLiked) {
        addLike();
      } else {
        removeLike();
      }
    } else {
      errorTopRight({message: '로그인 후 이용해 주세요!'});
    }
  };

  useEffect(() => {
    if (userInfo && likes) {
      if (likes.map(l => l.user_id).includes(userInfo.userId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [likes]);

  // TODO: 로그인 정보를 전역으로 관리되는 유저 정보에서 가져오도록 해야함
  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      if (info)
        setUserInfo({
          userId: info.data?.identities[0].user_id ?? '',
        });
    });
  }, []);

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
        <ul className={styles['ul-grid']}>
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
          <li className={[styles.label, styles['bg-os']].join(' ')}>
            <RiKeyboardFill />키 배열:
            {item.operating_systems === 'win' && <IoLogoWindows />}
            {item.operating_systems === 'mac' && <IoLogoApple />}
            {item.operating_systems === 'both' && (
              <>
                <IoLogoWindows />
                <IoLogoApple />
              </>
            )}
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
