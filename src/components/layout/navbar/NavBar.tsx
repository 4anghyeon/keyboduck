import Link from 'next/link';
import React, {useEffect} from 'react';
import styles from './NavBar.module.css';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/navigation';

const NavBar = () => {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      if (info) console.log(info);
    });
  }, []);

  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    router.push('/login');
    if (error) alert('로그아웃이 안됐어요');
  };

  return (
    <div>
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
            <Link href="/review" className={styles.category}>
              마이페이지
            </Link>
            <Link href="/login" className={styles.category}>
              임시로그인
            </Link>
            <button className={styles.category} onClick={logout}>
              로그아웃
            </button>
            <Link href="/signup" className={styles.category}>
              회원가입
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
