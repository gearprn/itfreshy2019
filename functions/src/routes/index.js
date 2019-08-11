const router = require('express').Router();
const cors = require('cors')
const { test } = require('../controller/testController');
const { loginFacebook } = require('../controller/authController');
const { register, profile, edit, friendList} = require("../controller/userController");
const { quiz, addFriend } = require("../controller/friendController");
const { leaderboard } = require("../controller/boardController");
const API = require('../../util/API');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use(cors({ origin: true }));

router.post(API.TEST, test);
router.post(API.CLIENT_AUTH, loginFacebook);

router.post(API.USER_REGISTER, register);
router.get(API.USER_PROFILE, profile);
router.get(API.USER_FRIENDLIST, friendList);
router.put(API.USER_EDIT, edit);

router.post(API.QUIZ, quiz);
router.post(API.ADD_FRIEND, addFriend);

router.get(API.LEADERBOARD, leaderboard);

const options = {
    swaggerOptions: {
        docExpansion: 'none',
    },
};
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = router;