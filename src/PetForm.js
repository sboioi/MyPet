//add to pets db
import React from 'react';

import { useState, useEffect } from 'react';

import axios from 'axios';
import Pet from './Pet.js';

const PetForm = props=>{
   
    return(
        <>
        {props.backToPrevious? <Pet petType={(props.petType)}/>:
        
        <div>
            {props.submitNewPet?
            <div className="chooseOwnerType">
                <p>{props.petName}'s pet ID is {props.petID}</p><br/>
            </div>
            :
            props.petForm()
            }
            
            {props.petErrorMessage.length>0?
            <ul className="error">
                {props.petErrorMessage.map(err=><li key={err}>{err}</li>)}
                
            </ul>
            :
            null
            }
           
        </div>
        }
        
        </>
    );
};

export default PetForm;

