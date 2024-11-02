import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';
import useAuth from '../../contexts/Auth/useAuth';

// Mockowanie hooka useAuth
vi.mock('../../contexts/Auth/useAuth.js');

describe('SignUp component', () => {
  const mockSignUpAction = vi.fn();
  const mockSetFetchData = vi.fn();

  beforeEach(() => {
    // Resetowanie mocków przed każdym testem
    vi.clearAllMocks();

    useAuth.mockReturnValue({
      token: null,
      signUpAction: mockSignUpAction,
    });
  });

  it('renders form fields and submit button', () => {
    render(<SignUp />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Repeat Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it('displays validation errors if fields are empty on submit', async () => {
    render(<SignUp />);

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/password confirmation is required/i)
    ).toBeInTheDocument();
  });

  it('calls signUpAction with correct data when form is valid', async () => {
    mockSignUpAction.mockResolvedValue({ success: true });

    render(<SignUp />);

    await userEvent.type(screen.getByLabelText('Username'), 'testuser');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.type(
      screen.getByLabelText('Repeat Password'),
      'password123'
    );

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(mockSignUpAction).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
      re_password: 'password123',
    });
  });

  it('displays server error messages if sign up fails', async () => {
    const serverErrors = [{ msg: 'Username already exists' }];
    mockSignUpAction.mockResolvedValue({ success: false, msg: serverErrors });

    render(<SignUp />);

    await userEvent.type(screen.getByLabelText('Username'), 'testuser');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.type(
      screen.getByLabelText('Repeat Password'),
      'password123'
    );

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/username already exists/i)
    ).toBeInTheDocument();
  });

  it('displays "You are logged in" when token is present', () => {
    useAuth.mockReturnValue({
      token: 'mockToken',
      signUpAction: mockSignUpAction,
    });

    render(<SignUp />);

    expect(screen.getByText(/you are logged in/i)).toBeInTheDocument();
  });
});
