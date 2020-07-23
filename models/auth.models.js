const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const UserSchema = new mongoose.Schema({
    firstname: {

        type:String,
        required:true
    },
    lastname: {

        type:String,
        required:true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true,
    }

})
UserSchema.pre('save',async function (next) {
    try{

        console.log("password is : ",this.password)
        const salt = await bcrypt.genSalt(10);
        console.log("salt is :",salt)
        const hash = await bcrypt.hash(this.password,salt)
        console.log("hash is :",hash)
        this.password = hash
        next();
    }
    catch{

    }

})

module.exports = User = mongoose.model("user",UserSchema );