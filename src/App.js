import React from 'react';

import { useState, useEffect} from 'react';

import axios from 'axios';

import Pet from './Pet.js';

const App = props=>{
    
    const [petType, setPetType] = useState();
    
   
    return(
        <>
            {petType? 
            <Pet petType={petType}/>
            : 
            <ul className='app'>
                <li onClick={(event)=>{setPetType('cat')}}>Cat</li>
                <li onClick={(event)=>{setPetType('dog')}}>Dog</li>
            </ul>}
           
        </>
        );
};

export default App;