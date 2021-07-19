import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params:{
      folder:"linkedIn"
    }
  })