/**
 * Returns true if the passed query exists in the url search parameters.
 *
 * @param query The query string to be checked
 */
export const getFromSearchParams = (query: string): boolean => {
  const searchParams = new URLSearchParams(window.location.search);
  const fullQuery = searchParams.get(query);
  const acceptedQueryValues = ["", "true"]; // `/?query` || `/?query=true`
  const isInParams =
    fullQuery !== null ? acceptedQueryValues.includes(fullQuery) : false;

  return isInParams;
};
