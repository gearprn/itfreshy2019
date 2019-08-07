var User = require("../entities/User")
var admin = require("../config/firebase")
var firestore = admin.firestore();

module.exports = {
    register : async (req, res) => {
        try {
            let {name, nickname, id, year, imgURL, branch, bio} = req.body;
            let user = new User(name, nickname, id, year, imgURL, branch, bio);
            let userRef = firestore.collection('users').doc();
            let saveUser = await userRef.set(JSON.parse(JSON.stringify(user)));
            if (saveUser) {
                res.send({
                    statusCode: 201,
                    status: true,
                    message: "User Created",
                });
            } else {
                res.send({
                    statusCode: 400,
                    status: false,
                    message: "Something went wrong when you try to register"
                });
            }

        } catch(e) {
            console.log(e);
            res.send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            })
        }
    }
};