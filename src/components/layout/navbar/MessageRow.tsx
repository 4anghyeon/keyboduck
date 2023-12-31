import React from 'react';
import {Tables} from '@/shared/supabase/types/supabase';
import styles from './message-row.module.css';
import Link from 'next/link';

const MessageRow = ({item}: {item: Tables<'alert_message'>}) => {
  let link = '/';
  if (item.type === 'answer') {
    link = `/question/${item.target_id}`;
  }

  return (
    <Link href={link} className={[styles.row, !item.read ? styles.read : ''].join(' ')}>
      {item.message}
    </Link>
  );
};

export default MessageRow;
