import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import NewPost from './NewPost';
import { MemoryRouter } from 'react-router-dom';

import { mockedCheckPermissions, mockedUseAuth } from '../../../tests/setup';

describe('NewPost component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders PostForm when user is an admin', () => {
    mockedUseAuth.mockReturnValueOnce({
      ...mockedUseAuth(),
      user: { username: 'adminUser', is_admin: false },
    });
    mockedCheckPermissions.mockReturnValue({ isAdmin: true });

    render(
      <MemoryRouter>
        <NewPost />
      </MemoryRouter>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders message when user is not an admin', () => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      user: { username: 'regularUser', is_admin: false },
    });
    mockedCheckPermissions.mockReturnValue({ isAdmin: false });

    render(
      <MemoryRouter>
        <NewPost />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/to add post you must log in & be an admin/i)
    ).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('renders message when user is not logged in', () => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      user: { username: null, is_admin: false },
    });
    mockedCheckPermissions.mockReturnValue({ isAdmin: false });

    render(
      <MemoryRouter>
        <NewPost />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/to add post you must log in & be an admin/i)
    ).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });
});
