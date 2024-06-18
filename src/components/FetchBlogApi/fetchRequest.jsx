async function fetchRequest(url) {
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error('There was an error', err);
  }
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
}

export default fetchRequest;
