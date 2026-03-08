// here we write the backend server
const express = require("express");
const app = express();

require('dotenv').config();



const { adminRouter } = require("./routes/admin");
const { userRouter } = require("./routes/user");
const {  courseRouter } = require("./routes/course");

app.use(express.json());
// using respective routers when request is sent to any of the three endpoints
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);






app.listen(3000);