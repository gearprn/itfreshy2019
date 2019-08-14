var randomstring = require("randomstring");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();
var QrText = require("../../util/QrText");
var auth = require("../../util/Auth");

module.exports = {
    quiz : async (req, res) => {
        try {
            let {userId, status, error} = await auth.validateToken(req);

            if (!status) {
                res.status(401).send({
                    statusCode: 401,
                    status: false,
                    message: 'Please login',
                    error: error
                });
            }

            let {encoded} = req.body;
            let friend = {};
            await firestore.collection("users").where("qrCode.encoded", "==", encoded)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        friend = doc.data();
                        friend["uid"] = doc.id
                    });
                });

            if(!friend.uid){
                res.status(400).send({
                    statusCode: 400,
                    status: false,
                    message: "QrCode Expired"
                });
                return 0;
            }

            let choice = {};
            let friendUid = await QrText.decode(encoded, friend.qrCode.hash);

            if(friend.uid == friendUid){
                friend.qrCode.counter += 1;
                if(friend.qrCode.counter >= 7){
                    let hash = randomstring.generate(7);
                    let encoded = await QrText.generate(friend.uid, hash);
                    let newQrCode = new QRCode(friend.uid, hash, encoded);
                    await firestore.collection("users").doc(friend.uid).update({
                        qrCode: JSON.parse(JSON.stringify(newQrCode))
                    })
                } else {
                    await firestore.collection("users").doc(friend.uid).update({
                        qrCode: friend.qrCode
                    })
                }
                let names = await firestore.collection("users").doc("nameArray").get();
                names = names.data().array;
                choice = await QrText.randomChoice(friend, names);
                res.status(200).send({
                    statusCode: 200,
                    status: true,
                    message: "Success",
                    data:{friend:friendUid,choice:choice}
                });
            } else {
                res.status(400).send({
                    statusCode: 400,
                    status: false,
                    message: "QrCode Incorrect"
                });
            }
        } catch(e) {
            console.log(e);
            res.status(500).send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            });
        }
    },
    addFriend: async (req, res) => {
        try {
            let {answer, friend} = req.body;
            let {userId, status, error} = await auth.validateToken(req);

            if (!status) {
                res.status(401).send({
                    statusCode: 401,
                    status: false,
                    message: 'Please login',
                    error: error
                });
            }

            let friendData = await firestore.collection("users").doc(friend).get();
            if(friendData.exists){
                friendData = friendData.data();
                if(friendData.nickname = answer){
                    let userData = await firestore.collection("users").doc(userId).get();
                    userData = userData.data();

                    console.log(userId)
                    console.log(userData)

                    let userFriendList = userData.friendList;
                    let friendFriendList = friendData.friendList;

                    // check if already add
                    for(let i=0;i<userFriendList.length;i++){
                        if(friend == userFriendList[i].uid){
                            res.status(400).send({
                                statusCode: 400,
                                status: false,
                                message: "Already Add",
                            });
                            return 0;
                        }
                    }

                    //prepare to save
                    userData.friendList = null;
                    userData.qrCode = null;
                    userData.amountOf.sum += 1;
                    userData.amountOf["year"+friendData.year] += 1;
                    userData.uid = userId;

                    friendData.friendList = null;
                    friendData.qrCode = null;
                    friendData.amountOf.sum += 1;
                    friendData.amountOf["year"+userData.year] += 1;
                    friendData.uid = friend;

                    userFriendList.push(friendData);
                    friendFriendList.push(userData);

                    await firestore.collection("users").doc(userId).update({
                        friendList: userFriendList,
                        amountOf: userData.amountOf
                    });
                    await firestore.collection("users").doc(friend).update({
                        friendList: friendFriendList,
                        amountOf: friendData.amountOf
                    });

                    res.status(206).send({
                        statusCode: 206,
                        status: true,
                        message: "Add friend Success",
                    });
                } else {
                    res.status(400).send({
                        statusCode: 400,
                        status: false,
                        message: "Incorrect answer",
                    });
                }
            } else {
                res.status(404).send({
                    statusCode: 404,
                    status: false,
                    message: "User Not found",
                });
            }
        } catch(e) {
            console.log(e);
            res.status(500).send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            });
        }
    },
    nameArray: async (req, res) => {
        try {
            let names = await firestore.collection("users").doc("nameArray").get();
            let newNames = [];
            names = names.data().array;
            for(let i=0;i<names.length;i++){
                if(newNames.indexOf(names[i]) <= -1){
                    newNames.push(names[i])
                }
            }
            console.log(names)
            console.log(newNames)
           await firestore.collection("users").doc("nameArray").update({
               array: newNames
            });
            res.status(206).send({
                statusCode: 206,
                status: true,
                message: "Updated",
            })
        } catch(e) {
            console.log(e);
            res.status(500).send({
                statusCode: 500,
                status: false,
                message: "Internal Server Error",
                error: e
            });
        }
    },
};