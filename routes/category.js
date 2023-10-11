const express = require("express");
const categoryController = require("../controllers/category");

const router = express.Router();

router.post("/", categoryController.addCategory);
router.post("/", categoryController.getCategories);
module.exports = router;