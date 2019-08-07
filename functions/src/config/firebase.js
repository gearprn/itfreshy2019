const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(functions.config().admin),
    databaseURL: "https://itfreshy2019.firebaseio.com"
});

module.exports = admin;