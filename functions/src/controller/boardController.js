const admin = require("../config/firebase");
const firestore = admin.firestore();
const auth = require("../../util/Auth");

module.exports = {
    leaderboard: async (req, res) => {
        try {
            let data = [];
            let newBoard = [];
            let myPosition = {};
            let {userId, status, error} = await auth.validateToken(req);

            if (!status) {
                res.status(401).send({
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
                            res.status(404).send({
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
                        res.status(400).send({
                            statusCode: 400,
                            status: false,
                            message: 'Catch form leaderboard',
                            error: err
                        });
                    });
            });
            if (usercheck.year == '1') {
                let board = await new Promise((resolve) => {
                    firestore.collection('users').where('year','==','1').orderBy('amountOf.sum').get()
                        .then((snapshot)=> {
                            if (snapshot.empty) {
                                res.status(404).send({
                                    statusCode: 404,
                                    status: false,
                                    message: 'Board not found!',
                                    error: 'No matching documents.'
                                });
                            } else {
                                snapshot.forEach(doc=> {
                                    let id = doc.id;
                                    let userData = doc.data();
                                    data.push({id, userData});
                                    resolve(data);
                                })
                            }
                        })
                        .catch(err => {
                            res.status(400).send({
                                statusCode: 400,
                                status: false,
                                message: 'Catch form leaderboard',
                                error: err
                            });
                        });
                });

                if (board.length >= 10) {
                    for (let i = 0; i < 10; i++) {
                        newBoard.push(board[i]);
                    }
                } else {
                    for (let i = 0; i < board.length; i++) {
                        newBoard.push(board[i]);
                    }
                }


                for (let i = 0; i < board.length; i++) {
                    if (board[i].id == userId) {
                        let userData = board[i].userData;
                        myPosition = {position: i+1, userData};
                        break;
                    }
                }

                res.status(200).send({
                    statusCode: 200,
                    status: true,
                    message: 'Request success',
                    myPosition: myPosition,
                    board: newBoard
                })
            } else {
                res.status(401).send({
                    statusCode: 401,
                    status: false,
                    message: 'Permission fail',
                    error: 'Unauthorized.'
                });
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
};