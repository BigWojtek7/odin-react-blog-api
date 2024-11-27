import { render, screen } from '@testing-library/react';
import CommentForm from './CommentForm';
import userEvent from '@testing-library/user-event';
import {
  mockedRequestWithNativeFetch,
  mockedUseAuth,
  mockedUseNotification,
  mockedUseParams,
} from '../../../tests/setup';

describe('CommentForm component', () => {
  const mockSetComments = vi.fn();
  const mockAddNotification = vi.fn();

  beforeEach(() => {
    mockedUseParams.mockReturnValue({ postid: '1' });
    mockedUseAuth.mockReturnValue({ ...mockedUseAuth(), token: 'mockToken' });
    mockedUseNotification.mockReturnValue({
      addNotification: mockAddNotification,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders form when user is authenticated', () => {
    render(<CommentForm setComments={mockSetComments} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('prompts login when user is unauthenticated', () => {
    mockedUseAuth.mockReturnValue({ ...mockedUseAuth(), token: null });
    render(<CommentForm setComments={mockSetComments} />);
    expect(
      screen.getByText('To add comment You must log in first!')
    ).toBeInTheDocument();
  });

  it('submits form and updates comments on success', async () => {
    mockedRequestWithNativeFetch.mockResolvedValue({
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
