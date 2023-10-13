import mongoose from "mongoose";

const Teachers = new mongoose.Schema({
   
    teacherName:
    {
        type:String, 
    }
})
module.exports = mongoose.models['Teachers'] || mongoose.model('Teachers',Teachers);