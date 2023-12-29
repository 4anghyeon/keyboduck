import Link from 'next/link';
import React, {useEffect} from 'react';
import styles from './NavBar.module.css';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/useToast';
import MenuItem from '@/components/layout/navbar/MenuItem';
import {IoMdMenu} from 'react-icons/io';

const NavBar = () => {
  const {successTopRight, errorTopRight} = useToast();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      if (info) console.log(info);
    });
  }, []);

  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    router.push('/login');
    successTopRight({message: '로그아웃 되었어요!!', timeout: 4000});
    if (error) errorTopRight({message: '로그아웃이 안됐어요!!', timeout: 4000});
  };

  // TODO: 로그인 여부에 따라 조건부 렌더링! (전역 관리가 되면 구현 예정)
  return (
    <nav className={styles.container}>
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
          <IoMdMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
