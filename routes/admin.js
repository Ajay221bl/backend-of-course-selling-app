const  Router = require("express");
const adminRouter = Router()

const {adminModel} = require("../db");
const {courseModel} = require("../db")
const { adminMiddleware } = require("../middlewares/admin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const course = require("./course");

// admin signup
adminRouter.post("/", async (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const user = await adminModel.findOne({email : email});
    
    if(!user){
        await adminModel.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : await bcrypt.hash(password, 5)
        })
        res.json({
            message : "signed up successfully!"
        })
    }
    res.json({
        message : "the email already exists!"
})

})

adminRouter.post("/signin", async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    const admin = await adminModel.findOne({
        email : email
    })

    if(admin && bcrypt.compare(password, admin.password)){
        const token = jwt.sign({adminId : admin._id}, JWT_ADMIN_SECRET);
        res.send({
            message : "you are signed in",
            token : token
        })

    }
    res.send("invalid credentials!")

})


adminRouter.post("/course", adminMiddleware, async(req, res)=>{
    const adminId = req.adminId;

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const admin = await adminModel.findOne({_id : adminId});

    const course = await courseModel.findOne({title : title})
    if(!course){
        await courseModel.create({
            title : title,
            description : description,
            price : price, 
            imgUrl : "google.com",
            creatorId : admin._id
        })
        res.json({
            message : "course added !"
        })
    }else if(course){
    res.json({
        message : "course already exists"
    });
        }
})

adminRouter.put("/course",adminMiddleware,  async (req, res)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const course = await courseModel.findOne({title : title});
    console.log(course);
    if(course){
        await course.updateOne({
            price : price,
            title : title,
            description : description});
        
        res.json({
            messsage : "course info updated"
        })
    }
    res.json({
        message : "course not found"
    })


})
adminRouter.get("/course/bulk", adminMiddleware,  async (req, res)=>{
    const adminId = req.adminId;

    const admin = await adminModel.findOne({_id : adminId});
    console.log(admin)

    if(admin){
        creatorId = admin._id;
        const courses = await courseModel.find({creatorId : creatorId})

        res.json({
            courses : courses
        })
    }
    res.json({
        message : "nothing here"
    })

})



module.exports = {
    adminRouter : adminRouter
}

