var randomstring = require("randomstring");
var User = require("../entities/User");
var QRCode = require("../entities/QRCode");
var admin = require("../config/firebase");
var firestore = admin.firestore();

module.exports = {
    quiz : async (req, res) => {
        try {
            let uid = "test";
            let {encode, counter} = req.body;
            if(counter == 7){
                let newEncode = new QRCode(uid, randomstring.generate(7));
                    await firestore.collection("users").doc(uid).update({
                        qrCode: JSON.parse(JSON.stringify(user))
                    })
            }
            res.send({
                statusCode: 201,
                status: true,
                message: "User Created",
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