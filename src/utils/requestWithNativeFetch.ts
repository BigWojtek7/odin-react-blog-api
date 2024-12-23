const requestWithNativeFetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        status: response.status,
        msg: errorData?.msg || 'Something went wrong',
      };
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return {
      success: false,
      status: 500,
      msg: err instanceof Error ? err.message : 'network error',
    };
  }
};

export default requestWithNativeFetch;
