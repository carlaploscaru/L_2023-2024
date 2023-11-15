//is_auth forteaza la post place sa fie autentificat(sa aibe token valid)
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const error = new Error("Not authenticated!");
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY);

        if(!decodedToken) {
            const error = new Error("Not authenticated!");
            error.statusCode = 401;
            throw error;
        }

        req.userId = decodedToken.userId;
    } catch(error) {
        error.statusCode = 500;
        next(error);
    }
    next();
}