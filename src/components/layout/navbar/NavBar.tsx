import Link from 'next/link';
import React from 'react';
import styles from './NavBar.module.css';

const NavBar = () => {
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
            <Link href="/review" className={styles.category}>
              로그아웃
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
