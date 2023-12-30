import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import styles from './NavBar.module.css';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/useToast';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, setUserInfo} from '@/redux/modules/userSlice';
import MenuItem from '@/components/layout/navbar/MenuItem';
import {IoMdMenu} from 'react-icons/io';
import duckImg from '@/assets/images/duck.png';
import Image from 'next/image';
import {RootState} from '@/redux/store';
import {RealtimeChannel} from '@supabase/realtime-js';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {successTopRight, errorTopRight, duckTopRight, alertTopRight} = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userSlice);

  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    router.push('/login');
    successTopRight({message: '로그아웃 되었어요!!', timeout: 4000});
    if (error) errorTopRight({message: '로그아웃이 안됐어요!!', timeout: 4000});
  };

  const onClickDuck = () => {
    duckTopRight({message: '꽥꽥'});
  };

  useEffect(() => {
    let alertMessageChannel: RealtimeChannel | null = null;
    // auth 정보 구독
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'USER_UPDATED':
          dispatch(setUserInfo(session?.user));
          // answer 테이블 구독
          alertMessageChannel = supabase
            .channel('alert-message-insert-channel')
            .on(
              'postgres_changes',
              {event: 'INSERT', schema: 'public', table: 'alert_message', filter: `user_id=eq.${session?.user.id}`},
              payload => {
                const message = payload.new.message;
                alertTopRight({message, timeout: 2000});
              },
            )
            .subscribe();
          break;
        case 'SIGNED_OUT':
          dispatch(logoutUser());
          alertMessageChannel?.unsubscribe();
      }
    });

    return () => {
      alertMessageChannel?.unsubscribe();
    };
  }, []);

  return (
    <nav className={styles.container}>
      <Image src={duckImg} alt={'duck'} width={30} height={30} className={styles.duck} onClick={onClickDuck} />
      <Image
        src={duckImg}
        alt={'duck'}
        width={30}
        height={30}
        className={[styles.duck, styles.delay].join(' ')}
        onClick={onClickDuck}
      />
      <Link href="/" className={styles.logo}>
        Keyboduck
      </Link>
      <div className={styles.wrap}>
        <div>
          <MenuItem href="/reviews" name="리뷰" />
          <MenuItem href="/question" name="QnA" />
        </div>
        <div className={styles.auth}>
          {userInfo.id !== '' ? (
            <>
              <MenuItem href="/mypage" name="마이페이지" />
              <MenuItem name="로그아웃" onClick={logout} />
            </>
          ) : (
            <>
              <MenuItem href="/login" name="로그인" />
              <MenuItem href="/signup" name="회원가입" />
            </>
          )}
        </div>
        <div className={styles['h-menu']}>
          <button onClick={() => setShowMenu(prev => !prev)}>
            <IoMdMenu />
          </button>
          {showMenu && (
            <div className={styles['context-menu-container']}>
              <MenuItem href="/mypage" name="마이페이지" />
              <MenuItem href="/login" name="로그인" />
              <MenuItem name="로그아웃" onClick={logout} />
              <MenuItem href="/signup" name="회원가입" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
