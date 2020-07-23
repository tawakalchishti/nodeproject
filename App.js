const express = require("express");
const mongoose = require("mongoose");
const bodyparser =require("body-parser");
require("dotenv").config();
const user = require("./Router/auth.router");

mongoose.connect(process.env.MONGODB_CONNECTION,{
    useNewParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("DB Connected"))
.catch((error)=> {
    console.log("error connection",error.message)

})

const app = express();


app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
//app.post('/',( req , res) => console.log("my",req.body));

app.use('/user',user);

const PORT = process.env.PORT|| 3002

app.listen(PORT , ()=>{
    console.log(`server start on: ${PORT}`)
})

