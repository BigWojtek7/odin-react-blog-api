import styles from './Textarea.module.css';

interface TextareaProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

function Textarea({ name, label, value, onChange, error }: TextareaProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={styles.textarea}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Textarea;
