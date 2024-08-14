async function asyncFetch(url, options) {
  const response = await fetch(url, options);
  return await response.json();
}

export { asyncFetch };
