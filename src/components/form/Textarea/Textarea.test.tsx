import Textarea from './Textarea';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Textarea component', () => {
  it('should update the input value when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const value = '';

    render(
      <Textarea
        name="testTextarea"
        label="Test Textarea"
        value={value}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(/Test Textarea/i);
    await user.type(input, 'React');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('should display error message when error prop is provided', () => {
    render(
      <Textarea
        name="testTextarea"
        label="Test Textarea"
        value=""
        onChange={() => {}}
        error="This field is required"
      />
    );

    const errorMessage = screen.getByText(/This field is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not display error message when no error prop is provided', () => {
    render(
      <Textarea
        name="testTextarea"
        label="Test Textarea"
        value=""
        onChange={() => {}}
      />
    );

    const errorMessage = screen.queryByText(/This field is required/i);
    expect(errorMessage).toBeNull();
  });
});
