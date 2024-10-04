import styles from './Input.module.css';

function Input({ name, label, type = 'text', value, onChange, error }) {
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
