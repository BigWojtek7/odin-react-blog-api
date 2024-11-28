import styles from './Button.module.css';
import { ButtonHTMLAttributes, CSSProperties, MouseEventHandler } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  value?: string | number;
  style?: CSSProperties;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

function Button({
  children,
  onClick,
  value,
  style,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      value={value}
      style={style}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
