Link:
https://cpsc2600-ychan34.herokuapp.com/


Description:

User can choose between cat or dog to input owner information and their pet's details.

All pet's details are linked to an owner by the owner's ID.

Users can see a maximum of 10 random cats or dogs in the Featured page.

Users can get specific cats or dogs by searching pet's name or breed.


API documentation

• Endpoints: 

    'api/pet' : to post a pet. Data is first validated by petFormValidator middleware.

    '/api/pet/:petID': to get a pet by pet's id, then find an owner of the pet and populate the data of the pet and the owner. For example, to get a pet with pet's ID 624b4f808c9594001643b9d2, https://cpsc2600-ychan34.herokuapp.com/api/pet/624b4f808c9594001643b9d2

    '/api/pets/:type': to get all cats or dogs from the database. For example, to get all cats data, https://cpsc2600-ychan34.herokuapp.com/api/pets/cat

    '/api/owner': to get all the owners from the database. https://cpsc2600-ychan34.herokuapp.com/api/owner

    'api/owner': to post an owner. Data is first validated by ownerFormValidator middleware.

• Response format: json
• Expected POST body format: json
