const admin = require("../config/firebase");
const firestore = admin.firestore();

module.exports = {
    leaderboard: async (req, res) => {
        try {
            let data = [];
            let board = await new Promise((resolve) => {
                firestore.collection('users').orderBy('amountOf.sum').get()
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
                                data.push({id, userData});
                                resolve(data);
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
        }
    }
};