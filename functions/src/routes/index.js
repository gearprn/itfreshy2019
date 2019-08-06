var router = require('express').Router();
var { test } = require('../controller/testController');
const API = require('../../util/API')

router.use(API.TEST_GET, test);

module.exports = router;