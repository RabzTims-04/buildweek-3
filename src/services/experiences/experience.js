import express from "express";
import createError from "http-errors";
import multer from "multer";
import json2csv from "json2csv";
import ProfileModel from "../profile/schema.js"
import { cloudinaryStorage } from "../../cloudinary/cloudinary.js"

const Json2csvParser = json2csv.Parser
const experiencesRouter = express.Router();

/* *************GET experiences******************** */

experiencesRouter.get("/:userId/experiences", async (req, res, next) => {
    try {
        const profile = await ProfileModel.findById(req.params.userId)
        if(profile){
            res.send(profile.experiences)
        }
        else{
            next(createError(404, `Profile with id: ${req.params.userId} not found`))
        }
    } catch (error) {
        next(createError(500, "Error in getting experiences"))
    }
})

/* ***************GET experiences as CSV****************** */

experiencesRouter.get("/:userId/experiences/CSV", async (req, res, next) => {
    try {
        const source = await ProfileModel.findById(req.params.userId, {experiences:1, _id:0})
        console.log(source);
        if(source){
            const jsonData = JSON.parse(JSON.stringify(source.experiences))
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

experiencesRouter.get("/:userId/experiences/:expId", async (req, res, next) => {
    try {
        const experience = await ProfileModel.findById(req.params.userId,{
            experiences:{
                $elemMatch : { _id: req.params.expId}
            },
            _id:0
        })
        if(experience){
            if(experience.experiences.length > 0){
                res.send(experience.experiences[0])
            }else{
                next(createError(404, `no experiences found`));
            }
        }else{
            res.status(404).send(`experience with id: ${req.params.expId} not found`)
        }
    } catch (error) {
        next(createError(500, "Error in getting single experience"))
    }
})

/* ***************POST experience details****************** */

experiencesRouter.post("/:userId/experiences", async (req, res, next) => {
    try {
        const newExperience = { ...req.body, createdAt: new Date(), updatedAt: new Date() }
       const updatedExperience= await ProfileModel.findByIdAndUpdate(req.params.userId,{
           $push:{
               experiences: newExperience
           }
       },
       {
           new:true,
           runValidators: true
       })
       if(updatedExperience){
           res.status(201).send(updatedExperience)
       }
       else{
           res.status(404).send(`profile with userid: ${req.params.userId} not found`)
       }
    } catch (error) {
        next(createError(500, "Error in posting experience details"))
    }
})

/* ***************experience image****************** */

  const uploadOnCloudinary = multer({ storage: cloudinaryStorage}).single("experience")
  experiencesRouter.post("/:userId/experiences/:expId/picture",uploadOnCloudinary, async (req, res, next) => {
      try {

        const experience = await ProfileModel.findOneAndUpdate({
            _id:req.params.userId,
            "experiences._id": req.params.expId
        },{
            $set:{"experiences.$.image" : req.file.path}
        },{
            new: true,
            runValidators: true,
          })

      console.log(experience);
 
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

 experiencesRouter.put("/:userId/experiences/:expId", async (req, res, next) => {
    try {
    const body = {};
    for (let key in req.body) {
      body[`experiences.$.${key}`] = req.body[key];
    }
    body[`experiences.$.updatedAt`] = new Date()

    const profile = await ProfileModel.findOneAndUpdate(
      {
        _id: req.params.userId,
        "experiences._id": req.params.expId,
      },
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (profile) {
      res.send(profile);
    } else {
        res.status(404).send(`experience with id: ${req.params.expId} not found`)
    }
    } catch (error) {
        next(createError(500, "Error in updating experience details"))
    }
}) 

/* ****************DELETE experience details***************** */

experiencesRouter.delete("/:userId/experiences/:expId", async (req, res, next) => {
    try {
        const experienceToDelete = await ProfileModel.findById(req.params.userId,{
            experiences:{
                $elemMatch:{_id:req.params.expId}
            }
        })
        const profile = await ProfileModel.findByIdAndUpdate(
          req.params.userId,
          {
            $pull: {
                experiences: {
                _id: req.params.expId,
              },
            },
          },
          {
            new: true,
          }
        );
        if (profile) {
          res.send(experienceToDelete.experiences[0]);
        } else {
          next(createError(404, `experience not found`));
        }        
    } catch (error) {
        next(createError(500, "Error in deleting experience details"))
    }
})

export default experiencesRouter