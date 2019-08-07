let router = require('express').Router();
let { test } = require('../controller/testController');
let { loginFacebook } = require('../controller/authController');
let { register } = require("../controller/userController");
const API = require('../../util/API');

router.use(API.TEST_GET, test);
router.use(API.CLIENT_AUTH, loginFacebook);
router.post(API.USER_REGISTER, register);

module.exports = router;