const Ajv = require("ajv");
const ajv = new Ajv({allErrors:true, coerceTypes:true, useDefaults:'empty'});

require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);


const petFormValidator = (req,res,next) =>{   
     
    let schema = {
        type: 'object',
        properties: {
            
            petName: {
                type: 'string',
                transform: ['trim'],
                minLength: 1,
                maxLength:50,
                errorMessage:{
                    type: 'Name should have at least 1 character.',
                    minLength: 'Name should have at least 1 character.',
                    maxLength: 'Name should have less than 50 character.'
                }
            },
            
            type: {
                type: 'string',
                    enum: ['cat','dog'],
                    errorMessage:{
                        enum: 'Please choose one of the allowed pet type.'
                    }
            },
            
            breed: {
                type: 'string',
                transform: ['trim'],
                minLength: 1,
                maxLength:50,
                errorMessage:{
                    type: 'Breed should have at least 1 character.',
                    minLength: 'Breed should have at least 1 character.',
                    maxLength: 'Breed should have less than 50 character.'
                }
            },
            age: {
                type: 'number',
                    transform: ['trim'],
                    minimum: 0,
                    maximum: 30,
                    errorMessage: {
                        type: 'Age must be between 0 and 30',
                        minimum: 'Age must be between 0 and 30',
                        maximum: 'Age must be between 0 and 30'
                    }
            },
            descriptions:{
                type: 'string',
                transform: ['trim'],
                minLength:1,
                maxLength: 1000,
                errorMessage: {
                    minLength: 'Please enter some descriptions.',
                    maxLength: 'Please enter some descriptions.'
                }
            },
            ownerID:{
                type: 'string',
                transform: ['trim'],
                minLength:24,
                errorMessage: {
                    minLength: 'Please enter a valid ownerID.'
                }
            },
        },
        
        required: ["petName", "type", "breed", "age", "descriptions", "ownerID"],
        additionalProperties: false,
        errorMessage: {
            required: {
                'petName': 'Name should have at least 1 character.',
                'type': 'Please enter a valid pet type.',
                'breed': 'Breed should have at least 1 character.',
                'age': 'Age must be between 0 and 30.',
                'descriptions': 'Please enter some descriptions.',
                'ownerID': 'Please use a valid ownerID.'
            }
        }
    };
    
    const validate = ajv.compile(schema);

    validate(req.body);
    
    if(validate.errors){
    
        let validationErrors = [];
        
        if(validate.errors){   
        for(let i = 0; i < validate.errors.length; i++){
            validationErrors.push((validate.errors[i].message));
        }}
        
        res.locals.error = validationErrors;
    }
    next();
};

const ownerFormValidator = (req,res,next)=>{
    
    let schema = {
        type: 'object',
        properties: {
            
            ownerName: {
                type: 'string',
                transform: ['trim'],
                minLength: 1,
                maxLength:50,
            },
            
            email:{
                type: 'string',
                format: 'email',
                transform: ['trim'],
                maxLength: 50,
            },
            ig:{
                type: 'string',
                transform: ['trim'],
                maxLength: 50,
            },
            twitter:{
                type: 'string',
                transform: ['trim'],
                maxLength: 50,
            },
            shareContact:{
                type: 'string',
            },
        },
        
        required: ["ownerName", "email"],
        additionalProperties: false,
        errorMessage: {
            required: {
                'ownerName': 'Name should have at least 1 character.',
                'email': 'Please use a valid email address.'
            }
        }
    };
    
    const validate = ajv.compile(schema);

    validate(req.body);
    
    if(validate.errors){
    
        let validationErrors = [];
        
        if(validate.errors){   
        for(let i = 0; i < validate.errors.length; i++){
            validationErrors.push((validate.errors[i].message));
        }}
        
        res.locals.error = validationErrors;
    }
    next();
};

module.exports = {
    petFormValidator,
    ownerFormValidator
};