import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo"
import ProfileModel from "./schema.js"
import axios from "axios";
import { pipeline } from "stream";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { generatePDFReadableStream } from "../../lib/pdf/pdf.js";

const profileRouter = express.Router();

/* *************GET profile******************** */

profileRouter.get("/", async (req, res, next) => {
    try {
        const newUser = new ProfileModel(req.body)
        const {_id} = await newUser.save()
        res.status(201).send({_id})       
    } catch (error) {
        if(error.name === "ValidationError"){
            next(createError(400, error))
        }else{

            next(createError(500, "Error in getting profile"))
        }
    }
})

/* ***************GET SINGLE ****************** */

profileRouter.get("/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const user = await ProfileModel.findById(userId)
        if (user){
            res.send(user)
        }else{
            next(createError(404, `profile with an id of ${userId} not found!`))
        }


    } catch (error) {
        next(createError(500, "Error in getting single profile"))
    }
})

/* ***************GET CV/PDF of profile****************** */

profileRouter.get("/:userId/CV", async (req, res, next) => {
    try {


    } catch (error) {
        next(createError(500, "Error in getting single profile PDF"))
    }
})

/* ***************profile profile details****************** */

profileRouter.post("/", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in profileing profile details"))
    }
})

 const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"linkedIn"
  }
})

const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("profile")

/* ***************profile image****************** */

profileRouter.post("/:userId/picture",uploadOnCloudinary, async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in profileing profile details"))
    }
})

/* ***************EDIT profile details****************** */

 profileRouter.put("/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const updatedUser = await ProfileModel.findByIdAndUpdate(userId, req.body, {
            new:true,
            runValidators: true,
        })
        if (updatedUser){
            res.send(updatedUser)
        }else{
            next(createError(404, `Profile with an id of ${userId} not found!`))
        }
        
    } catch (error) {
        next(createError(500, `Error occured while updating profile with an id of ${req.params.userId}`))
    }
})


/* ****************DELETE profile details***************** */

profileRouter.delete("/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const deleteUser = await ProfileModel.findOneAndDelete(userId)
        if(deletedUser){
            res.status(204).send()
        }else{
            next(createError(404, `Profile with an id of ${userId} not found!`))
        }
        
    } catch (error) {
        next(createError(500, `Error occured while deleting profile with an id of ${req.params.userId}`))
    }
})

export default profileRouter