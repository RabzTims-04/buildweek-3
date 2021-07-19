import mongoose from "mongoose"
import createError from "http-errors"

const { Schema, model } = mongoose

const ExperienceSchema = new Schema(
    {
        
    }
)

export default model("Experience", ExperienceSchema)
