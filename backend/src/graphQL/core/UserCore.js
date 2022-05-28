const { getAllUsers, getUser } = require('../resolvers/UserResolver');
const userSchema = `
  type User {
    id: String
    email: String
    password: String
  }
`;

const userQueries = `
    user(email: String): [User]
`;

const userRoot = {
    user: async ({email}) => {
        let res;
        if(email){
          res = await getUser(email);
        }
        else{
          res = await getAllUsers();
        }
        return res;
      },
};

module.exports = {
    userSchema: userSchema,
    userQueries: userQueries,
    // userMutations: userMutations,
    userRoot: userRoot,
};
