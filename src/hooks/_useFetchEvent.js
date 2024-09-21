
  // unused hook because of too much complexity
  
import { useState } from 'react';

const useFetchEvent = () => {
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequest = async (url, options) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const responseJSON = await response.json();

      setFetchData(responseJSON);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, error, loading, fetchRequest };
};

export default useFetchEvent;
