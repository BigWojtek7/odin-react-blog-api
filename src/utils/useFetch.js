import { useEffect, useState } from 'react';

const useFetch1 = (url, options) => {
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (url) {
      let ignore = false;
      const fetchForData = async () => {
        try {
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
        } finally {
          setLoading(false);
        }
      };
      fetchForData();
      return () => {
        ignore = true;
      };
    }
  }, [url, options]);

  return { fetchData, error, loading };
};

export default useFetch1;
