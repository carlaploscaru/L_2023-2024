const express = require("express");
const categoryController = require("../controllers/category");

const router = express.Router();

router.post("/", categoryController.signup);

module.exports = router;