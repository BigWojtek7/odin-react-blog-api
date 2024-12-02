import { useEffect, useState } from 'react';
import useLoader from '../contexts/Loader/useLoader';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';

const useFetch = <T>(url: string | null, options?: RequestInit) => {
  const [fetchData, setFetchData] = useState<T | []>([]);
  const [error, setError] = useState<Error | unknown | null>(null);

  const { start: loaderStart, stop: loaderStop } = useLoader();

  useEffect(() => {
    if (url) {
      let ignore = false;
      const fetchForData = async () => {
        try {
          loaderStart();
          const response = await requestWithNativeFetch(url, options);
          if (!ignore) {
            setFetchData(response);
          }
        } catch (err) {
          if (err instanceof Error) {
            console.log(err.name);
            console.log(err.message);
            setError(err);
          } else {
            console.log('Nieznany błąd', err);
            setError(err);
          }
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
