import mongoose from "mongoose"

const { Schema, model } = mongoose

const PostSchema = new Schema(
    {
        text:{
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false,
            default: "https://www.strive.school/wp-content/uploads/2018/05/logo-strive-school-1.png"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "Profile"
        },
    },
        {
            timestamps: true, // adding createdAt and modifiedAt automatically 
        }
    )

export default model("Post", PostSchema)
