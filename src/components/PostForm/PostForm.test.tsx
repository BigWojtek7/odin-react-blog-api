import { render, screen } from '@testing-library/react';
import PostForm from './PostForm';
import userEvent from '@testing-library/user-event';
import {
  mockedRequestWithNativeFetch,
  mockedUseAuth,
  mockedUseNotification,
} from '../../../tests/setup';

describe('PostForm component', () => {
  const mockAddNotification = vi.fn();

  beforeEach(() => {
    mockedUseAuth.mockReturnValue({ ...mockedUseAuth(), token: 'mockToken' });
    mockedUseNotification.mockReturnValue({
      addNotification: mockAddNotification,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders form', () => {
    render(<PostForm />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('submits form and updates post on success', async () => {
    mockedRequestWithNativeFetch.mockResolvedValue({
      success: true,
      msg: [{ msg: 'Post has been saved' }],
    });

    render(<PostForm />);

    await userEvent.type(screen.getByLabelText('Title'), 'Test title');
    await userEvent.type(screen.getByLabelText('Content'), 'Test content');
    await userEvent.click(screen.getByText('Submit'));

    expect(mockAddNotification).toHaveBeenCalledWith(
      'The post has been created',
      'success'
    );
  });
});
