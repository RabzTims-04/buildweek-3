import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo"
import ProfileModel from "./schema.js"
import axios from "axios";
import { pipeline } from "stream";
import multer from "multer";
import { cloudinaryStorage } from "../../cloudinary/cloudinary.js"
import { generatePDFReadableStream } from "../../lib/pdf/pdf.js";

const profileRouter = express.Router();

/* *************GET profile******************** */

profileRouter.get("/", async (req, res, next) => {
    try {
        const newUser = await ProfileModel.find()
        res.send(newUser)      
    } catch (error) {        
        next(createError(500, "Error in getting profile"))
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

profileRouter.get("/:userId/pdf", async (req, res, next) => {
    try {
        const profile = await ProfileModel.findById(req.params.userId)
        if(profile){
            const response = await axios.get(profile.image,{
                responseType: 'arraybuffer'
            })
            const mediaPath = profile.image.split('/');
            const fileName = mediaPath[mediaPath.length - 1];
            const [id, extension] = fileName.split(".");
            const b64 = Buffer.from(response.data).toString('base64');
            const b64Image = `data:image/${extension};base64,${b64}`;
            const source = generatePDFReadableStream(profile, b64Image);
            const destination = res;
            pipeline(source, destination, err => {
                if (err) {
            next(err);
        }
      });
    } else {
      next(createError(404, "Ptofile  ot found"));
    }
    } catch (error) {
        console.log(error);
        next(createError(500, "Error in getting single profile PDF"))
    }
})

/* ***************profile profile details****************** */

profileRouter.post("/", async (req, res, next) => {
    try {
        const newUser = new ProfileModel(req.body)
        const postingUser = await newUser.save()
        res.status(201).send(postingUser)
        
    } catch (error) {
        next(createError(500, "Error in profileing profile details"))
    }
})

/* ***************profile image****************** */

const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("profile")
profileRouter.post("/:userId/picture",uploadOnCloudinary, async (req, res, next) => {
    try {
        const newImage = {image: req.file.path}
        const updatedImage = await ProfileModel.findByIdAndUpdate(req.params.userId, newImage, {
            new: true,
            runValidators: true
        })
        if(updatedImage){
            res.send(updatedImage)
        }else{
            res.send(404).send(`Profile image with the id of ${req.params.userId} not found!`)
        }
        
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
        const deleteUser = await ProfileModel.findByIdAndDelete(userId)
        if(deleteUser){
            res.send(deleteUser)
        }else{
            next(createError(404, `Profile with an id of ${userId} not found!`))
        }        
    } catch (error) {
        next(createError(500, `Error occured while deleting profile with an id of ${req.params.userId}`))
    }
})

export default profileRouter