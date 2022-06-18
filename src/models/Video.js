import { text } from "express";
import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    title:{type:String, required:true, trim:true, minLength:1 },
    description:{type:String, required:true, trim:true, minLength:1},
    createdAt:{type:Date, default:Date.now},
    hashtags:[{type:String, lowercase:true}],
    meta:{
        views:{type:Number,default:0},
        rating:{type:Number, default:0,},
    },
});

videoSchema.static("hashtagsFormat", function(hashtags){
    const formatedHashtags = hashtags.split(",").map((word) => word.startsWith("#")? word : `#${word}`);
    return formatedHashtags;
});

const Video = mongoose.model("Video", videoSchema);

export default Video;