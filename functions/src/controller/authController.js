const admin = require('firebase-admin');
const Auth = require('../../util/Auth')

module.exports = {
    loginFacebook: async  (req, rse) => {
        try {
            let uid = req.headers['facebook-id'];
            let providerData = await admin.auth().getUser(uid)
                .then(  (userRecord) => {
                    return userRecord.toJSON().providerData[0];
                })
                .catch(function(error) {
                    rse.status(404).send({
                        statusCode: 404,
                        status: false,
                        message: 'Facebook uid not found!',
                        error: error
                    })
                });
            if (providerData.email) {
                let {status, firstTime, token} = await Auth.loginFacebook(providerData);
                if (status) {
                    rse.status(200).send({
                        statusCode: 200,
                        status: true,
                        message: 'Login success',
                        token: token,
                        firstTime: firstTime
                    })
                } else {
                    rse.status(401).send({
                        statusCode: 401,
                        status: false,
                        message: 'Login fail',
                        firstTime: firstTime
                    })
                }
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            });
        }
    }
}