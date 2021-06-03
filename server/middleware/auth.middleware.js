const jwt = require("jsonwebtoken");
const User = require('../models/user.model.js')

module.exports.protect = async (req, res, next) => {
    let token = false
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            // get the id from the jwt
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get the user data expt the password
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({ message: "Not authorized, token failed"})
        }
        
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token"})
    }
}