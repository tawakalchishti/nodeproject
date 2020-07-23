const JOI = require("@hapi/joi");


const SignUpSchema = JOI.object().keys({
    firstname: JOI.string().min(3).max(30).required(),
    lastname:  JOI.string().min(3).max(30).required(),
    email: JOI.string().min(10).max(40).required().email(),
    password: JOI.string().min(8).max(16).required(),


})
const SignInSchema = JOI.object().keys({
    email: JOI.string().min(10).max(40).required().email(),
    password: JOI.string().min(8).max(16).required(),


})
module.exports = {
    SignUpSchema,
    SignInSchema,
}