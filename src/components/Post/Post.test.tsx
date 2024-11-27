import { render, screen } from '@testing-library/react';
import Post from './Post';

import { MemoryRouter } from 'react-router-dom';

import { mockedCheckPermissions, mockedUseAuth } from '../../../tests/setup';

describe('Post component test', () => {
  const post = {
    id: 1,
    username: 'user',
    title: 'Main title',
    content: 'Some example content',
    date_format: '13-10-2024 19:00',
  };

  beforeEach(() => {
    mockedUseAuth.mockReset();
  });

  it('renders Post component in preview mode & user is no admin', () => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      user: { username: 'wojtek', is_admin: false },
    });
    mockedCheckPermissions.mockReturnValue({ isAdmin: false });
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
    mockedUseAuth.mockReturnValue({...mockedUseAuth(), user: { username: 'wojtek', is_admin: true } });
    mockedCheckPermissions.mockReturnValue({ isAdmin: true });
    render(
      <MemoryRouter>
        <Post post={post} isPreview={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders Post component without preview mode', () => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      user: { username: 'wojtek', is_admin: false },
    });
    mockedCheckPermissions.mockReturnValue({ isAdmin: false });
    render(
      <MemoryRouter>
        <Post post={post} isPreview={false} />
      </MemoryRouter>
    );

    expect(screen.queryByText('More')).not.toBeInTheDocument();
    expect(screen.getByText('Some example content')).toBeInTheDocument();
  });
});
