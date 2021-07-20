import { v2 as cloudinary } from "cloudinary"; // cloudinary is the alias of v2
import { CloudinaryStorage } from "multer-storage-cloudinary";

// creating an instance of multer storage
export const cloudinaryStorage = new CloudinaryStorage({
    cloudinary:cloudinary,// the value cloudinary is a reference to our cloudinary storage
    params:{// params are the parameters that will be passed to the cloudinary api
      folder:"linkedIn" // folder is the folder name in cloudinary
    }
  })


