var randomstring = require("randomstring");
var User = require("../entities/User");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();

module.exports = {
    register : async (req, res) => {
        try {
            let batch = firestore.batch();
            let uid = "test";
            let {name, nickname, id, year, imgURL, branch, bio, email} = req.body;
            let qrCode = new QRCode(uid, randomstring.generate(7));
            let user = new User(uid, name, nickname, id, year, imgURL, branch, bio, qrCode, email);
            let userRef = firestore.collection('users').doc(uid); //todo: save this data to given uid from facebook login
            let saveUser = await batch.set(userRef, JSON.parse(JSON.stringify(user)));

            let nameArrayRef = firestore.doc('users/nameArray');
            let getArray = await nameArrayRef.get();
            let array = getArray.data().array;
            array.push(user.nickname);
            let saveArray = await batch.set(nameArrayRef, {"array": array}, {merge: true})

            if (saveUser && saveArray) {
                batch.commit().then(() => {
                    res.send({
                        statusCode: 201,
                        status: true,
                        message: "User Created",
                    });
                })
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

    profile : async (req, res) => {
        try {
            uid = req.headers.uid;
            let userRef = firestore.collection('users').doc(uid);
            userRef.get().then((doc) => {
                if (doc.exists) {
                    res.send(doc.data());
                } else {
                    res.send({
                        statusCode: 404,
                        status: false,
                        message: "User not found"
                    });
                }
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
    }
};