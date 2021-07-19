import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo"
import PostModel from "./schema.js"
import multer from "multer";
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

//   const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("post")
//   postsRouter.post("/:postId",uploadOnCloudinary, async (req, res, next) => {
//       try {
          
//       } catch (error) {
//           next(createError(500, "Error in uploading post image"))
//       }
//   })

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