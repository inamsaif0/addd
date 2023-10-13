import mongoose from "mongoose";

const uploadFileSchema = new mongoose.Schema({
   
    filename:
    {
        type:String, 
    },
    student:{
        type:String,
        
    },
    teacher:{
        type:String,
    },

    level:{
        type:String,
    },

    date:{
        type:String
    },
    fileUrl:{
        type:String
    }

    })

module.exports = mongoose.models['uploadFile'] || mongoose.model('uploadFile',uploadFileSchema);