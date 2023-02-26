# My Pet Application (CPSC2600-Final-Project)
https://my-pet.azurewebsites.net/

## Tech used
Node.js, Express.js, React, MongoDB, APIs, CSS


## Description

 - User can choose between cat or dog to input owner information and their pet's details.

 - All pet's details are linked to an owner by the owner's ID.

 - Users can see a maximum of 10 random cats or dogs in the Featured page.

 - Users can get specific cats or dogs by searching pet's name or breed.

## Screenshot
 - Homepage
  <img width="960" alt="image" src="https://user-images.githubusercontent.com/64840151/195427605-7b138017-40f8-4c89-9982-939388be6c7a.png">

 - Cat page
 <img width="960" alt="image" src="https://user-images.githubusercontent.com/64840151/195427793-a922730c-4215-4f7b-b0c5-0a5626f94261.png">

 - Add my cat page
 ![image](https://user-images.githubusercontent.com/64840151/195424902-5143ea97-a695-4dc0-b21b-81d8e8d9b5c3.png)
 ![image](https://user-images.githubusercontent.com/64840151/195428178-ea3dc404-5a3f-4888-bf1d-1ecac3d3baa2.png)

 - Meet featured cats page
 ![image](https://user-images.githubusercontent.com/64840151/195425220-063cab29-29ab-490b-a82b-a99587f5c8e8.png)

 - Search cat page
 ![image](https://user-images.githubusercontent.com/64840151/195425636-4e3394a2-ea6d-4c3f-9101-78165168248f.png)


## API documentation

• Endpoints: 

    'api/pet' : to post a pet. Data is first validated by petFormValidator middleware.

    '/api/pet/:petID': to get a pet by pet's id, then find an owner of the pet and populate the data of the pet and the owner. For example, to get a pet with pet's ID 624b4f808c9594001643b9d2, https://cpsc2600-ychan34.herokuapp.com/api/pet/624b4f808c9594001643b9d2

    '/api/pets/:type': to get all cats or dogs from the database. For example, to get all cats data, https://cpsc2600-ychan34.herokuapp.com/api/pets/cat

    '/api/owner': to get all the owners from the database. https://cpsc2600-ychan34.herokuapp.com/api/owner

    'api/owner': to post an owner. Data is first validated by ownerFormValidator middleware.

• Response format: json
• Expected POST body format: json
