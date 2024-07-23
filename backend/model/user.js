const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    mobile:{
        type:Number,
        required:true



    },
    address:{
        type:String,
        required:true
    },
    aadharcardNumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        enum:["voter","admin"],
        default:"voter"

    },
    isVoted:{
        type:Boolean,
        default:false
    }


})

const user=mongoose.model("user",userSchema)
module.exports =user