import { getRealmByNameSchema } from "../../api/querySchemas";
import { createRealmSchema } from "../../api/mutationSchemas";
import { postGQL } from "../../api/utils";

export const createRealm = (name, title) => {
  if (!name) throw new Error("Name must be present to create Realm");

  return postGQL(createRealmSchema, {
    name,
    title
  });
};

// TODO
export const loginRealm = name => {
  if (!name) throw new Error("Name must be present to login to Realm");

  return postGQL(getRealmByNameSchema, {
    name
  });
};
