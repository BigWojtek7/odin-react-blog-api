import { useEffect, useState } from 'react';
import useLoader from './useLoader';

const useFetch = (url, options) => {
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);

  const { start: loaderStart, stop: loaderStop } = useLoader();

  useEffect(() => {
    if (url) {
      let ignore = false;
      const fetchForData = async () => {
        try {
          loaderStart();
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error: Status ${response.status}`);
          }
          const responseJSON = await response.json();
          if (!ignore) {
            setFetchData(responseJSON);
          }
        } catch (err) {
          setError(err);
          console.log(err);
        } finally {
          loaderStop();
        }
      };
      fetchForData();
      return () => {
        ignore = true;
      };
    }
  }, [url, options, loaderStart, loaderStop]);

  return { fetchData, setFetchData, error };
};

export default useFetch;
