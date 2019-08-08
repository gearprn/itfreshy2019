const Auth = require('../../util/Auth')

module.exports = {
    test: async (req, res, err) => {
        let {userId} = await Auth.validateToken(req);
        console.log(userId);
    }
};