import requestWithNativeFetch from './requestWithNativeFetch';

const mockedFetch = vi.fn();
global.fetch = mockedFetch;

describe('requestWithNativeFetch', () => {
  beforeEach(() => {
    vi.unmock('./requestWithNativeFetch');
  });

  it('returns response data on successful request', async () => {
    const mockData = { success: true, data: { key: 'value' } };
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await requestWithNativeFetch('/test-url');
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('/test-url', undefined);
  });

  it('returns error message and status on failed request', async () => {
    const mockErrorData = { msg: 'Invalid request' };
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => mockErrorData,
    });

    const result = await requestWithNativeFetch('/test-url');
    expect(result).toEqual({
      success: false,
      status: 400,
      msg: 'Invalid request',
    });
  });

  it('returns default error message if response lacks error details', async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    const result = await requestWithNativeFetch('/test-url');
    expect(result).toEqual({
      success: false,
      status: 404,
      msg: 'Something went wrong',
    });
  });

  it('handles network error gracefully', async () => {
    const errorMessage = 'Failed to fetch';
    mockedFetch.mockRejectedValueOnce(new Error(errorMessage));

    const result = await requestWithNativeFetch('/test-url');
    expect(result).toEqual({
      success: false,
      status: 500,
      msg: errorMessage,
    });
  });
});
