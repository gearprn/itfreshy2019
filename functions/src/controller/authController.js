const admin = require('firebase-admin');
const Auth = require('../../util/Auth')

module.exports = {
    loginFacebook: async  (req, rse) => {
        try {
            let {uid} = req.body;
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
            if (providerData.email) {
                let token = await Auth.loginFacebook(providerData);
                if (token) {
                    rse.send({
                        statusCode: 200,
                        status: true,
                        message: 'Login success',
                        token: token
                    })
                } else {
                    rse.send({
                        statusCode: 401,
                        status: false,
                        message: 'Login fail'
                    })
                }
            }
        } catch (e) {
            rse.send(e);
        }
    }
}