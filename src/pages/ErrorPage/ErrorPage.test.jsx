import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('renders error message and link to home page', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Oh no, this route doesn't exist!")
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /go back to the home page/i })
    ).toHaveAttribute('href', '/');
  });
});
