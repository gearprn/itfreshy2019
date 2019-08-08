var randomstring = require("randomstring");
var User = require("../entities/User");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();
var QrText = require("../../util/QrText");

module.exports = {
    quiz : async (req, res) => {
        try {
            let {encode} = req.body;
            let friend = await firestore.collection("users").where("qrCode.encode", "==", encode).get();
            friend = friend.data();
            console.log(JSON.stringify(friend));

            let choice = QrText.choice(friend, names);
            let friendUid = await QrText.decode(encode, friend.qrCode.hash);

            if(friend.qrCode.uid == friendUid){
                friend.qrCode.counter++;
                if(friend.qrCode.counter >= 7){
                    let newQrCode = new QRCode(friendUid, randomstring.generate(7));
                    await firestore.collection("users").doc(friendUid).update({
                        qrCode: JSON.parse(JSON.stringify(newQrCode))
                    })
                }
                let names = await firestore.collection("users").doc("nameArray").get();
                names = names.data();
                choice = QrText.randomChoice(friend, names);
                res.send({
                    statusCode: 200,
                    status: true,
                    message: "Success",
                    data:{choice:choice}
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
};