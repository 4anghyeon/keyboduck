import React, {Dispatch, SetStateAction, useEffect} from 'react';
import styles from '@/components/layout/navbar/nav-bar.module.css';
import MessageRow from '@/components/layout/navbar/MessageRow';
import {Tables} from '@/shared/supabase/types/supabase';

const MessageListContainer = ({
  messageList,
  setShowMessageList,
}: {
  messageList: Tables<'alert_message'>[];
  setShowMessageList: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const handleClick = () => {
      setShowMessageList(false);
    };

    // 알림 메시지 목록이 나타나고, widnow 어느 곳을 클릭하든 닫히게 한다.
    setTimeout(() => {
      window.addEventListener('click', handleClick);
    });

    // 알림 메시지 목록 컴포넌트가 사라질 때 이벤트를 제거한다.
    return () => {
      window.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className={styles['message-list-container']}>
      {messageList?.map(message => <MessageRow key={message.id} item={message} />)}
      {messageList?.length === 0 && <p>알림이 없습니다. 🫥</p>}
    </div>
  );
};

export default MessageListContainer;
