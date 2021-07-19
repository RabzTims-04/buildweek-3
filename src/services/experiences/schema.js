import mongoose from "mongoose"
import createError from "http-errors"

const { Schema, model } = mongoose

const ExperienceSchema = new Schema(
    {
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
      }
    },
    {
        timestamps: true
    }
)

export default model("Experience", ExperienceSchema)
