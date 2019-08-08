var randomstring = require("randomstring");
var User = require("../entities/User");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();
var QrText = require("../../util/QrText");

module.exports = {
    quiz : async (req, res) => {
        try {
            let qrCode = req.body;
            let friendUid = await QrText.decode(qrCode.encode, qrCode.hash);
            let friendRef = firestore.collection("users").doc(friendUid);
            if(qrCode.counter == 7){
                let newQrCode = new QRCode(friendUid, randomstring.generate(7));
                await friendRef.update({
                    qrCode: JSON.parse(JSON.stringify(newQrCode))
                })
            }
            let names = await firestore.collection("users").doc("nameArray").get();
            names = names.data();
            let friend = await firestore.collection("users").doc(friendUid).get();
            friend = friend.data();
            console.log(names);
            choices = [];
            let choices = {};
            choices[Math.floor((Math.random() * 4) + 1)] = friend.nickname;
            for(let i=0;i<3;i++){

            }
            res.send({
                statusCode: 201,
                status: true,
                message: "User Created",
                user:friendRef
            });

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