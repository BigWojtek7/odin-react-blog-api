import { useEffect, useState } from 'react';

const useFetch = (url, method, headers, data = undefined) => {
  const [fetchData, setFetchData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForData = async () => {
      try {
        const response = await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(data),
        });
        const responseJSON = await response.json();
        setFetchData(responseJSON);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchForData();
  }, [data, headers, method, url]);

  return { fetchData, error, loading };
};

export default useFetch;
