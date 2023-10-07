const { User } = require("../models/user");


exports.signup = async (req, res, next) => {


    try {

        let user = await User.findOne({ email: req.body.email });

        console.log(user);
        if (user) {
            return res.status(400).send({ message: "User registered already" });
        }

        if (!req.body.repeatPassword) {
            const error = new Error("Repeated password cannot be empty");
            error.statusCode = 422;
            throw error;
        }

        if (!req.body.password) {
            const error = new Error("Password cannot be empty");
            error.statusCode = 422;
            throw error;
        }



        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;


        user = new User({ name: name, email: email, password: password });

        await user.save();

        res.status(200).send(user._id);
    } catch (error) {
        next(error);
    }

};


