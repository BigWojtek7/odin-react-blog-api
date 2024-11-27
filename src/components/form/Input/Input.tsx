import styles from './Input.module.css';

import { HTMLInputTypeAttribute, HTMLInputAutoCompleteAttribute } from 'react';

interface InputProps {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autocomplete?: HTMLInputAutoCompleteAttribute;
}

function Input({
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  autocomplete = 'off',
}: InputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
        autoComplete={autocomplete}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
