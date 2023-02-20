import React from 'react';

import { useState, useEffect} from 'react';

import axios from 'axios';
import Pet from './Pet.js';

const SearchPet = props=>{
    
    
    return(
        
        <>
        {props.backToPrevious? <Pet petType={(props.petType)}/>:
        
        <div>
        <h2>Search {props.petType}s</h2>
        {props.searchForm()}
        
        <br/><br/>
        <ul className="searchList">
         {props.searchPet?
        
          props.searchPet.map(pet => (
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
    
        <>
            {props.userInput && props.searchPet.length==0? <p className="error">{props.userInput} is not found</p>: null}
        </>
        
        <br/><br/>
        <div className="button">
                
                <button onClick={()=>{props.handleBackToPreviousPage()}}>{`Back to ${props.petType.toUpperCase()} page`}</button>
        </div>
        </div>
        }
        
        </>
        
        
        
        );
};

export default SearchPet;