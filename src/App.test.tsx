describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

import { render } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  vi.unmock('../src/contexts/Auth/useAuth');
  vi.unmock('../src/hooks/useFetch');
});

describe('App', () => {
  it('renders whole app', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
