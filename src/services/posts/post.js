import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo"
import PostModel from "./schema.js"

import multer from "multer"; //midleware for file upload

import { cloudinaryStorage } from "../../cloudinary/cloudinary.js"
const postsRouter = express.Router();

/* *************GET posts******************** */

postsRouter.get("/", async (req, res, next) => {
    try {
        const posts = await PostModel.find().populate("user")
        res.send(posts)   
        
    } catch (error) {
        next(createError(500, "Error in getting posts"))
    }
})

/* ***************GET single post****************** */

postsRouter.get("/:postId", async (req, res, next) => {
    try {
        
        const postId = req.params.postId

        const post = await PostModel.findById(postId).populate("user")
            if(post){
                res.status(200).send(post)
            }else(
                next(createError(404, "Post not found"))
            )

    } catch (error) {
        next(createError(500, "Error in getting single post"))
    }
})  
//   /* ***************post image****************** */

//multer({ storage: cloudinaryStorage}) means that we are going to upload images to cloudinary storage

//single("post") is the key for multer, it is used to know which file is going to be uploaded

  const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("post") //Using multer to upload image to cloudinary
  
  postsRouter.post("/:postId/image",uploadOnCloudinary, async (req, res, next) => {
      try {
            const newImage = {image:req.file.path} // newImage is a json object with image as key and path as value
            console.log(req.file)
            const imagePosted = await PostModel.findByIdAndUpdate(req.params.postId,newImage,{
                new:true,
                runValidators:true
            })
       
            if(imagePosted){
                res.send(imagePosted)
            }else{
                next(createError(404,`"Image with the id ${req.params.postId} cannot be not found`))
            }
          
      } catch (error) {
          next(createError(500, "Error in uploading post image"))
      }
  })

/* ***************POST post details****************** */

postsRouter.post("/", async (req, res, next) => {
    try {
        const createPost = new PostModel(req.body)
        const { _id } = await createPost.save()
    
        res.status(201).send({ _id })
        
    } catch (error) {
        next(createError(500, "Error occurred creating a new post"))
    }
})

/* ***************EDIT post details****************** */

 postsRouter.put("/:postId", async (req, res, next) => {
    try {
        const postId = req.params.postId
        const updatePost = await PostModel.findByIdAndUpdate(postId, req.body, {
         new: true , 
         runValidators: true, })
        if(updatePost){
            res.status(200).send(updatePost)
        }
        else{
        next(createError(404, "Post not found"))            
        }

    } catch (error) {
        next(createError(500, "Error in updating post details"))
    }
}) 

postsRouter.put("/:postId/likes", async (req, res, next) => {
    try {
        const postId = req.params.postId
        const updatePost = await PostModel.findByIdAndUpdate(postId, {
            likes: req.body.likes // This allows us to update the likes field
        }, {
            new: true ,
            runValidators: true,
        })

    if(updatePost){
        res.status(200).send(updatePost)
        console.log(`The Likes on post with id ${postId} has been updated successfully`)
    }else{
        next(createError(404, "Post not found"))            
        }

    } catch (error) {
        next(createError(500, "Error in updating post details"))
    }
}) 

/* ****************DELETE post details***************** */

postsRouter.delete("/:postId", async (req, res, next) => {
    try {
        const postId = req.params.postId
        const postDeleted = await PostModel.findByIdAndDelete(postId)
        if(postDeleted){
            res.status(200).send({ message: "Post deleted successfully" })
        }else{
            next(createError(404, "Post not found"))
        }
    } catch (error) {
        next(createError(500, "Error in deleting post details"))
    }
})

export default postsRouter