
import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    price:{
       type:Number,
       required:true
    },
    description:{
         type:String,
         required:true
    },
    images:[{
       type:String,
       required:true
    }],
    isSold:{
      type:Boolean,
      default:false,
    }
})

export default mongoose.model("Product",productSchema);