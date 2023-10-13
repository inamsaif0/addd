import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'please add email'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'please add password']
    },
    remember:{
        type:Boolean,
        required:[true,'please check it'],

    }
})

module.exports = mongoose.models['User'] || mongoose.model('User',userSchema);