import { useContext } from 'react';
import LoaderContext from '../../context/LoaderContext';

import styles from './Loader.module.css';

function Loader() {
  const { isLoading, loaderText } = useContext(LoaderContext);
  return (
    <>
      {isLoading ? (
        <div className={styles.overlay}>
          <div className={styles.loaderContainer}>
            <span className={styles.spinner} />
            <span className={styles.text}>{loaderText}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default Loader;
