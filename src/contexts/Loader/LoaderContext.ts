import { createContext } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  loaderText: string;
  start: (loaderText?: string) => void;
  stop: () => void;
}

const LoaderContext = createContext<LoaderContextType | null>(null);

export default LoaderContext;
