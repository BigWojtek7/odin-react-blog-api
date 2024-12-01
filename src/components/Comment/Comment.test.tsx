import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comment from './Comment';
import { MemoryRouter } from 'react-router-dom';

import {
  mockedUseAuth,
  mockedUseModal,
  mockedCheckPermissions,
} from '../../../tests/setup';

const mockSetComments = vi.fn();

describe('Comment component tests', () => {
  const commentProps = {
    commentId: 1,
    author: 'Author',
    content: 'This is a comment',
    formattedDate: '2024-10-29',
    date: '2024-10-29',
    setComments: mockSetComments,
  };

  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      user: { username: 'wojtek', is_admin: false },
      token: 'token',
      logOut: vi.fn(),
    });
    mockedCheckPermissions.mockReturnValue({ isAdmin: false });
  });

  it('renders Comment component', () => {
    render(
      <MemoryRouter>
        <Comment {...commentProps} />
      </MemoryRouter>
    );

    expect(screen.getByText(commentProps.author)).toBeInTheDocument();
    expect(screen.getByText(commentProps.content)).toBeInTheDocument();
    expect(screen.getByText(commentProps.date)).toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('renders Delete button for admin', () => {
    mockedUseAuth.mockReturnValueOnce({
      ...mockedUseAuth(),
      user: { username: 'admin', is_admin: true },
      token: 'token',
      logOut: vi.fn(),
    });
    mockedCheckPermissions.mockReturnValueOnce({ isAdmin: true });

    render(
      <MemoryRouter>
        <Comment {...commentProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls handleDeleteComment when Delete button is clicked', async () => {
    // Mock the necessary functions
    const mockOpenModal = vi.fn();

    const user = userEvent.setup();
    mockedUseModal.mockReturnValueOnce({
      openModal: mockOpenModal,
      closeModal: vi.fn(),
      modalData: null,
    });
    mockedCheckPermissions.mockReturnValueOnce({ isAdmin: true });

    render(
      <MemoryRouter>
        <Comment {...commentProps} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    await user.click(button);
    expect(mockOpenModal).toHaveBeenCalled();
  });
});
