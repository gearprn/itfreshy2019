var User = require("../entities/User");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();

module.exports = {
    register : async (req, res) => {
        try {
            let {uid, name, nickname, id, year, imgURL, branch, bio} = req.body;
            let qrCode = new QRCode(uid);
            let user = new User(uid, name, nickname, id, year, imgURL, branch, bio, qrCode);
            let userRef = firestore.collection('users').doc(uid); //todo: save this data to given uid from facebook login
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
            });
        }
    },
};