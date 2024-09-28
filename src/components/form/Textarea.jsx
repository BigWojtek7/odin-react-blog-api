import styles from './Textarea.module.css';
function Textarea({ name, label, value, onChange }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={styles.textarea}
      ></textarea>
    </>
  );
}
export default Textarea;
