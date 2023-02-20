const {Owner} = require("../models/Owner.js");

//POST owner
const postOwner = (req,res)=>{
   
    let owner = new Owner(req.body);
    
    owner.save()
    .then(result=>{
    
        res.set('content-location',`/api/owner/${owner._id}`);
        res.status(201).json({
            url:  `/api/owner/${owner._id}`,
            data: owner
        });
    })
    .catch(error=>{res.status(422).json({error:res.locals.error})});
};

//GET owners
const getOwner = (req,res)=>{
   
    Owner.find({})
    .exec((error, owner)=>{
        if(error){
            res.status(500).json(error);
        }else if(owner.length == 0){
            res.status(404).json({error:"no owner is found!"});
        }else{
            res.status(200).json(owner);
        }
    }); 
};

module.exports = {
    postOwner,
    getOwner
};
