const { Category } = require("../models/category");


exports.addCategory  = async (req, res, next) => {


    try {

        let category = await Category.findOne({ title: req.body.title });

        console.log(category);
        if (category) {
            return res.status(400).send({ message: "Category already exists" });
        }

        const title = req.body.title;
    
        category = new Category({ title: title });

        await category.save();

        res.status(200).send(category._id);
    } catch (error) {
        next(error);
    }

};


