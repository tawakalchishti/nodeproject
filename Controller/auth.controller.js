const MongoServicess = require('../Services/auth.servise');
const userSchema = require('../Schema/auth.schema');
const bcrypt = require ("bcryptjs")

module.exports.createUser = async (req, res) => {
    console.log("my data is ", req.body)
    const validation = userSchema.SignUpSchema.validate(req.body);
    if(validation.error){
        console.log(validation.error);
        return res.status(400).json({
            message:validation.error.details[0].message,
        });
    }
    try {
        const email = req.body.email
        console.log("email",email)
        const data = await MongoServicess.checkUser(email)
        console.log("data " , data)
        if(data)
        return res.status(401).json({
                message: "User has been allready register"
        })
        console.log("run")
        const newUser = new User(req.body)
        await MongoServicess.createUser(newUser)
        res.status(201).json({
            message: "Account is successfuly created and email has been sent."
        });
    }
    catch (error) {
        res.json(error)
    }

}

module.exports.signinUser = async(req,res)=>{
    console.log("my sign in request",req.body)
    const validation = userSchema.SignInSchema.validate(req.body);
    if(validation.error){
        console.log(validation.error);
        return res.status(400).json({
            message:validation.error.details[0].message,
        });
    }
    
    try{
        const {email,password}=req.body
        const user = await MongoServicess.checkUser(email)
        if(user){
            //password compare
            bcrypt.compare(password, user.password).then (isMatch =>{
                if(isMatch){
                    res.status(201).json({
                        message:"successfully login!"
                    })
                }
                else{
                    res.status(401).json({
                        message:"PAssword is not correct"
                    })
                }
            })
        }
        else{
            res.status(404).json({
                message:"User not register"
            })
        }     
    }
    catch(error){
        res.json(error)
    }
}