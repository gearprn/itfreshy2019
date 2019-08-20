const admin = require("../config/firebase");
const Auth = require('../../util/Auth')
const firestore = admin.firestore();

module.exports = {
    test: async (req, res, err) => {
        let {userId, error, status} = await Auth.validateToken(req);
        if (status) {
            let usercheck = await new Promise((resolve) => {
                firestore.doc('users/'+userId).get()
                    .then((snapshot)=> {
                        if (!snapshot.exists) {
                            res.send({
                                statusCode: 404,
                                status: false,
                                message: 'User not found!',
                                error: 'No matching documents.'
                            });
                        } else {
                            resolve(snapshot.data());
                        }
                    })
                    .catch(err => {
                        res.send({
                            statusCode: 400,
                            status: false,
                            message: 'Catch form leaderboard',
                            error: err
                        });
                    });
            });
            res.send({
                userId: userId,
                usercheck: usercheck
            })
        } else {
            res.send({
                statusCode: 400,
                status: false,
                message: 'fail',
                error: error
            })
        }
    }
};