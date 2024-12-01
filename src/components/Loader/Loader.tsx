import { useEffect, useState } from 'react';

import styles from './Loader.module.css';
import useLoader from '../../contexts/Loader/useLoader';

function Loader() {
  const { isLoading, loaderText } = useLoader();
  const [isDelay, setIsDelay] = useState(false);

  console.log(isLoading)
  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setIsDelay(true);
      }, 3000);
      return () => clearTimeout(timeoutId);
    } else {
      setIsDelay(false);
    }
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <div className={styles.overlay}>
          <div className={styles.loaderContainer}>
            <span className={styles.spinner} />
            <span className={styles.text}>{loaderText}</span>
            {isDelay && (
              <span className={styles.text}>
                loading may take longer when server wakes up
              </span>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Loader;
