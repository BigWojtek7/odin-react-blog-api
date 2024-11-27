import { render } from '@testing-library/react';
import Loader from './Loader';

import LoaderContext from '../../contexts/Loader/LoaderContext';

describe('Loader component tests', () => {
  const loaderContextValue = {
    isLoading: true,
    loaderText: 'Loading...',
    start: () => {},
    stop: () => {},
  };

  it('renders Loader component with default context', () => {
    const { container } = render(
      <LoaderContext.Provider value={loaderContextValue}>
        <Loader />
      </LoaderContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('displays loading text when isLoading is true', () => {
    const { getByText } = render(
      <LoaderContext.Provider value={loaderContextValue}>
        <Loader />
      </LoaderContext.Provider>
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
