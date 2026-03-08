const Router = require("express");
const courseRouter = Router();

const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");

    courseRouter.post("/purchase",userMiddleware, async (req, res)=>{
        const userId = req.userId;
        const courseId = req.body.courseId;
        const course = await courseModel.findOne({_id : courseId});
        const already = await purchaseModel.findOne({courseId : course._id})
        console.log(already);
        if(course && (!already)){
        await purchaseModel.create({
                userId : userId,
                courseId : course._id
            })
            res.json({
                message : "purchase made"
            })
        }
    res.json({
        message : "Course not available for purchase"
    })
    })

    courseRouter.get("/preview", async (req, res)=>{
        const courses = await courseModel.find({});
        res.json({
            courses : courses
        })
    })


module.exports = {
    courseRouter : courseRouter
} 


