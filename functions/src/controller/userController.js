const randomstring = require("randomstring");
const User = require("../entities/User");
const QRCode = require("../entities/QRCode");
const admin = require("../config/firebase");
const QrText = require("../../util/QrText");
const { validateToken } = require("../../util/Auth");
const firestore = admin.firestore();

module.exports = {
    register : async (req, res) => {
        try {
            let batch = firestore.batch();

            let uidOBJ = await validateToken(req);
            let uid = uidOBJ.userId;
            let {name, nickname, id, year, imgURL, branch, bio, email} = req.body;
            let hash = randomstring.generate(7);
            let encoded = await QrText.generate(uid, hash);
            let qrCode = new QRCode(uid, hash, encoded);
            let user = new User(uid, name, nickname, id, year, imgURL, branch, bio, qrCode, email);
            let userRef = firestore.collection('users').doc(uid); //todo: save this data to given uid from facebook login
            let saveUser = await batch.update(userRef, JSON.parse(JSON.stringify(user)));

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

    myProfile : async (req, res) => {
        try {
            let uidOBJ = await validateToken(req);
            let uid = uidOBJ.userId;
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
    },

    getProfile : async (req, res) => {
        try {
            let { uid } = req.headers;
            let userRef = firestore.collection('users').doc(uid);
            userRef.get().then((doc) => {
                if (doc.exists) {
                    let user = doc.data();
                    res.send({
                        statusCode: 200,
                        status: true,
                        message: 'Request success',
                        user: user
                    });
                } else {
                    res.send({
                        statusCode: 404,
                        status: false,
                        message: 'User not found'
                    });
                }
            });
        } catch (e) {
            console.log(e);
            res.send({
                statusCode: 500,
                status: false,
                message: 'Internal Server Error',
                error: e
            });
        }
    },

    edit : async (req, res) => {
        try {
            let uidOBJ = await validateToken(req);
            let uid = uidOBJ.userId;

            let userRef = firestore.collection('users').doc(uid);
            await userRef.get().then((doc) => {
                if (doc.exists) {
                    let {nickname, bio, branch} = req.body;
                    let payload = {
                        'nickname': nickname,
                        'bio': bio,
                        'branch': branch,
                    }
                    userRef.update(payload).then(() => {
                        res.send({
                            statusCode: 200,
                            status: true,
                            message: "Change has been saved!"
                        });
                    });

                } else {
                    res.send({
                        statusCode: 404,
                        status: false,
                        message: "User not found",
                    });
                }
            });
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

    friendList : async (req, res) => {
        try {
            let uidOBJ = await validateToken(req);
            let uid = uidOBJ.userId;

            let userRef = firestore.collection('users').doc(uid);
            await userRef.get().then((doc) => {
                if (doc.exists) {
                    let user = doc.data();
                    res.send({
                        statusCode: 200,
                        status: true,
                        message: "Success",
                        friendList: user.friendList
                    });
                } else {
                    res.send({
                        statusCode: 404,
                        status: false,
                        message: "User not found"
                    });
                }
            });
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