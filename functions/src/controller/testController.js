const Auth = require('../../util/Auth')

module.exports = {
    test: async (req, res, err) => {
        let {token} = req.body;
        let {userId} = await Auth.validateToken(token);
        console.log(userId);
    }
};