import React from 'react';
import {Tables} from '@/shared/supabase/types/supabase';
import styles from './message-row.module.css';
import {useRouter} from 'next/router';
import {useAlertMessage} from '@/hooks/useAlertMessage';
import moment from 'moment';

const MessageRow = ({item}: {item: Tables<'alert_message'>}) => {
  const router = useRouter();
  const {updateAlertMessage} = useAlertMessage();
  let link = '/';
  if (item.type === 'answer') {
    link = `/question/${item.target_id}`;
  } else if (item.type === 'comment') {
    link = `/reviews/${item.target_id}`;
  } else if (item.type === 'accept') {
    link = `/questions/${item.target_id}`;
  }

  const onClickMessage = () => {
    router.push(link).then(() => {
      updateAlertMessage(item.id);
    });
  };

  return (
    <div className={[styles.row, !item.read ? styles.read : ''].join(' ')} onClick={onClickMessage}>
      <span>{item.message}</span>
      <span>{moment(item.created_at).format('yyyy-MM-DD HH:mm')}</span>
    </div>
  );
};

export default MessageRow;
