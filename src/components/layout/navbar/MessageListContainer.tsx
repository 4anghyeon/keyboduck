import React, {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import styles from '@/components/layout/navbar/nav-bar.module.css';
import MessageRow from '@/components/layout/navbar/MessageRow';
import {Tables} from '@/shared/supabase/types/supabase';
import {FetchNextPageOptions, InfiniteQueryObserverResult} from '@tanstack/query-core';
import Loading2 from '@/components/layout/loading/Loading2';

interface PropType {
  messageList: Tables<'alert_message'>[];
  setShowMessageList: Dispatch<SetStateAction<boolean>>;
  hasNextPage: boolean;
  fetchNextMessageList: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<(Tables<'alert_message'> | null)[], Error>>;
  isMessageFeting: boolean;
}

const MessageListContainer = ({
  messageList,
  setShowMessageList,
  hasNextPage,
  fetchNextMessageList,
  isMessageFeting,
}: PropType) => {
  const onClickLoadMore = () => {
    if (hasNextPage) fetchNextMessageList();
  };

  // handleClick을 useEffect바깥, useCallback으로 감싸줘야 하나의 이벤트만 등록된다고 보장할 수 있음
  // 그렇지 않을 경우 여러 개의 이벤트가 중복 등록되어 원하는 동작으로 작동하지 못함!
  const handleClick = useCallback((e: MouseEvent) => {
    if ((e.target as HTMLElement)?.id !== 'show-more-button') {
      setShowMessageList(false);
    }
  }, []);

  useEffect(() => {
    // 알림 메시지 목록이 나타나고, widnow 어느 곳을 클릭하든 닫히게 한다.
    setTimeout(() => {
      window.addEventListener('click', handleClick);
    }, 100);

    // 알림 메시지 목록 컴포넌트가 사라질 때 이벤트를 제거한다.
    return () => {
      window.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className={styles['message-list-container']}>
      {messageList.length > 0 && (
        <>
          {messageList?.map(message => {
            if (message) return <MessageRow key={message.id} item={message} />;
          })}
          {isMessageFeting && <Loading2 />}
          <button
            id="show-more-button"
            onClick={onClickLoadMore}
            disabled={!hasNextPage}
            className={!hasNextPage ? styles.disabled : ''}
          >
            {hasNextPage ? '지난 알림 더 보기' : '불러올 알림이 없습니다.'}
          </button>
        </>
      )}
      {messageList?.length === 0 && <p>알림이 없습니다. 🫥</p>}
    </div>
  );
};

export default MessageListContainer;
