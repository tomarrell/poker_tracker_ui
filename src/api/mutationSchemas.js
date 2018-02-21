// Example GraphQL mutation
export const putExampleSchema = `
  mutation putExample(
    $id: ID!,
  ) {
    putExample(
      id: $id,
    ) {
      id
      name
    }
  }
`;
