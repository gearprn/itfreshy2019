const Auth = require('../../util/Auth')

module.exports = {
    test: async (req, res, err) => {
        let {userId, error, status} = await Auth.validateToken(req);
        if (status) {
            res.send(userId)
        } else {
            res.status(400).send({
                statusCode: 400,
                status: false,
                message: 'fail',
                error: error
            })
        }
    }
};