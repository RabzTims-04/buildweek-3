import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo"
import PostModel from "./schema.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const postsRouter = express.Router();

/* *************GET posts******************** */

postsRouter.get("/", async (req, res, next) => {
    try {
        
        
    } catch (error) {
        next(createError(500, "Error in getting posts"))
    }
})

/* ***************GET single post****************** */

postsRouter.get("/:postId", async (req, res, next) => {
    try {


    } catch (error) {
        next(createError(500, "Error in getting single post"))
    }
})

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params:{
      folder:"linkedIn"
    }
  })
  
  const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("post")
  
  /* ***************post image****************** */
  
  postsRouter.post("/:postId",uploadOnCloudinary, async (req, res, next) => {
      try {
          
      } catch (error) {
          next(createError(500, "Error in uploading post image"))
      }
  })

/* ***************POST post details****************** */

postsRouter.post("/", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in posting post details"))
    }
})

/* ***************EDIT post details****************** */

 postsRouter.put("/:postId", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in updating post details"))
    }
})
 

/* ****************DELETE post details***************** */

postsRouter.delete("/:postId", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in deleting post details"))
    }
})

export default postsRouter