import LoaderContext from './LoaderContext';

import { useContext } from 'react';

const useLoader = () => {
  const loaderContext = useContext(LoaderContext);

  if (!loaderContext) {
    throw new Error(
      'Please use useLoader inside the context of LoaderProvider'
    );
  }
  return {
    start: loaderContext.start,
    stop: loaderContext.stop,
  };
};

export default useLoader;
