// Get realm by realm name
export const getRealmByNameSchema = `
  query realmByName($name: String!) {
    realmByName(name: $name) {
      id
      name
      title
    }
  }
`;

// Get session by session id
export const getSessionByIdSchema = `
  query sessionById($id: ID!) {
    sessionById(id: $id) {
      id
      realmId
      name
      time
      playerSessions {
        player {
          id
          name
        }
        buyin
        walkout
      }
    }
  }
`;

// Get all sessions in realm by realm id
export const getSessionsByRealmIdSchema = `
  query sessionsByRealmId($realmId: ID!) {
    sessionsByRealmId(realmId: $realmId) {
      id
      realmId
      name
      time
    }
  }
`;

// Get player by player id
export const getPlayerByIdSchema = `
  query playerById($id: ID!) {
    playerById(id: $id) {
      id
      name
      realmId
    }
  }
`;
