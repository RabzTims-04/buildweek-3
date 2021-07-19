import mongoose from "mongoose"
import createError from "http-errors"

const { Schema, model } = mongoose

const ProfileSchema = new Schema(
    {
        
    }
)

export default model("Profile", ProfileSchema)
