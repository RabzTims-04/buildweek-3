import express from "express";
import createError from "http-errors";
import ExperienceModel from "./schema.js"
import multer from "multer";
import json2csv from "json2csv";
import { cloudinaryStorage } from "../../cloudinary/cloudinary.js"

const Json2csvParser = json2csv.Parser
const experiencesRouter = express.Router();

/* *************GET experiences******************** */

experiencesRouter.get("/", async (req, res, next) => {
    try {
        const experiences = await ExperienceModel.find() 
        res.send(experiences)
    } catch (error) {
        next(createError(500, "Error in getting experiences"))
    }
})

/* ***************GET experiences as CSV****************** */

experiencesRouter.get("/CSV", async (req, res, next) => {
    try {
        const source = await ExperienceModel.find()
        if(source){
            const jsonData = JSON.parse(JSON.stringify(source))
            const fields = ["_id","role", "company", "description", "area", "username", "startDate", "endDate"]
            const options = {fields}
            const json2csvParser = new Json2csvParser(options)
            const csvData = json2csvParser.parse(jsonData)
            res.setHeader("Content-Disposition","attachment; filename = experiences.csv")
            res.set("Content-Type", "text/csv")
            res.status(200).end(csvData)
        }else{
            res.status(404).send("source not found")
        }
       
    } catch (error) {
        next(createError(500, "Error in downloading CSV file"))
        console.log(error);        
    }
})

/* ***************GET single experience****************** */

experiencesRouter.get("/:expId", async (req, res, next) => {
    try {
        const experience = await ExperienceModel.findById(req.params.expId)
        if(experience){
            res.send(experience)
        }else{
            res.status(404).send(`experience with id: ${req.params.expId} not found`)
        }
    } catch (error) {
        next(createError(500, "Error in getting single experience"))
    }
})

/* ***************POST experience details****************** */

experiencesRouter.post("/", async (req, res, next) => {
    try {
       const experience = { ...req.body } 
       const newExperience = new ExperienceModel(experience)
       const postExperience = await newExperience.save()
       res.status(201).send(postExperience)
    } catch (error) {
        next(createError(500, "Error in posting experience details"))
    }
})

/* ***************experience image****************** */

  const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("experience")
  experiencesRouter.post("/:expId/picture",uploadOnCloudinary, async (req, res, next) => {
      try {
          const newImage = { image : req.file.path }
          const experience = await ExperienceModel.findByIdAndUpdate(req.params.expId, newImage , {
              new:true,
              runValidators: true
          })
          if(experience){
              res.send(experience)
          }
          else{
            res.status(404).send(`experience with id: ${req.params.expId} not found`)
          }
      } catch (error) {
          next(createError(500, "Error in uploading experience image"))
      }
  })

/* ***************EDIT experience details****************** */

 experiencesRouter.put("/:expId", async (req, res, next) => {
    try {
        const update = req.body
        const updateExperience = await ExperienceModel.findByIdAndUpdate(req.params.expId, update,{
            new:true,
            runValidators: true
        })
        if(updateExperience){
            res.send(updateExperience)
        }
        else{
            res.status(404).send(`experience with id: ${req.params.expId} not found`)
        }
    } catch (error) {
        next(createError(500, "Error in updating experience details"))
    }
}) 

/* ****************DELETE experience details***************** */

experiencesRouter.delete("/:expId", async (req, res, next) => {
    try {
        const deleteExperience = await ExperienceModel.findByIdAndRemove(req.params.expId)
        if(deleteExperience){
            res.send(deleteExperience)
        }else{
            res.status(404).send(`experience with id: ${req.params.expId} not found`)
        }
    } catch (error) {
        next(createError(500, "Error in deleting experience details"))
    }
})

export default experiencesRouter