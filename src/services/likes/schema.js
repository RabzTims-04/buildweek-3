import mongoose from 'mongoose';

const { Schema, model } =  mongoose;

const likesSchema = new Schema({

    likes:{
        type: Number,
        default: 0
      

    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

export default model('Likes', likesSchema);