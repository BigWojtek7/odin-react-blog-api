import { render, screen, act } from '@testing-library/react';
import { mockedUseLoader } from '../../../tests/setup';
import Loader from './Loader';

describe('Loader component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders the loader with the text from loaderText when isLoading is true', () => {
    mockedUseLoader.mockReturnValueOnce({
      ...mockedUseLoader(),
      isLoading: true,
    });

    render(<Loader />);

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('does not render when isLoading is false', () => {
    render(<Loader />);
    expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
  });

  it('shows delay message after 3 seconds when loading', () => {
    mockedUseLoader.mockReturnValue({
      ...mockedUseLoader(),
      isLoading: true,
    });

    render(<Loader />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByText(/loading may take longer when server wakes up/i)
    ).toBeInTheDocument();
  });

  it('does not show delay message immediately', () => {
    mockedUseLoader.mockReturnValueOnce({
      ...mockedUseLoader(),
      isLoading: true,
    });

    render(<Loader />);

    expect(
      screen.queryByText(/loading may take longer when server wakes up/i)
    ).not.toBeInTheDocument();
  });
});
