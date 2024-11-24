import styles from './Button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  value?: string | number;
  style?: CSSProperties;
}

function Button({ children, onClick, value, style }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      value={value}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
