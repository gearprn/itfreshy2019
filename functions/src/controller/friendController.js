var randomstring = require("randomstring");
var User = require("../entities/User");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();
var QrText = require("../../util/QrText");

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
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

            let choice = {};
            let friendUid = await QrText.decode(encoded, friend.qrCode.hash);

            if(friend.uid == friendUid){
                friend.qrCode.counter++;
                if(friend.qrCode.counter >= 7){
                    let hash = randomstring.generate(7);
                    let encoded = QrText.generate(friend.uid, hash);
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