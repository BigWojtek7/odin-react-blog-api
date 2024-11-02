import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comment from './Comment';
import { MemoryRouter } from 'react-router-dom';
import useAuth from '../../contexts/Auth/useAuth';
import useModal from '../../contexts/Modal/useModal';
import checkPermissions from '../../utils/checkPermissions';
import useNotification from '../../contexts/Notification/useNotification';

vi.mock('../../contexts/Auth/useAuth.js');
vi.mock('../../contexts/Modal/useModal.js');
vi.mock('../../utils/checkPermissions');
vi.mock('../../contexts/Notification/useNotification.js');

const mockSetComments = vi.fn();

describe('Comment component tests', () => {
  const commentProps = {
    commentId: 1,
    author: 'Author',
    content: 'This is a comment',
    date: '2024-10-29',
    setComments: mockSetComments,
  };

  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { name: 'wojtek', is_admin: false },
      token: 'token',
    });
    useModal.mockReturnValue({ openModal: vi.fn(), closeModal: vi.fn() });
    checkPermissions.mockReturnValue({ isAdmin: false });
    useNotification.mockReturnValue({ addNotification: vi.fn() });
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
    useAuth.mockReturnValue({
      user: { name: 'admin', is_admin: true },
      token: 'token',
    });
    checkPermissions.mockReturnValue({ isAdmin: true });

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
    useModal.mockReturnValue({ openModal: mockOpenModal, closeModal: vi.fn() });
    checkPermissions.mockReturnValue({ isAdmin: true });

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
