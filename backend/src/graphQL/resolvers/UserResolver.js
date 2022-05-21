const User = require ('../../models/User');

const userSchema = `
  type User {
    id: String
    email: String
    password: String
  }`;

async function getAllUsers(){
    let users = await User.findAll();
    return users;
}
async function getUser(email){
    let users = await User.findAll({
        where: {
            email: email,
        },
    });
    return users;
}

module.exports = {
    userSchema: userSchema,
    getAllUsers: getAllUsers,
    getUser: getUser,
};