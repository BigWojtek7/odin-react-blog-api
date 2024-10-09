import { Link } from "react-router-dom";
import styles from './Logo.module.css'

function Logo() {
  return (
    <>
      <hr />
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          Daily Blog
        </Link>
      </div>
      <hr />
    </>
  );
}
export default Logo;
