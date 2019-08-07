let router = require('express').Router();
let { test } = require('../controller/testController');
let { loginFacebook } = require('../controller/authController');
const API = require('../../util/API');

router.use(API.TEST_GET, test);
router.use(API.CLIENT_AUTH, loginFacebook);

module.exports = router;