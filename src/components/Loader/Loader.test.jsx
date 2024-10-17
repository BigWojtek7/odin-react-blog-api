import { render } from '@testing-library/react';
import Loader from './Loader';

import LoaderContext from '../../contexts/LoaderContext';

it('renders Loader component', () => {
  const { container } = render(
    <LoaderContext.Provider value={{}}>
      <Loader />
    </LoaderContext.Provider>
  );

  expect(container).toMatchSnapshot();
});
