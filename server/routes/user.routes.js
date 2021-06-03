const express = require('express')
const router = express.Router();
const Users = require("../controllers/users.controller");

router.post("/signup", Users.register);
router.post("/login", Users.login);

module.exports = router
