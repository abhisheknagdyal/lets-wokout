const express = require('express');

const { loginUser, signupUser } = require('../contollers/userContoller');

const router = express.Router();

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports =  router;