
const Router = require("express");
const userRouter = Router();

const { userModel, purchaseModel, courseModel } = require("../db");

const jwt = require('jsonwebtoken')
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

const bcrypt = require("bcrypt");
const z = require("zod");
const { userMiddleware } = require("../middlewares/user");

userRouter.post("/", async (req, res)=>{
    const { firstName, lastName , password, email } = req.body;

    const user = await userModel.findOne({email : email});
    if(!user){
        await userModel.create({
            firstName, 
            lastName, 
            password : await bcrypt.hash(password, 5),
            email
        })
        res.json({
            message : "Signed up successfully!"
        })
    }
    res.json("the email already exists")

})

userRouter.post("/signin", async (req, res)=>{
    const { email, password } = req.body;
    const user = await userModel.findOne({ email : email});
    if(user &&   bcrypt.compare(password, user.password)){
        const token = jwt.sign({userId : user._id}, JWT_USER_SECRET);
        res.json({
            message : "signed in successfully",
            token : token
        })
    }
    res.json("email doesn't exists in database")
})



userRouter.get("/purchases",userMiddleware, async (req, res)=>{
    const userId = req.userId;

    const user = await userModel.findOne({_id : userId});
    console.log(user)
    if(user){
        const purchases = await purchaseModel.find({userId : user._id})
        res.json({
            purchases : purchases
        })
    }
    res.json({
        message : "no purchases"
    })
})



module.exports = {
    userRouter : userRouter
}