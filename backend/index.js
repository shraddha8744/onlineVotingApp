const express=require("express");
const connection = require("./database/Connection");
const userRouter = require("./routes/userRoute");
const userInfoRouter = require("./routes/userInfoRoute");
const candidateRoute = require("./routes/candidateRoute");
const app=express()
require("dotenv").config()
const cors=require("cors")
app.use(cors())


app.use(express.json());


app.use("/api",userRouter)
app.use("/api",userInfoRouter)
app.use("/api",candidateRoute)




// console.log("Attempting to connect to the database...");
connection();

app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})