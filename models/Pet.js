const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PetSchema = new Schema({
    petName:{
        type:String, 
        trim: true,
        maxLength: 50, 
        required:true
        
    },
    type:{
        type:String, 
        enum:['dog','cat']
        
    },
    breed:{
        type:String, 
        trim: true,
        required:true
        
    },
    age:{
        type:Number, 
        minimum:0, 
        maximum:30,
        required:true
        
    },
    descriptions:{
        type:String, 
        trim: true,
        required:true
    },
    ownerID:
        [{type:Schema.Types.ObjectID, ref:"Owner"}]
 });

//PetSchema.virtual("des").get

const Pet = mongoose.model("Pet", PetSchema);

module.exports = {
    PetSchema,
    Pet
};