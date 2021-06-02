/*
* Routes for user authentication
*/
const { Router } = require('express');
const router = new Router();

const { login } = require('../controller/authController');

router.post('/', login);

module.exports = router;
