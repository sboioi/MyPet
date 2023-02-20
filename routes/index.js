const router = require('express').Router({mergeParams:true});

const {ownerFormValidator, petFormValidator} = require('../controllers/validators');
const {getPet, postPet, getaPet} = require("../controllers/petControllers.js");
const {getOwner, postOwner} = require("../controllers/ownerControllers.js");


router.post('/pet',petFormValidator, postPet);
router.get('/pet/:petID', getaPet)
router.get('/pets/:type', getPet);
router.get('/owner', getOwner);
router.post('/owner',ownerFormValidator, postOwner);

module.exports = router;

