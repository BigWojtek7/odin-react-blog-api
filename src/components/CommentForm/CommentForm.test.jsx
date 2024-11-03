import { render, screen } from '@testing-library/react';
import CommentForm from './CommentForm';
import useAuth from '../../contexts/Auth/useAuth';
import useNotification from '../../contexts/Notification/useNotification';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import { useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

vi.mock('../../contexts/Auth/useAuth.js');
vi.mock('../../contexts/Notification/useNotification.js');
vi.mock('../../utils/requestWithNativeFetch');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useParams: vi.fn(),
}));

describe('CommentForm component', () => {
  const mockSetComments = vi.fn();
  const mockAddNotification = vi.fn();

  beforeEach(() => {
    useParams.mockReturnValue({ postid: '1' });
    useAuth.mockReturnValue({ token: 'mockToken' });
    useNotification.mockReturnValue({ addNotification: mockAddNotification });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders form when user is authenticated', () => {
    render(<CommentForm setComments={mockSetComments} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('prompts login when user is unauthenticated', () => {
    useAuth.mockReturnValue({ token: null });
    render(<CommentForm setComments={mockSetComments} />);
    expect(
      screen.getByText('To add comment You must log in first!')
    ).toBeInTheDocument();
  });

  it('submits form and updates comments on success', async () => {
    requestWithNativeFetch.mockResolvedValue({
      success: true,
      data: {
        id: 1,
        content: 'Test comment',
        username: 'User1',
        date_format: '2024-10-29',
      },
    });

    render(<CommentForm setComments={mockSetComments} />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Content'), 'Test comment');
    await user.click(screen.getByText('Submit'));

    expect(mockAddNotification).toHaveBeenCalledWith(
      'the comment has been created',
      'success'
    );

    expect(mockSetComments).toHaveBeenCalled();
  });
});
