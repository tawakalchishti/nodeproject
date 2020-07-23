const User = require('../models/auth.models');

const checkUser = (email) => {
    console.log("email service " , email)
    return User.findOne({ email })
}
const createUser = (newUser) => {
console.log("service" , newUser)
    return newUser.save()
}


const UserServices = {
    createUser,
    checkUser
}

module.exports = UserServices;