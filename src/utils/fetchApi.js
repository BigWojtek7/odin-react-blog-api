const requestWithNativeFetch = async (url, options) => {
  const response = await fetch(url, options);
  const responseData = await response.json();
  console.log(responseData);
  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      msg: responseData.msg || 'Something went wrong',
    };
  }
  return responseData;
};

export default requestWithNativeFetch;
