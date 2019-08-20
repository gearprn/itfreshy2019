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
                    rse.send({
                        statusCode: 404,
                        status: false,
                        message: 'Facebook uid not found!',
                        error: error
                    })
                });
            if (providerData) {
                let {status, firstTime, token} = await Auth.loginFacebook(providerData);
                if (status) {
                    rse.send({
                        statusCode: 200,
                        status: true,
                        message: 'Login success',
                        token: token,
                        firstTime: firstTime
                    })
                } else {
                    rse.send({
                        statusCode: 401,
                        status: false,
                        message: 'Login fail'
                    })
                }
            } else {
                rse.send({
                    statusCode: 400,
                    status: false,
                    message: 'Provider form facebook undefined',
                    error: '-'
                })
            }
        } catch (e) {
            rse.send(e);
        }
    }
}