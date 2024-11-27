import Input from './Input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Input component', () => {
  it('should update the input value when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const value = '';

    render(
      <Input
        name="testInput"
        label="Test Input"
        value={value}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(/Test Input/i);
    await user.type(input, 'React');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('should display error message when error prop is provided', () => {
    render(
      <Input
        name="testInput"
        label="Test Input"
        value=""
        onChange={() => {}}
        error="This field is required"
      />
    );

    // Sprawdzamy, czy komunikat o błędzie jest widoczny
    const errorMessage = screen.getByText(/This field is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not display error message when no error prop is provided', () => {
    render(
      <Input name="testInput" label="Test Input" value="" onChange={() => {}} />
    );

    // Sprawdzamy, czy komunikat o błędzie nie jest widoczny
    const errorMessage = screen.queryByText(/This field is required/i);
    expect(errorMessage).toBeNull();
  });

  it('should set the input type correctly', () => {
    render(
      <Input
        name="testInput"
        label="Test Input"
        value=""
        onChange={() => {}}
        type="email"
      />
    );

    const input = screen.getByLabelText(/Test Input/i);
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should use default type as text when type is not provided', () => {
    render(
      <Input name="testInput" label="Test Input" value="" onChange={() => {}} />
    );

    const input = screen.getByLabelText(/Test Input/i);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should set the autocomplete attribute correctly', () => {
    render(
      <Input
        name="testInput"
        label="Test Input"
        value=""
        onChange={() => {}}
        autocomplete="on"
      />
    );

    const input = screen.getByLabelText(/Test Input/i);
    expect(input).toHaveAttribute('autocomplete', 'on');
  });
});
