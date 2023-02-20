//show menu to the user (create new pet or view pets)
import React from 'react';

import { useState, useEffect} from 'react';

import axios from 'axios';

import App from './App.js';
import OwnerForm from './OwnerForm.js';
import PetForm from './PetForm.js';
import AllPets from './AllPets.js';
import SearchPet from './SearchPet.js';

const Pet = props=>{
    
    
    const [backToHome, setBackToHome] = useState(false);
    const [postNewPet, setPostNewPet] = useState(false);
    const [getPet, setGetPet] = useState(false);
    const [backToPrevious, setBackToPrevious] = useState(false);
    const [searchPets, setSearchPets] = useState(false);
    const [chosenPets, setChosenPets] = useState([]);
    const [chosenPet , setChosenPet] = useState({});
    const [searchPet , setSearchPet] = useState([]);
    const [userInput, setUserInput] = useState();
    const [result, setResult] = useState(false);
    const [submitNewPet, setSubmitNewPet] = useState(false);
    const [petName, setPetName] = useState();
    const [petID, setPetID] = useState();
    const [petErrorMessage, setPetErrorMessage] = useState([]);
    const [randomTenPet, setRandomGetTenPet] = useState([]);
    const [loading, setLoading] = useState(false);
    const [petNameInput, setPetNameInput] = useState();
    const [breedInput, setBreedInput] = useState();
    const [ageInput, setAgeInput] = useState();
    const [descriptionsInput, setDescriptionsInput] = useState();
    const [ownerIDInput, setOwnerIDInput] = useState();
    const [searchPetName,setSearchPetName] = useState();
    const [searchBreed, setSearchBreed] = useState();
    
    
    //get all cats or dogs once when new pet is submitted
    useEffect(() => {   
        
        getAllChosenPetType(props.petType);
        
    },[submitNewPet]);
    
    //get list of pets for cat or dog
    useEffect(()=>{
        
        randomGetTenPet();
        
    },[chosenPets]);
    
    const handleBackToHome = ()=>{
        setPostNewPet(false);
        setSubmitNewPet(false);
        setGetPet(false);
        setSearchPets(false);
        setChosenPet({});
        setLoading(false);
        setBackToHome(true);
    };
    
    const handleBackToPreviousPage = ()=>{
        setPostNewPet(false);
        setSubmitNewPet(false);
        setGetPet(false);
        setSearchPets(false);
        setChosenPet({});
        setLoading(false);
        setBackToPrevious(true);
    };

    //post a cat or dog
    const postPet = (petType) =>{
        setPostNewPet(true);
    };
    
    //get cats or dogs
    const getPets = (petType) =>{
        setGetPet(true);
    };
    
    //search cats or dogs
    const searchthePets = (petType) =>{
        setSearchPets(true);
    }
    
    //get maximum 10 random pet
    const randomGetTenPet = ()=>{
        
        setChosenPet({});
        
        if(chosenPets.length > 10){
            
            let len = chosenPets.length;
            
            let newList = [];
            
            for(let i = 0; i < 10; i++){
                
                let index = Math.floor(Math.random()*len)
            
                newList[i] = chosenPets[index];
                for (let j = 0; j < i; j++) {
                    if(newList[i]== newList[j]){
                        i--;
                        break;
                    }
                }
            }
            
            setRandomGetTenPet(newList);
        }
        else{
            setRandomGetTenPet(chosenPets);
        }
    }
    
    //axios POST a pet
    const postAPet = (event) =>{
        
        event.preventDefault();
        
        
        let pet = {
            petName:petNameInput,
            type:`${props.petType}`,
            breed:breedInput,
            age: ageInput,
            descriptions: descriptionsInput,
            ownerID: ownerIDInput
        };
        
        axios.post(`/api/pet`,pet)
        
        .then(result=>{
            
                setPetID(result.data.data._id);
                setPetName(result.data.data.petName);
                setSubmitNewPet(true);
                setPetErrorMessage([]);
                setPetNameInput();
                setBreedInput();
                setAgeInput();
                setDescriptionsInput();
                setOwnerIDInput();
                
        })
        .catch(error=>{setPetErrorMessage(error.response.data.error)});
        
    };
    
    // pet form for posting a new pet
    const petForm = ()=>{
        
        let petform =
        <div>
            <h2>My {props.petType}</h2>
                 <form action='./api/pet'  method="post">
                    <fieldset>
                        <legend>My {props.petType}'s profile (All fields are required):</legend><br/>
                            <label>Name:    
                                <input type="text" name="petName" id="petName" required onChange={(e)=>{setPetNameInput(e.target.value.toLowerCase())}}/>
                            </label><br/><br/>
                            <label>Breed:
                                <input type="text" name="breed" id="breed" required onChange={(e)=>{setBreedInput(e.target.value.toLowerCase())}}/>
                            </label><br/><br/>
                            <label>Age:
                                <input type="number" name="age" max="30" min="0" id="age" required onChange={(e)=>{setAgeInput(e.target.value)}}/>
                            </label><br/><br/>
                            <label>Descriptions:<br/>
                                <textarea name="descriptions" rows="4" cols="30" id="descriptions" required onChange={(e)=>{setDescriptionsInput(e.target.value)}}/>
                            </label><br/><br/>
                            <label>Owner ID:    
                                <input type="text" name="ownerID" id="ownerID" required onChange={(e)=>{setOwnerIDInput(e.target.value)}}/>
                            </label><br/><br/>
                            <input type="submit" value="Submit" onClick={(event)=>postAPet(event)}/>
                    </fieldset>
                </form> <br/><br/>
        </div>;
        
        return petform;
    };
    
    //search pet form for searching pets
    const searchForm = ()=>{
        let result =
        <form>
        
            <label>Find pets by pet's name:<br/>
            
                <input type="text" name="petNameInput" id ="petNameInput" onChange={(e)=>{setSearchPetName(e.target.value.toLowerCase())}}/>
               
                <input type="submit" value="Submit" onClick={(event)=>handleSearchPetByName(event)}/>
                
            </label>
            
            <br/><br/>
            <label>Find pets by pet's breed: <br/>
            
                <input type="text" name="breedInput" id ="breedInput" onChange={(e)=>{setSearchBreed(e.target.value.toLowerCase())}}/>
               
                <input type="submit" value="Submit" onClick={(event)=>handleSearchPetByBreed(event)}/>
            
            </label>
            
        </form>;
        return result;
    }
    
    //axios GET all cats or dogs
    const getAllChosenPetType = (chosenType) =>{
        
        setLoading(true)
        
        axios.get(`/api/pets/${chosenType}`)
        .then(result=>{
            
            setChosenPets(result.data);
            setLoading(false)
        })
        
        .catch(error=>console.log(error));
    };
    
    //axios GET a pet's details
    const handleShowPetDetails = (pet)=>{
       
       setLoading(true)
       
       axios.get(`/api/pet/${pet._id}`)
       
        .then(result=>{
            
            setChosenPet(result.data);
            setLoading(false)
            
        })
        .catch(error=>(error))
    
    }
    
    //search pet by name
    const handleSearchPetByName = (event)=>{
        
        event.preventDefault();  
        
        setResult(false);
        setChosenPet({});
        
        setUserInput(searchPetName);
        
        let list = [];
        
        chosenPets.forEach(pet=>{
            
            if(pet.petName == searchPetName){
                
                list.push(pet);
                setResult(true)
            }
        })
        
        setSearchPet(list);
        setSearchPetName();
        
        
    };
    
    //search pet by breed
    const handleSearchPetByBreed = (event)=>{
        
        event.preventDefault(); 
        
        setResult(false);
        setChosenPet({});
        
        setUserInput(searchBreed);
        
        let list = [];
        
        chosenPets.forEach(pet=>{
            
            if(pet.breed == searchBreed){
                
                list.push(pet);
                setResult(true);
            }
        });
     
        setSearchPet(list);
        setSearchBreed();
        
    };

    //show PET page content
    const display = (props)=>{
        let content = 
        <>
                <ul className='pet'>
                        <li>{props.petType.toUpperCase()}</li>
                        <li>
                            <ul className='petSubMenu'>
                                <li onClick={(event)=>postPet(props.petType)}>Add my {props.petType}</li>
                                <li onClick={(event)=>getPets(props.petType)}>Meet featured {props.petType}s</li>
                                <li onClick={(event)=>searchthePets(props.petType)}>Search {props.petType}s</li>
                            </ul>
                        </li>
            </ul>
        </>
        
        return content;
    }
    
    //show chosen pet page content 
    const displayChosenPetDetail = () =>{
        let result = 
            
            <ul className="chosenPet">
                <li>Pet Name:   {chosenPet.petName}</li>
                <li>Age:    {chosenPet.age}</li>
                <li>Breed:  {chosenPet.breed}</li>
                <li>About {chosenPet.petName}:    {chosenPet.descriptions}</li>
                <li>{chosenPet.shareContact? 
                    <ul className="ownerInfo"><br/>
                        <li>Owner:  {chosenPet.ownerName.toUpperCase()}</li>
                        <li><a href={`mailto:${chosenPet.email}`}>Email</a></li>
                        {chosenPet.ig?
                        <li><a href={`https://www.instagram.com/${chosenPet.ig}`} target="_blank">Instagram</a></li>
                        :null}
                        {chosenPet.twitter?
                        <li><a href={`https://twitter.com/${chosenPet.twitter}`} target="_blank">Twitter</a></li>
                        :null}

                    </ul>
                    :
                    null
                    }
                </li>
            </ul>;
          
            
            return result;
    }
    
    
    return(
        <>
            {randomTenPet?
                backToHome? 
                <App /> 
                : 
                <div>
                    {postNewPet || getPet || searchPets? 
                        postNewPet||getPet?
                            postNewPet?
                            <OwnerForm petForm={petForm} petType={props.petType}  getPets={getPets} postAPet={postAPet} handleBackToPreviousPage={handleBackToPreviousPage}submitNewPet={submitNewPet} petName={petName} petID={petID} petErrorMessage={petErrorMessage}/>
                            :<AllPets loading={loading}petType={props.petType} chosenPet={chosenPet} handleBackToPreviousPage={handleBackToPreviousPage}handleShowPetDetails={handleShowPetDetails} chosenPets={chosenPets} getAllChosenPetType={getAllChosenPetType} randomGetTenPet={randomGetTenPet} randomTenPet={randomTenPet} displayChosenPetDetail={displayChosenPetDetail}/>
                        :
                        <SearchPet loading={loading}petType={props.petType} chosenPet={chosenPet} handleBackToPreviousPage={handleBackToPreviousPage}handleShowPetDetails={handleShowPetDetails} chosenPets={chosenPets} getAllChosenPetType={getAllChosenPetType} getPets={getPets} searchForm={searchForm} searchPet={searchPet} userInput={userInput} result={result} displayChosenPetDetail={displayChosenPetDetail}/>
                    :display(props)
                    }
                   
                <div className="button">
                    <button onClick={()=>{handleBackToHome()}}>{"Back to homepage"}</button>
                </div>
                   
                </div>
            :
            null
            }
        </>
    );
};

export default Pet;