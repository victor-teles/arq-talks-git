'use client';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import styles from './cursor.module.css';
import { getContrastingColor } from './get-contrasting-color';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
  x: number;
  y: number;
  color: string;
  clientName: string;
};

type CursorProps = {
  x: number;
  y: number;
  color: [string, string];
  name: string;
  avatar?: string;
  size?: number;
};

export function Cursor(props: CursorProps) {
  const { x, y, color = ['', ''], name = '', avatar = '', size = 36 } = props;

  const textColor = useMemo(() => (color ? getContrastingColor(color[1]) : undefined), [color]);
  return (
    <motion.div
      className={styles.cursor}
      initial={{ x, y }}
      animate={{ x, y }}
      transition={{
        type: 'spring',
        bounce: 0.6,
        damping: 30,
        mass: 0.8,
        stiffness: 350,
        restSpeed: 0.01,
      }}
    >
      <div className="flex gap-12 items-center">
        <AvatarCursor {...props} />
        <div className={styles.nameWrapper}>
          <div
            className={styles.namePill}
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${color[0]}, ${color[1]})`,
              color: textColor,
            }}
          >
            <div className={styles.namePillName}>{name}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AvatarCursor({ color, avatar, size, name }: CursorProps) {
  return (
    <div className={styles.avatarWrapper}>
      <svg className={styles.cursorSvg} width="32" height="44" viewBox="0 0 24 36" fill="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="500%" y2="0%">
            <stop offset="0%" stopColor={color[0]} />
            <stop offset="100%" stopColor={color[1]} />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M0.928548 2.18278C0.619075 1.37094 1.42087 0.577818 2.2293 0.896107L14.3863 5.68247C15.2271 6.0135 15.2325 7.20148 14.3947 7.54008L9.85984 9.373C9.61167 9.47331 9.41408 9.66891 9.31127 9.91604L7.43907 14.4165C7.09186 15.2511 5.90335 15.2333 5.58136 14.3886L0.928548 2.18278Z"
        />
      </svg>
      <div
        className={styles.avatar}
        style={{
          outlineColor: color[0],
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function getInitials(fullName: string | null | undefined) {
  if (!fullName) return '';

  const allNames = fullName.trim().split(' ');
  const initials = allNames.reduce((acc, curr, index) => {
    let acculumator = acc;

    if (index === 0 || index === allNames.length - 1) {
      acculumator = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acculumator;
  }, '');
  return initials;
}
