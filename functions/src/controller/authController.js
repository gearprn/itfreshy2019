const admin = require('firebase-admin');
const Auth = require('../../util/Auth')

module.exports = {
    loginFacebook: async  (req, rse) => {
        try {
            let {uid} = req.body;
            let email = await admin.auth().getUser(uid)
                .then(  (userRecord) => { return userRecord.toJSON().providerData[0].email })
                .catch(function(error) {
                    rse.send({
                        statusCode: 404,
                        status: false,
                        message: 'Facebook uid not found!',
                        error: error
                    })
                });
            if (email) {
                let token = await Auth.loginFacebook(email);
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
                        message: 'Login fail [Please register]'
                    })
                }
            }
        } catch (e) {
            rse.send(e);
        }
    }
}