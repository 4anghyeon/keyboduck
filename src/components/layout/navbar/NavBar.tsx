import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import styles from './nav-bar.module.css';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/useToast';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, setUserInfo} from '@/redux/modules/userSlice';
import MenuItem from '@/components/layout/navbar/MenuItem';
import {IoMdMenu} from 'react-icons/io';
import duckImg from '@/assets/images/duck.png';
import logoImg from '@/assets/images/logo.png';
import Image from 'next/image';
import {RootState} from '@/redux/store';
import {RealtimeChannel} from '@supabase/realtime-js';
import {BiSolidBell, BiSolidBellRing} from 'react-icons/bi';
import {ALERT_MESSAGE_QUERY_KEY, useAlertMessage} from '@/hooks/useAlertMessage';
import MessageListContainer from '@/components/layout/navbar/MessageListContainer';
import {queryClient} from '@/pages/_app';
import {findUser} from '@/pages/api/profiles';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMessageList, setShowMessageList] = useState(false);
  const [ringBell, setRingBell] = useState(false);
  const {successTopRight, errorTopRight, duckTopRight, alertBottomRight} = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userSlice);
  const {messageList, hasNextPage, fetchNextMessageList, isMessageFeting} = useAlertMessage(userInfo.id);

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
        case 'SIGNED_IN':
          successTopRight({message: '로그인 되었습니다!', timeout: 4000});
        case 'INITIAL_SESSION':
        case 'USER_UPDATED':
          // profile에서 가져온 데이터를 넣어야함
          findUser(session?.user.id!).then(user => {
            console.log('user', user);
            dispatch(setUserInfo(user));
          });

          if (session?.user) {
            // 로그인이 된 경우만 alert_message 테이블 구독
            alertMessageChannel = supabase
              .channel('alert-message-insert-channel')
              .on(
                'postgres_changes',
                {event: 'INSERT', schema: 'public', table: 'alert_message', filter: `user_id=eq.${session?.user.id}`},
                payload => {
                  // alsert_message 테이블에 데이터가 들어오는데, user_id(메시지 받는 사람)이 본인 아이디일 경우 알람을 띄운다.
                  const message = payload.new.message;
                  alertBottomRight({message, timeout: 2000});

                  queryClient.invalidateQueries({
                    queryKey: [ALERT_MESSAGE_QUERY_KEY],
                  });

                  // 알람 아이콘 흔들림 효과
                  setRingBell(true);
                  setTimeout(() => {
                    setRingBell(false);
                  }, 1000);
                },
              )
              .subscribe();
          }

          break;
        case 'SIGNED_OUT':
          // 로그아웃을 할 경우 현재 로그인 정보를 날리고, 모든 구독을 취소한다.
          dispatch(logoutUser());
          alertMessageChannel?.unsubscribe();
      }
    });

    return () => {
      // navbar에서 이 cleanup 함수가 일어난다는 것은 페이지를 아예 나간다는 뜻
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
        <Image src={logoImg} alt={'logo image'} width={300} height={300} />
        <span>Keyboduck</span>
      </Link>
      <div className={styles.wrap}>
        <div>
          <MenuItem href="/reviews" name="리뷰" />
          <MenuItem href="/question" name="QnA" />
        </div>
        <div className={styles.auth}>
          {userInfo.id !== '' ? (
            <>
              <button
                className={[styles.bell, ringBell ? styles.hide : ''].join(' ')}
                onClick={() => setShowMessageList(true)}
              >
                <BiSolidBell size={25} />
                <span className={styles['message-count']}>{messageList?.filter(m => !m?.read).length}</span>
              </button>
              <button
                className={[styles['ring-bell'], ringBell ? '' : styles.hide].join(' ')}
                onClick={() => setShowMessageList(true)}
              >
                <BiSolidBellRing size={25} />
                <span className={styles['message-count']}>{messageList?.filter(m => !m?.read).length}</span>
              </button>
              <MenuItem href="/mypage" name="마이페이지" />
              <MenuItem name="로그아웃" onClick={logout} />
              {showMessageList && (
                <MessageListContainer
                  messageList={messageList?.map(p => p!).flat() ?? []}
                  setShowMessageList={setShowMessageList}
                  hasNextPage={hasNextPage}
                  fetchNextMessageList={fetchNextMessageList}
                  isMessageFeting={isMessageFeting}
                />
              )}
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
