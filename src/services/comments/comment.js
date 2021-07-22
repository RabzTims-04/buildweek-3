import express from "express";
import createError from "http-errors";
import CommentModel from "./schema.js"

const commentsRouter = express.Router();

/* *************GET comments******************** */

commentsRouter.get("/", async (req, res, next) => {
    try {
        const comments = await CommentModel.find()
        res.send(comments)   
        
    } catch (error) {
        next(createError(500, "Error in getting comments"))
    }
})

/* ***************GET comments for specific post****************** */

commentsRouter.get("/:postId", async (req, res, next) => {
    try {        
        const postId = req.params.postId
        const comments = await CommentModel.find({post: postId}).populate("post").populate("user")
            if(comments){
                res.status(200).send(comments)
            }else(
                next(createError(404, "comments not found"))
            )

    } catch (error) {
        next(createError(500, `Error in getting comments for post with id: ${postId}`))
    }
})  

/* ***************Post comment ****************** */

commentsRouter.post("/:postId", async (req, res, next) => {
    try {
        const postId = req.params.postId
        const createcomment = new CommentModel({...req.body, post: postId})
        const { _id } = await createcomment.save()
    
        res.status(201).send({ _id })
        
    } catch (error) {
        next(createError(500, "Error occurred creating a new comment"))
    }
})

/* ***************EDIT comment****************** */

 commentsRouter.put("/:commentId", async (req, res, next) => {
    try {
        const commentId = req.params.commentId
        const updatecomment = await CommentModel.findByIdAndUpdate(commentId, req.body, {
         new: true , 
         runValidators: true, })
        if(updatecomment){
            res.status(200).send(updatecomment)
        }
        else{
        next(createError(404, "comment not found"))            
        }

    } catch (error) {
        next(createError(500, "Error in updating comment details"))
    }
}) 

/* ****************DELETE comment ***************** */

commentsRouter.delete("/:commentId", async (req, res, next) => {
    try {
        const commentId = req.params.commentId
        const commentDeleted = await CommentModel.findByIdAndDelete(commentId)
        if(commentDeleted){
            res.status(200).send({ message: "comment deleted successfully" })
        }else{
            next(createError(404, "comment not found"))
        }
    } catch (error) {
        next(createError(500, "Error in deleting comment details"))
    }
})

export default commentsRouter