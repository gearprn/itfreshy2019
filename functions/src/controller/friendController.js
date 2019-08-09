var randomstring = require("randomstring");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();
var QrText = require("../../util/QrText");
var auth = require("../../util/Auth");

module.exports = {
    quiz : async (req, res) => {
        try {
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
                res.send({
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
                res.send({
                    statusCode: 200,
                    status: true,
                    message: "Success",
                    data:{friend:friendUid,choice:choice}
                });
            } else {
                res.send({
                    statusCode: 400,
                    status: false,
                    message: "QrCode Expired"
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
    addFriend: async (req, res) => {
        try {
            let {answer, friend} = req.body;
            let friendData = await firestore.collection("users").doc(friend).get();
            friendData = friendData.data();
            // let userId = auth.validateToken(req);

            //for test api
            let userId;
            let token = req.headers.authorization;
            console.log(token.split(" ")[1]);
            await firestore.collection("tokens").where("token", "==", "testio9 ")
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        userId = doc.data().userId;
                    });
                });

            if(friendData.nickname = answer){
                let userData = await firestore.collection("users").doc(userId).get();
                userData = userData.data();

                let userFriendList = userData.friendList;
                userData.friendList = null;
                userData.qrCode = null;
                let friendFriendList = friendData.friendList;
                friendData.friendList = null;
                friendData.qrCode = null;

                userFriendList.push(friendData);
                friendFriendList.push(userData);

                await firestore.collection("users").doc(userId).update({
                    friendList: userFriendList
                });
                await firestore.collection("users").doc(friend).update({
                    friendList: friendFriendList
                });

                res.send({
                    statusCode: 206,
                    status: true,
                    message: "Add friend Success",
                });
            } else {
                res.send({
                    statusCode: 400,
                    status: false,
                    message: "Incorrect answer",
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