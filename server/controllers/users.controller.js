const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
require('dotenv').config()

class UserController {

    register(req, res) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    User.create(req.body)
                        .then(user => res.json({
                            _id: user._id,
                            userName: user.userName,
                            email: user.email,
                            token: generateToken(user._id)
                        }))
                        .catch(err => res.status(400).json({ message: "Something went wrong", ...err }));
                } else {
                    res.status(400).json({
                        errors: {
                            email: {
                                message: `User already exists`
                            }
                        }
                    });
                }
            })
            .catch(err => res.status(400).json({ message: "Something went wrong", ...err }));
    }

    login(req, res) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    res.status(401).json({ msg: "Invalid login attempt" });
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                res.json({
                                    _id: user._id,
                                    userName: user.userName,
                                    email: user.email,
                                    token: generateToken(user._id)
                                })
                            } else {
                                res.status(401).json({ msg: "Invalid login attempt" });
                            }
                        })
                        .catch(err => res.status(401).json({ msg: "Invalid login attempt" }));
                }
            })
            .catch(err => res.json(err));
    }
}

module.exports = new UserController();