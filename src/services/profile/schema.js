import mongoose from "mongoose"
import createError from "http-errors"

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
        
        
    },
    {
        timestamps: true,
    }
)

export default model("Profile", ProfileSchema)
