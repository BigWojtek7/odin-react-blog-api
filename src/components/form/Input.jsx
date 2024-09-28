import styles from './Input.module.css';
function Input({ name, label, type = 'text', value, onChange }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </>
  );
}
export default Input;
