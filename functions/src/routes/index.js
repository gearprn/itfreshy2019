const router = require('express').Router();
const cors = require('cors')
const { test } = require('../controller/testController');
const { loginFacebook } = require('../controller/authController');
const { register, myProfile, edit, friendList, getProfile, editBySId, getBySId } = require("../controller/userController");
const { quiz, addFriend, nameArray} = require("../controller/friendController");
const { leaderboard, myPosition } = require("../controller/boardController");
const API = require('../../util/API');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use(cors({ origin: true }));

router.post(API.TEST, test);
router.post(API.CLIENT_AUTH, loginFacebook);

router.post(API.USER_REGISTER, register);
router.get(API.USER_PROFILE, myProfile);
router.get(API.USER_GET, getProfile);
router.get(API.USER_FRIENDLIST, friendList);
router.put(API.USER_EDIT, edit);
router.put(API.EDIT_BY_SID, editBySId);
router.get(API.GET_BY_SID, getBySId);

router.post(API.QUIZ, quiz);
router.post(API.ADD_FRIEND, addFriend);

router.get(API.LEADERBOARD, leaderboard);
router.get(API.MY_POSITION, myPosition);

router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;