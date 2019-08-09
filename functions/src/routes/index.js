let router = require('express').Router();
let { test } = require('../controller/testController');
let { loginFacebook } = require('../controller/authController');
let { register, updateQRCode } = require("../controller/userController");
let{ quiz, addFriend } = require("../controller/friendController");
const API = require('../../util/API');

router.post(API.TEST, test);
router.post(API.CLIENT_AUTH, loginFacebook);
router.post(API.USER_REGISTER, register);
router.post(API.QUIZ, quiz);
router.post(API.ADD_FRIEND, addFriend);

module.exports = router;