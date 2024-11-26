import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { mockedUseAuth } from '../../../tests/setup';

describe('Login Component', () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      token: null,
      loginAction: vi.fn().mockResolvedValue({ msg: 'Login successful!' }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login form when there is no token', () => {
    render(<Login />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows errors on submit if fields are empty', async () => {
    render(<Login />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('calls loginAction on form submit with valid data', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ msg: 'Login successful!' });
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      token: null,
      loginAction: mockLogin,
    });

    render(<Login />);

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });

  it('displays logged-in message when there is a token', () => {
    mockedUseAuth.mockReturnValue({
      ...mockedUseAuth(),
      token: 'sampleToken',
      loginAction: vi.fn(),
    });

    render(<Login />);

    expect(screen.getByText(/you are logged in/i)).toBeInTheDocument();
  });
});
