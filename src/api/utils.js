export const postGQL = (query, variables) => {
  if (!query) throw new Error('Graphql request requires a query');

  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
};
