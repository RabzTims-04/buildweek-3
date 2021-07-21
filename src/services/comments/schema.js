import mongoose from "mongoose"

const { Schema, model } = mongoose

const CommentSchema = new Schema(
    {
        text:{
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "Profile"
        },
        createdAt: Date,
        updatedAt: Date
    },
    {
        timestamps: true
    }
    )

export default model("Comment", CommentSchema)
