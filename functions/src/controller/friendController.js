var randomstring = require("randomstring");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();
var QrText = require("../../util/QrText");
var auth = require("../../util/Auth");

module.exports = {
    quiz : async (req, res) => {
        try {
            if(req.headers.authorization){
                userId = auth.validateToken(req);
            } else {
                res.status(401).send({
                    statusCode: 401,
                    status: false,
                    message: "Please Login",
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
                if(friend.qrCode.counter >= 7){
                    let hash = randomstring.generate(7);
                    let encoded = await QrText.generate(friend.uid, hash);
                    let newQrCode = new QRCode(friend.uid, hash, encoded);
                    await firestore.collection("users").doc(friend.uid).update({
                        qrCode: JSON.parse(JSON.stringify(newQrCode))
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
            let userId;
            if(req.headers.authorization){
                userId = await auth.validateToken(req);
                userId = userId.userId;
            } else {
                res.status(401).send({
                    statusCode: 401,
                    status: false,
                    message: "Please Login",
                });
            }

            //for test api
            // let userId;
            // let token = req.headers.authorization;
            // console.log(token.split(" ")[1]);
            // await firestore.collection("tokens").where("token", "==", "testio9 ")
            //     .get()
            //     .then(function(querySnapshot) {
            //         querySnapshot.forEach(function(doc) {
            //             userId = doc.data().userId;
            //         });
            //     });
            let friendData = await firestore.collection("users").doc(friend).get();
            if(friendData.exists){
                friendData = friendData.data();
                if(friendData.nickname = answer){
                    let userData = await firestore.collection("users").doc(userId).get();
                    userData = userData.data();

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
                    userData.uid = userId;

                    friendData.friendList = null;
                    friendData.qrCode = null;
                    friendData.amountOf.sum += 1;
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
};