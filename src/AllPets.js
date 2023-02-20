import React from 'react';

import { useState, useEffect} from 'react';

import axios from 'axios';
import Pet from './Pet.js';

const AllPets = props=>{
    
    return(
        
        <>
        {props.backToPrevious? <Pet petType={(props.petType)}/>:
        
        <div>
        <h2>Featured {props.petType}s</h2>
        <ul className="randomList">
       
        {props.randomTenPet?
        
          props.randomTenPet.map(pet => (
            <li key={pet._id} id={pet._id} onClick={(e)=>{props.handleShowPetDetails(pet)}}>
                {pet.petName}{<br/>}
                
            </li>
          ))
        :
        null
        }

        </ul>
        
        {props.loading?
        <p className="loading">loading pet's details...</p>
        :
        props.chosenPet.petName?
            props.displayChosenPetDetail()
            :
            null}
​
        <div className="button">
            <button onClick={()=>{props.handleBackToPreviousPage()}}>{`Back to ${props.petType.toUpperCase()} page`}</button>
            <button onClick={()=>{props.randomGetTenPet()}}>Get more {props.petType}s</button>
        </div>
        </div>
        }
        </>
        
        );
};

export default AllPets;