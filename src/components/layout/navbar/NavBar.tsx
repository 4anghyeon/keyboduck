import Link from 'next/link';
import React, {useEffect} from 'react';
import styles from './NavBar.module.css';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/useToast';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '@/redux/modules/userSlice';

const NavBar = () => {
  const {successTopRight, errorTopRight} = useToast();
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
