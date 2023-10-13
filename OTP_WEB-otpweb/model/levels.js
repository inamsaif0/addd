import mongoose from "mongoose";

const levels = new mongoose.Schema({
   
    level:
    {
        type:String, 
    }
})
module.exports = mongoose.models['levels'] || mongoose.model('levels',levels);