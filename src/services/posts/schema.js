import mongoose from "mongoose"
import createError from "http-errors"

const { Schema, model } = mongoose

const PostSchema = new Schema(
    {
        
    }
)

export default model("Post", PostSchema)
