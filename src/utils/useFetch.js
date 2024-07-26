import { useEffect, useState } from 'react';

const useFetch = (url, method, headers, data = undefined) => {
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('1')
  
  useEffect(() => {
    console.log(url)
    const fetchForData = async () => {
      try {
        const response = await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(data),
        });
        const responseJSON = await response.json();
        setFetchData(responseJSON);
        console.log(responseJSON)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchForData();
  }, [url, method, headers, data]);

  return { fetchData, error, loading };
};

export default useFetch;
