export const postGQL = async (query, variables) => {
  if (!query) throw new Error("Graphql request requires a query");

  const res = await fetch("https://poker-tracker-api.herokuapp.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  return res.json();
};
