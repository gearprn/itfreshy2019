let router = require('express').Router();
let { test } = require('../controller/testController');
let { loginFacebook } = require('../controller/authController');
let { register, updateQRCode } = require("../controller/userController");
let{ quiz } = require("../controller/friendController");
const API = require('../../util/API');

router.post(API.TEST, test);
router.post(API.CLIENT_AUTH, loginFacebook);
router.post(API.USER_REGISTER, register);
router.post(API.QUIZ, quiz);

module.exports = router;