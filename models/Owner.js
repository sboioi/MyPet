const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
    ownerName:{
        type:String, 
        minLength:1,
        maxLength: 50, 
        trim: true,
        required:true,
    },
    email: { 
        type: String,
        maxLength:50,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        unique: true,
        required:true
    },
    ig: { 
        type: String,
        maxLength:50,
        trim: true,
    },
    twitter: { 
        type: String,
        maxLength:50,
        trim: true,
    },
    shareContact: {type:Boolean, default:true}
 });

const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = {
    Owner,
    OwnerSchema
};