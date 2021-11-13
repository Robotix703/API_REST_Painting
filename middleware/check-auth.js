const jwt = require("jsonwebtoken");

//Middleware
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken =  jwt.verify(token, process.env.JWT);

        req.userData = { email: decodedToken.email, userId: decodedToken.userId };

        next();
    } catch (error) {
        res.status(401).send(error);
    }
};