async function asyncFetch(url, options) {
  console.log(url);
  const response = await fetch(url, options);
  return await response.json();
}

export { asyncFetch };
