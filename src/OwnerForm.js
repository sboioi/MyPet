//add new owner to db
import React from 'react';

import { useState, useEffect} from 'react';

import axios from 'axios';
import Pet from './Pet.js';
import PetForm from './PetForm.js';


const OwnerForm = props=>{
    
    const [submitNewOwner, setSubmitNewOwner] = useState(false);
    const [ownerNameis, setOwnerNameis] = useState();
    const [ownerID, setOwnerID] = useState();
    const [errorMessage, setErrorMessage] = useState([]);
    const [ownerNameInput, setOwnerNameInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [igInupt, setIgInput] = useState();
    const [twitterInput, setTwitterInput] = useState();
    const [shareContactInput, setShareContactInput] = useState();
    
    const postAOwner = (event) =>{
        
        event.preventDefault();
        setErrorMessage({});
        
        
        let owner = {
            ownerName:ownerNameInput,
            email:emailInput,
            ig:igInupt,
            twitter:twitterInput,
            shareContact: shareContactInput
        };
        
        axios.post('/api/owner',owner)
    
        .then(result=>{
           
                setOwnerID(result.data.data._id);
                setOwnerNameis(result.data.data.ownerName);
                setSubmitNewOwner(true);
                setErrorMessage([]);
                setOwnerNameInput();
                setEmailInput();
                setIgInput();
                setTwitterInput();
                setShareContactInput();
        })
        
        .catch(error=>{
            setErrorMessage(error.response.data.error)
            })
    };
    
    const ownerForm = ()=>{
        
        let ownerform =
        <div>
            <h2>About Me</h2>
                 <form action='./api/owner'  method="post">
                    <fieldset>
                        <legend>My profile:</legend><br/>
                            <label>Name (required): 
                                <input type="text" name="ownerName" id="ownerName" onChange={(e)=>setOwnerNameInput(e.target.value)} required/>
                            </label><br/><br/>
                            <label>Email (required):
                                <input type="email" name="email" id="email" onChange={(e)=>setEmailInput(e.target.value)} required/>
                            </label><br/><br/>
                            <label>Instagram:
                                <input type="text" name="ig" id="ig" onChange={(e)=>setIgInput(e.target.value)}/>
                            </label><br/><br/>
                            <label>Twitter:
                                <input type="text" name="twitter" id="twitter" onChange={(e)=>setTwitterInput(e.target.value)} />
                            </label><br/><br/>
                            <label>Share my contact (required)<br/>
                                <label>
                                    <input type="radio" name="shareContact" value="true" id="shareContact1" onClick={()=>setShareContactInput("true")}/>
                                    Yes please!
                                </label><br/>
                                <label>
                                    <input type="radio" name="shareContact" value="false" id="shareContact2" onClick={()=>setShareContactInput("false")}/>
                                    Nah, I want to hide myself...
                                </label>
                            </label><br/><br/>
                            <input type="submit" value="Submit" onClick={(event)=>postAOwner(event)}/>
                    </fieldset>
                </form> <br/><br/>
        </div>;
        
        return ownerform;
    };
    
    return(
        <>
        {props.backToPrevious? <Pet petType={(props.petType)}/>:
        
        <div>
            
            {submitNewOwner?
                <div className="chooseOwnerType">
                    <p>Congratulation! {ownerNameis}'s profile is created.</p>
                    <p>Your owner ID is {ownerID}</p>
                    <br/>
                    <PetForm petForm={props.petForm} petType={props.petType} postAPet={props.postAPet} submitNewPet={props.submitNewPet} handleBackToPreviousPage={props.handleBackToPreviousPage}petName={props.petName} petID={props.petID} petErrorMessage={props.petErrorMessage}/>
                </div>
            :
            ownerForm()
            }
            
            {errorMessage.length>0?
            <ul className="error">
                {errorMessage.map(err=><li key={err}>{err}</li>)}
                
            </ul>
            :
            null
            }
        <div className="button">
                
                <button onClick={()=>{props.handleBackToPreviousPage()}}>{`Back to ${props.petType.toUpperCase()} page`}</button>
        </div>
        </div>
        }
        
        </>
    );
};

export default OwnerForm;