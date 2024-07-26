import { useEffect, useState } from 'react';

export function useFetch(url, method, headers, data) {
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchForData = async () => {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
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
    return () => {
      controller.abort();
    };
  }, [url, method, headers, data]);

  return { fetchData, error, loading };
}
