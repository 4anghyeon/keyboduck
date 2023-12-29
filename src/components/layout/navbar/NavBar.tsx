import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import styles from './NavBar.module.css';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/useToast';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '@/redux/modules/userSlice';
import MenuItem from '@/components/layout/navbar/MenuItem';
import {IoMdMenu} from 'react-icons/io';
import duckImg from '@/assets/images/duck.png';
import Image from 'next/image';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {successTopRight, errorTopRight, duckTopRight} = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === 'SIGNED_IN') {
        // handle sign in event
        dispatch(setUserInfo(session?.user));
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        dispatch(setUserInfo(session?.user));
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
        dispatch(setUserInfo(session?.user));
      }
    });
  }, []);

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
    supabase.auth.getUserIdentities().then(info => {
      if (info) console.log(info);
    });
  }, []);

  // TODO: 로그인 여부에 따라 조건부 렌더링! (전역 관리가 되면 구현 예정)
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
          <MenuItem href="/mypage" name="마이페이지" />
          <MenuItem href="/login" name="로그인" />
          <MenuItem name="로그아웃" onClick={logout} />
          <MenuItem href="/signup" name="회원가입" />
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
