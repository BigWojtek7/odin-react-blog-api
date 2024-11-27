import { render, screen } from '@testing-library/react';
import Header from './Header';
import { describe } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { mockedUseAuth, mockedCheckPermissions } from '../../../tests/setup';

const logOut = vi.fn();

describe('testing Header component', () => {
  mockedUseAuth.mockReturnValueOnce({
    ...mockedUseAuth(),
    user: { username: 'wojtek', is_admin: false },
    token: 'token',
    logOut: logOut,
  });

  // afterEach(() => {
  //   vi.clearAllMocks();
  // });

  it('renders Header component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText('New Post')).not.toBeInTheDocument();
    expect(screen.getByText('wojtek')).toBeInTheDocument();
    expect(screen.getByText('Daily Blog')).toBeInTheDocument();
    expect(screen.getByLabelText('Log out')).toBeInTheDocument();
  });

  it('renders Header component without token', () => {
    mockedUseAuth.mockReturnValueOnce({
      ...mockedUseAuth(),
      user: { username: 'wojtek', is_admin: false },
      token: null,
      logOut: logOut,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText('wojtek')).not.toBeInTheDocument();

    expect(screen.getByText('Log-in')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Daily Blog')).toBeInTheDocument();
  });

  it('renders Header component with admin permission', () => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      user: { username: 'wojtek', is_admin: true },
      token: 'token',
      logOut: vi.fn(),
    });
    mockedCheckPermissions.mockReturnValue({ isAdmin: true });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('New Post')).toBeInTheDocument();
    expect(screen.getByText('wojtek')).toBeInTheDocument();
    expect(screen.getByText('Daily Blog')).toBeInTheDocument();
  });

  it('calls logout on log out button click', async () => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      user: { username: 'wojtek', is_admin: true },
      token: 'token',
      logOut: logOut,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByLabelText('Log out'));

    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
