import React, {MouseEventHandler} from 'react';
import Link from 'next/link';
import styles from '@/components/layout/navbar/menu-item.module.css';
import {useRouter} from 'next/router';

interface MenuItemProps {
  href?: string;
  name: string;
  onClick?: MouseEventHandler;
}

const MenuItem = ({href, name, onClick}: MenuItemProps) => {
  const router = useRouter();

  if (!href)
    return (
      <button
        className={[styles.category, router.pathname === href ? styles.active : styles['anim-link']].join(' ')}
        onClick={onClick}
      >
        {name}
      </button>
    );

  return (
    <Link
      href={`${href}`}
      className={[
        styles.category,
        href && router.pathname.includes(href ?? '') ? styles.active : styles['anim-link'],
      ].join(' ')}
    >
      {name}
    </Link>
  );
};

export default MenuItem;
