// Example GraphQL query
export const getExampleSchema = `
  query example(
    $id: ID!
  ) {
    exampleById(id: $id) {
      id
      name
    }
  }
`;
