const User = require ('../../models/User');



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
    getAllUsers: getAllUsers,
    getUser: getUser,
};