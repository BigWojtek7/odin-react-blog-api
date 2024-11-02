import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import NewPost from './NewPost';
import useAuth from '../../contexts/Auth/useAuth';
import checkPermissions from '../../utils/checkPermissions';
import { MemoryRouter } from 'react-router-dom';

import NotificationProvider from '../../contexts/Notification/NotificationProvider';

vi.mock('../../contexts/Auth/useAuth.js');
vi.mock('../../utils/checkPermissions');

describe('NewPost component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders PostForm when user is an admin', () => {
    useAuth.mockReturnValue({ user: { username: 'adminUser' } });
    checkPermissions.mockReturnValue({ isAdmin: true });

    render(
      <NotificationProvider>
        <MemoryRouter>
          <NewPost />
        </MemoryRouter>
      </NotificationProvider>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders message when user is not an admin', () => {
    useAuth.mockReturnValue({ user: { username: 'regularUser' } });
    checkPermissions.mockReturnValue({ isAdmin: false });

    render(
      <NotificationProvider>
        <MemoryRouter>
          <NewPost />
        </MemoryRouter>
      </NotificationProvider>
    );

    expect(
      screen.getByText(/to add post you must log in & be an admin/i)
    ).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('renders message when user is not logged in', () => {
    useAuth.mockReturnValue({ user: null });
    checkPermissions.mockReturnValue({ isAdmin: false });

    render(
      <NotificationProvider>
        <MemoryRouter>
          <NewPost />
        </MemoryRouter>
      </NotificationProvider>
    );

    expect(
      screen.getByText(/to add post you must log in & be an admin/i)
    ).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });
});
