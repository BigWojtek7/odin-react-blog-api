import { render, screen } from '@testing-library/react';
import Header from './Header';
import { beforeEach, describe } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

vi.mock('../../hooks/useAuth.js');

describe('testing Header component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { username: 'wojtek', is_admin: false },
      token: 'token',
      logOut: vi.fn(),
    });
  });

  it('renders Header component with token', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('wojtek')).toBeInTheDocument();
    // expect(screen.getByRole('Log out')).toBeInTheDocument();
    expect(screen.getByText('Daily Blog')).toBeInTheDocument();
  });

  it('renders Header component without token', () => {
    useAuth.mockReturnValue({
      user: { username: 'wojtek', is_admin: false },
      token: null,
      logOut: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Log-in')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Daily Blog')).toBeInTheDocument();
  });

  it('renders Header component without admin permission', () => {
    useAuth.mockReturnValue({
      user: { username: 'wojtek', is_admin: true },
      token: null,
      logOut: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('New Post')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Daily Blog')).toBeInTheDocument();
  });
});
