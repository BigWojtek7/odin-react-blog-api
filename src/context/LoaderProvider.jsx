import { createContext, useState } from 'react';

const LoaderContext = createContext({});

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');

  const start = (loaderText = 'Loader...') => {
    setLoaderText(loaderText);
    setIsLoading(true);
  };

  const stop = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, loaderText, start, stop }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
export { LoaderContext };
