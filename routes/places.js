const express = require("express");
const placeController = require("../controllers/place");
const isAuth = require("../middleware/is-auth")
const router = express.Router();

router.post('/', isAuth, placeController.addPlace);//pt folosire middleware//router.post("/", placeController.addPlace);
router.get('/', placeController.getPlaces);
router.patch('/:placeId', isAuth, placeController.editPlace);

module.exports = router;