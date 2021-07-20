import mongoose from "mongoose"

const { Schema, model } = mongoose   

const ProfileSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        surname:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        bio:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        area:{
            type: String,
            required: true
        },
        image:{
            type: String,
            default: "https://via.placeholder.com/150x150",
            required: true
        },
        username:{
            type: String,
            required: true
        },
        experiences:[ {
            role: {
                type: String,
                required:true
            },
            company:{
                type: String,
                required:true
            },
            startDate:{
                type: Date,
                required: true
            },
            endDate:{
                type: Date,
                required: false
            },
            description:{
                type: String,
                required:true
            },
            area:{
                type: String,
                required: true
            },
            username:{
                type: String,
                required: true
            },
            image:{
                type: String,
                required: true,
                default: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png"
            }, 
            createdAt: Date,
            updatedAt: Date           
          },]         
    },
    {
        timestamps: true,
    }
)

export default model("Profile", ProfileSchema)
