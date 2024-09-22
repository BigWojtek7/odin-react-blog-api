import { createContext, useEffect, useState } from 'react';

const LoaderContext = createContext({});

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');
  const [loaderStack, setLoaderStack] = useState();

  const start = (loaderText = 'Loader...') => {
    setLoaderText(loaderText);
    setLoaderStack((prevStack) => [...prevStack, true]);
  };

  const stop = () => {
    setLoaderStack((prevStack) => prevStack.slice(1));
  };

  useEffect(() => {
    if (!loaderStack.length) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
  }, [loaderStack]);

  return (
    <LoaderContext.Provider value={{ isLoading, loaderText, start, stop }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
export { LoaderContext };
