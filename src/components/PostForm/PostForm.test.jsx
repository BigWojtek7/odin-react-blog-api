import { render, screen } from '@testing-library/react';
import PostForm from './PostForm';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import userEvent from '@testing-library/user-event';

vi.mock('../../hooks/useAuth');
vi.mock('../../hooks/useNotification');
vi.mock('../../utils/requestWithNativeFetch');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('PostForm component', () => {
  const mockAddNotification = vi.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ token: 'mockToken' });
    useNotification.mockReturnValue({ addNotification: mockAddNotification });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders form', () => {
    render(<PostForm />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('submits form and updates comments on success', async () => {
    requestWithNativeFetch.mockResolvedValue({
      success: true,
      data: {
        id: 1,
        content: 'Test post',
        username: 'User1',
        date_format: '2024-10-29',
      },
    });

    render(<PostForm />);

    await userEvent.type(screen.getByLabelText('Title'), 'Test title');

    await userEvent.type(screen.getByLabelText('Content'), 'Test comment');
    await userEvent.click(screen.getByText('Submit'));

    expect(mockAddNotification).toHaveBeenCalledWith(
      'The post has been created',
      'success'
    );
  });
});
