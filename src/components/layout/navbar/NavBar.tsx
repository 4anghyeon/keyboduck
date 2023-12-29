import Link from 'next/link';
import React, {useEffect} from 'react';
import styles from './navBar.module.css';
import {supabase} from '@/shared/supabase/supabase';

const NavBar = () => {
  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      if (info) console.log(info);
    });
  }, []);

  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.logo}>
        Keyboduck
      </Link>
      <div className={styles.wrap}>
        <div>
          <Link href="/reviews" className={styles.category}>
            리뷰
          </Link>
          <Link href="/question" className={styles.category}>
            QnA
          </Link>
        </div>
        <div>
          <Link href="/" className={styles.category}>
            마이페이지
          </Link>
          <Link href="/login" className={styles.category}>
            로그인
          </Link>
          <Link href="/" className={styles.category}>
            로그아웃
          </Link>
          <Link href="/signup" className={styles.category}>
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
