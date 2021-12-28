/**
 * Returns true if the passed query exists in the url search parameters.
 *
 * @param query The query string to be checked
 */
export const getFromSearchParams = (query: string): boolean | string | number => {
  const searchParams = new URLSearchParams(window.location.search);
  const queryValue = searchParams.get(query);

  if (queryValue === null || queryValue === "false") {
    return false;
  } else if (queryValue === "" || queryValue === "true") {
    return true; // matches /?query || /?query=true
  } else if (!isNaN(Number(queryValue))) {
    return Number(queryValue);
  }

  return queryValue;
};
