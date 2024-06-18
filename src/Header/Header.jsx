import styles from "./Header.module.css"

function Header() {
  return (
    <div className="header">
      <div className={styles.logo}>Daily Blog</div>
      <hr />
    </div>
  );
}

export default Header