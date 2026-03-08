const Router = require("express");
const courseRouter = Router();

const courseModel = require("../db");

    courseRouter.post("/purchase", (req, res)=>{
        res.json({
            message : "signed up"
        })
    })

    courseRouter.get("/preview", (req, res)=>{
        res.json
    })


module.exports = {
    courseRouter : courseRouter
} 


