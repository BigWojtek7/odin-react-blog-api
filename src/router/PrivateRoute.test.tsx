import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import { mockedUseAuth } from '../../tests/setup';
// vi.mock('../contexts/Auth/useAuth.ts');

// Mock komponentu Outlet
const MockOutlet = () => <div>Private Content</div>;

describe('PrivateRoute', () => {
  it('renders Outlet when user is authenticated', () => {
    mockedUseAuth.mockReturnValueOnce({
      ...mockedUseAuth(),
      token: 'fakeToken',
    });

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/" element={<div>Public Home</div>} />
          <Route element={<PrivateRoute />}>
            <Route path="/private" element={<MockOutlet />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('redirects to home page when user is not authenticated', () => {
    mockedUseAuth.mockReturnValueOnce({ ...mockedUseAuth(), token: null });

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/" element={<div>Public Home</div>} />
          <Route element={<PrivateRoute />}>
            <Route path="/private" element={<MockOutlet />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Public Home')).toBeInTheDocument();
  });
});
