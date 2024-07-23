const mongoose=require("mongoose")

const candidateSchema=new mongoose.Schema({
    candidateName:{
        type:String,
        required:true
    },
    url:{
        type:String


    },
    party:{
        type:String,
        required:true

    },
    age:{
        type:Number,
        required:true

    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
   
    voteCount:{
        type:Number,
        default:0
    },
    


})

const candidate=mongoose.model("candidate",candidateSchema)
module.exports =candidate