const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const adminSchema = new Schema({
    firstName : String,
    lastName : String,
    password : String,
    email : {type: String, unique: true}

})

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password : String,
    email : {type : String, 
            unique : true}
})

const courseSchema = new Schema({
    title : String,
    description : String,
    price : String,
    imgUrl : String,
    creatorId : ObjectId
})

const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId

})

const adminModel = mongoose.model("admins", adminSchema);
const userModel = mongoose.model("users", userSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);


async function main(){
await mongoose.connect(process.env.MONGO_URL)
}

main()
module.exports = {
    adminModel,
    userModel,
    courseModel,
    purchaseModel
}
