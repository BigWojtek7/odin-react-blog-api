import { renderHook } from '@testing-library/react';
import useFetch from './useFetch';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';
import { waitFor } from '@testing-library/react';
import { afterEach } from 'vitest';

vi.mock('../utils/requestWithNativeFetch');
vi.mock('../contexts/Loader/useLoader', () => ({
  default: () => ({ start: vi.fn(), stop: vi.fn() }),
}));

afterEach(() => {
  vi.clearAllMocks();
})

describe('useFetch', () => {
  it('downloads data correctly', async () => {
    const mockData = { key: 'value' };
    requestWithNativeFetch.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitFor(() => result.current.fetchData !== null);  // Poczekaj na rzeczywiste dane
    expect(result.current.fetchData).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('handles errors correctly', async () => {
    const mockError = new Error('Fetch error');
    requestWithNativeFetch.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitFor(() => result.current.error !== null);  // Poczekaj na błąd
    expect(result.current.error).toEqual(mockError);
    expect(result.current.fetchData).toBeNull();
  });
});