import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo"
import ExperienceModel from "./schema.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const experiencesRouter = express.Router();

/* *************GET experiences******************** */

experiencesRouter.get("/", async (req, res, next) => {
    try {
        
        
    } catch (error) {
        next(createError(500, "Error in getting experiences"))
    }
})

/* ***************GET single experience****************** */

experiencesRouter.get("/:expId", async (req, res, next) => {
    try {


    } catch (error) {
        next(createError(500, "Error in getting single experience"))
    }
})

/* ***************POST experience details****************** */

experiencesRouter.post("/", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in posting experience details"))
    }
})

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params:{
      folder:"linkedIn"
    }
  })
  
  const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("experience")
  
  /* ***************experience image****************** */
  
  experiencesRouter.post("/:expId/picture",uploadOnCloudinary, async (req, res, next) => {
      try {
          
      } catch (error) {
          next(createError(500, "Error in uploading experience image"))
      }
  })

/* ***************EDIT experience details****************** */

 experiencesRouter.put("/:expId", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in updating experience details"))
    }
})
 

/* ****************DELETE experience details***************** */

experiencesRouter.delete("/:expId", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in deleting experience details"))
    }
})

export default experiencesRouter