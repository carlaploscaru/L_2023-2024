const express = require("express");
const placeController = require("../controllers/place");

const router = express.Router();

router.post("/", placeController.signup);
router.get('/', placeController.getPlaces);

module.exports = router;