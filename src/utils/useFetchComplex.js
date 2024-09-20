  
  
  // unused hook because of too much complexity

import { useState, useEffect, useCallback } from 'react';

const useFetchComplex = (url, options, { manual = false } = {}) => {


  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // UseCallback for fetchRequest
  const fetchRequest = useCallback(
    async (overrideUrl, overrideOptions) => {
      setLoading(true);

      const controller = new AbortController();
      const { signal } = controller;

      try {
        const response = await fetch(overrideUrl || url, {
          ...options,
          ...overrideOptions,
          signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        const responseJSON = await response.json();
        setFetchData(responseJSON);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }

      return controller;
    },
    [url, options]
  );

  useEffect(() => {
    if (!manual) {
      const initiateRequest = async () => {
        const controller = await fetchRequest();
        return controller;
      };

      const controllerPromise = initiateRequest();

      return () => {
        controllerPromise.then((controller) => {
          if (controller) {
            controller.abort();
          }
        });
      };
    }
  }, [fetchRequest, url, options, manual]);

  return { fetchData, error, loading, fetchRequest };
};

export default useFetchComplex;
