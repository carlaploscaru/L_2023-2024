const { User } = require("../models/user");
const bcrypt = require("bcryptjs");//pachet pt criptarea parolei cand inregistrezi userul
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

        const buffer = await crypto.randomBytes(32);
        const registryToken = buffer.toString("hex");
        const registryTokenExpiration = Date.now() + 3600000;

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;


        const hashedPassword = await bcrypt.hash(password, 12);
       //user = new User({ name: name, email: email, password: password });
       user = new User({ name: name, email: email, password: hashedPassword, registryToken: registryToken, registryTokenExpiration: registryTokenExpiration ,isAdmin: false,
        isOwner: false});

        await user.save();

        res.status(200).send(user._id);
    } catch (error) {
        next(error);
    }

};





exports.login = async (req, res, next) => {
    let loadedUser;
  
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const user = await User.findOne({ email, registryToken: null },);
      
  
      if (!user) {
        const error = new Error("This email could not be found!");
        error.statusCode = 401;
        throw error;
      }
  
      loadedUser = user;
      const isEqual = await bcrypt.compare(password, user.password);
  
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
  
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        token: token,
        userId: loadedUser.id,
        isAdmin: loadedUser.isAdmin,
        isOwner: loadedUser.isOwner,
      });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
  
      next(error);
    }
  };


  exports.confirmAccount = async (req, res, next) => {
    const registryToken = req.body.registryToken;
  
    try {
      if (!registryToken) {
        const error = new Error("No token available!");
        error.statusCode = 422;
        throw error;
      }
  
      const user = await User.findOne(
       { registryToken: registryToken },
      );
  
      if(!user) {
        const error = new Error("This user does not exist!");
        error.statusCode = 422;
        throw error;
      }
  
      if(Date.parse(user.registryTokenExpiration) / 1000 > Date.now()) {
        const error = new Error("Token expired");
        error.statusCode = 401;
        throw error;
      }
  
      user.registryToken = null;
      user.registryTokenExpiration = null;
  
      await user.save();
      res.status(200).json({
        message: "Account activated",
      });
  
    } catch (error) {
      next(error);
    }
  };