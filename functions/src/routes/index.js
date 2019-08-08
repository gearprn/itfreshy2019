let router = require('express').Router();
let { test } = require('../controller/testController');
let { loginFacebook } = require('../controller/authController');
let { register, updateQRCode } = require("../controller/userController");
const API = require('../../util/API');

router.post(API.TEST, test);
router.post(API.CLIENT_AUTH, loginFacebook);
router.post(API.USER_REGISTER, register);

module.exports = router;