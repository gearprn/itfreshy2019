const admin = require("../config/firebase");
const firestore = admin.firestore();
const auth = require("../../util/Auth");

module.exports = {
    leaderboard: async (req, res) => {
        try {
            let newBoard = [];

            let board = await new Promise((resolve) => {
                firestore.collection('users').where('year','==','1').orderBy('amountOf.sum', 'desc').limit(10).get()
                    .then((snapshot)=> {
                        if (snapshot.empty) {
                            res.send({
                                statusCode: 404,
                                status: false,
                                message: 'Board not found!',
                                error: 'No matching documents.'
                            });
                        } else {
                            snapshot.forEach(doc=> {
                                let id = doc.id;
                                let userData = doc.data();
                                newBoard.push({
                                    id,
                                    // userData
                                    userData: {
                                        id: userData.id,
                                        name: userData.name,
                                        nickname: userData.nickname,
                                        amountOf: {
                                            sum: userData.amountOf.sum
                                        }
                                    }
                                });
                                resolve(newBoard);
                            })
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
                statusCode: 200,
                status: true,
                message: 'Request success',
                board: board
            })

        } catch (e) {
            console.log(e);
            res.send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            });
        }
    },
    myPosition: async (req, res) => {
        try {
            let numberChecker = 1;
            let data = {};
            let {userId, status, error} = await auth.validateToken(req);
            if (!status) {
                res.send({
                    statusCode: 401,
                    status: false,
                    message: 'Unauthorized',
                    error: error
                });
            }

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
            if (usercheck.year != 1) {
                res.send({
                    statusCode: 401,
                    status: false,
                    message: 'Permission fail',
                    error: 'Unauthorized.'
                });
            } else {
                let position_ = await new Promise((resolve) => {
                    firestore.collection('users').where('year','==','1').orderBy('amountOf.sum', 'desc').get()
                        .then((snapshot)=> {
                            if (snapshot.empty) {
                                res.send({
                                    statusCode: 404,
                                    status: false,
                                    message: 'Board not found!',
                                    error: 'No matching documents.'
                                });
                            } else {
                                snapshot.forEach(doc=> {
                                    let id = doc.id;
                                    let userData = doc.data();
                                    if (id == userId) {
                                        data = {
                                            id: id,
                                            position: numberChecker,
                                            userData: {
                                                amountOf: {
                                                    sum: userData.amountOf.sum
                                                }
                                            }
                                        }
                                        resolve(data);
                                    } else {
                                        numberChecker = numberChecker + 1;
                                    }
                                })
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
                    statusCode: 200,
                    status: true,
                    message: 'Request success',
                    myPosition: position_
                })
            }

        } catch (e) {
            console.log(e);
            res.send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            });
        }
    }
};

