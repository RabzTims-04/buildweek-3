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
        
        
    } catch (error) {
        next(createError(500, "Error in getting profile"))
    }
})

/* ***************GET SINGLE ****************** */

profileRouter.get("/:userId", async (req, res, next) => {
    try {


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
        
    } catch (error) {
        next(createError(500, "Error in updating profile details"))
    }
})
 

/* ****************DELETE profile details***************** */

profileRouter.delete("/:userId", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(createError(500, "Error in deleting profile details"))
    }
})

export default profileRouter