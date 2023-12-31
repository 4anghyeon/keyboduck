import React, {Dispatch, SetStateAction, useEffect} from 'react';
import styles from '@/components/layout/navbar/nav-bar.module.css';
import MessageRow from '@/components/layout/navbar/MessageRow';
import {Tables} from '@/shared/supabase/types/supabase';
import {FetchNextPageOptions, InfiniteQueryObserverResult} from '@tanstack/query-core';

const MessageListContainer = ({
  messageList,
  setShowMessageList,
  hasNextPage,
  fetchNextMessageList,
}: {
  messageList: Tables<'alert_message'>[];
  setShowMessageList: Dispatch<SetStateAction<boolean>>;
  hasNextPage: boolean;
  fetchNextMessageList: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<(Tables<'alert_message'> | null)[], Error>>;
}) => {
  const onClickLoadMore = () => {
    if (hasNextPage) fetchNextMessageList();
  };

  useEffect(() => {
    const handleClick = () => {
      setShowMessageList(false);
    };

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
          <button onClick={onClickLoadMore}>지난 알림 더 보기</button>
        </>
      )}
      {messageList?.length === 0 && <p>알림이 없습니다. 🫥</p>}
    </div>
  );
};

export default MessageListContainer;
