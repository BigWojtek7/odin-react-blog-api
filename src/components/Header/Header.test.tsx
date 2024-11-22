import { render, screen } from '@testing-library/react';
import Header from './Header';
import { beforeEach, describe } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import useAuth from '../../contexts/Auth/useAuth';
import checkPermissions from '../../utils/checkPermissions';
import userEvent from '@testing-library/user-event';

vi.mock('../../contexts/Auth/useAuth.js');
vi.mock('../../utils/checkPermissions.js');

const logOut = vi.fn();

describe('testing Header component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { username: 'wojtek', is_admin: false },
      token: 'token',
      logOut: logOut,
    });
    checkPermissions.mockReturnValue({ isAdmin: false });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

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
    useAuth.mockReturnValue({
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
    useAuth.mockReturnValue({
      user: { username: 'wojtek', is_admin: true },
      token: 'token',
      logOut: vi.fn(),
    });
    checkPermissions.mockReturnValue({ isAdmin: true });

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
    useAuth.mockReturnValue({
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
