const randomstring = require("randomstring");
const User = require("../entities/User");
const QRCode = require("../entities/QRCode");
const admin = require("../config/firebase");
const QrText = require("../../util/QrText");
const auth = require("../../util/Auth");
const firestore = admin.firestore();

module.exports = {
    register : async (req, res) => {
        try {
            let batch = firestore.batch();
            let {userId, status, error} = await auth.validateToken(req);

            if (!status) {
                res.send({
                    statusCode: 401,
                    status: false,
                    message: 'Unauthorized',
                    error: error
                });
            }

            let uid = userId
            let userRef = firestore.collection('users').doc(uid);
            userRef.get().then((doc) => {
                if (doc.exists) {
                    let user = doc.data();
                    if (user.name != undefined) {
                        res.send({
                            statusCode: 400,
                            status: false,
                            message: 'You have already registered'
                        });
                    }
                } else {
                    res.send({
                        statusCode: 404,
                        status: false,
                        message: 'User not found'
                    });
                }
            });
            let {name, nickname, id, year, imgURL, branch, bio, email} = req.body;
            let hash = randomstring.generate(7);
            let encoded = await QrText.generate(uid, hash);
            let qrCode = new QRCode(uid, hash, encoded);
            let user = new User(uid, name, nickname, id, year, imgURL, branch, bio, qrCode, email);
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
                    message: "Something went wrong when you try to register",
                    user: user
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
            let {userId, status, error} = await auth.validateToken(req);

            if (!status) {
                res.send({
                    statusCode: 401,
                    status: false,
                    message: 'Unauthorized',
                    error: error
                });
            }

            let uid = userId;
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
            let {userId, status, error} = await auth.validateToken(req);
            let { bio } = req.body;

            if (!status) {
                res.send({
                    statusCode: 401,
                    status: false,
                    message: 'Unauthorized',
                    error: error
                });
            }

            let uid = userId;
            let userRef = firestore.collection('users').doc(uid);
            userRef.update({'bio': bio}).then(() => {
                res.send({
                    statusCode: 200,
                    status: true,
                    message: 'Saved change.'
                });
            },
            (e) => {
                res.send({
                    statusCode: 400,
                    status: false,
                    message: 'Something when wrong when we trying to save your data.',
                    error: e
                });
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

    friendList : async (req, res) => {
        try {
            let {userId, status, error} = await auth.validateToken(req);

            if (!status) {
                res.send({
                    statusCode: 401,
                    status: false,
                    message: 'Unauthorized',
                    error: error
                });
            }

            let uid = userId;

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
    },
    editBySId: async (req,res) => {
        try{
            let {Sid} = req.params;
            let {name, nickname, year, photoURL, branch, bio, email} = req.body;
            let userData = {};
            await firestore.collection("users").where("id", "==", Sid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        userData = doc.data();
                        userData["uid"] = doc.id
                    });
                });
            userData.name = name ? name : userData.name;
            userData.nickname = nickname ? nickname : userData.nickname;
            userData.year = year ? year : userData.year;
            userData.photoURL = photoURL ? photoURL : userData.photoURL;
            userData.branch = branch ? branch : userData.branch;
            userData.bio = bio ? bio : userData.bio;
            userData.email = email ? email : userData.email;
            await firestore.collection("users").doc(userData.uid).update({
                name : userData.name,
                nickname : userData.nickname,
                year : userData.year,
                photoURL : userData.photoURL,
                branch : userData.branch,
                bio : userData.bio,
                email : userData.email
            });
            res.send({
                statusCode: 206,
                status: true,
                message: "Success",
            });
        }catch(e){
            console.log(e);
            res.send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            });
        }
    },
    getBySId: async (req,res) => {
        try{
            let {Sid} = req.params;
            console.log(Sid)
            let userData = {};
            await firestore.collection("users").where("id", "==", Sid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        userData = doc.data();
                        userData["uid"] = doc.id
                    });
                });
            res.send({
                statusCode: 200,
                status: true,
                message: "Success",
                user: userData
            });
        }catch(e){
            console.log(e);
            res.send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            });
        }
    },

    getUserByEmail: async (req, res) => {
        try {
            let {email} = req.headers;
            await firestore.collection("users").where("email", "==", email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    userData = doc.data();
                    res.send({
                        email: userData.email
                    });
                });
            });
        } catch (e) {
            console.log(e);
            res.send('ERROR')
        }
    },
    regenerateQr:async (req, res) => {
        try {
            let {userId, status, error} = await auth.validateToken(req);

            if (!status) {
                res.send({
                    statusCode: 401,
                    status: false,
                    message: 'Unauthorized',
                    error: error
                });
            }

            let hash = randomstring.generate(7);
            let encoded = await QrText.generate(userId, hash);
            let newQrCode = new QRCode(userId, hash, encoded);
            await firestore.collection("users").doc(userId).update({
                qrCode: JSON.parse(JSON.stringify(newQrCode))
            });
            res.send({
                statusCode: 206,
                status: true,
                message: "Success"
            });
        } catch (e) {
            console.log(e);
            res.send('ERROR')
        }
    }
};