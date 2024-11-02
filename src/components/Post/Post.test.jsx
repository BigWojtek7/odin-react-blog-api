import { render, screen } from '@testing-library/react';
import Post from './Post';

import { MemoryRouter } from 'react-router-dom';

import useAuth from '../../contexts/Auth/useAuth';
import checkPermissions from '../../utils/checkPermissions';

vi.mock('../../contexts/Auth/useAuth.js');
vi.mock('../../utils/checkPermissions.js');

describe('Post component test', () => {
  const post = {
    id: 1,
    username: 'user',
    title: 'Main title',
    content: 'Some example content',
    date_format: '13-10-2024 19:00',
  };

  beforeEach(() => {
    useAuth.mockReset();
  });

  it('renders Post component in preview mode & user is no admin', () => {
    useAuth.mockReturnValue({ user: { name: 'wojtek', is_admin: false } });
    checkPermissions.mockReturnValue({ isAdmin: false });
    render(
      <MemoryRouter>
        <Post post={post} isPreview={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('More')).toBeInTheDocument();
    expect(screen.getByText('Some example content...')).toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('renders Post component in preview mode & user is admin', () => {
    useAuth.mockReturnValue({ user: { name: 'wojtek', is_admin: true } });
    checkPermissions.mockReturnValue({ isAdmin: true });
    render(
      <MemoryRouter>
        <Post post={post} isPreview={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders Post component without preview mode', () => {
    useAuth.mockReturnValue({ user: { name: 'wojtek', is_admin: false } });
    checkPermissions.mockReturnValue({ isAdmin: false });
    render(
      <MemoryRouter>
        <Post post={post} isPreview={false} />
      </MemoryRouter>
    );

    expect(screen.queryByText('More')).not.toBeInTheDocument();
    expect(screen.getByText('Some example content')).toBeInTheDocument();
  });
});
