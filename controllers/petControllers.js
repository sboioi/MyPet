const {Pet} = require("../models/Pet.js");
const {Owner} = require("../models/Owner.js");

//POST Pet
const postPet = (req,res)=>{
   
    let pet = new Pet(req.body);
    
    pet.save().then(result=>{
        res.set('content-location',`/api/pet/${pet._id}`);
        res.status(201).json({
            url:  `/api/pet/${pet._id}`,
            data: pet
        });
    })
    .catch(error=>{res.status(422).json({error:res.locals.error})});
};

//Get all chosen pets 
const getPet = (req,res)=>{
    
    let type = req.params.type;
    Pet.find({"type":type})
    
    .exec((error, pet)=>{
        if(error){
            
            res.status(500).json(error);
        }else if(pet.length == 0){
            
            res.status(404).send("no pet is found!");
        }else{
           
            res.status(200).json(pet);
        }
    }); 
};

const getaPet = (req,res)=>{
    
    let searchPetID = req.params.petID;
    
    Pet.findOne({ _id: searchPetID })
    
    .populate('Owner')
    .exec( (error, pet) => {
        if (error) {
            res.status(500).json(error);
        }else{
            
            Owner.findOne({_id: pet.ownerID[0]})
            .then(result=>{
                res.status(200).json({
                    ownerName: result.ownerName,
                    email: result.email,
                    ig:result.ig,
                    twitter: result.twitter,
                    shareContact: result.shareContact,
                    petName: pet.petName,
                    breed: pet.breed,
                    age: pet.age,
                    descriptions: pet.descriptions
                })
            })
            .catch(error=>res.status(500).json(error))
        }
    });
}

module.exports = {
    postPet,
    getPet,
    getaPet
};


