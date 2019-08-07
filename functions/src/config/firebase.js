const admin = require('firebase-admin');

const adminFirebase = process.env.FIREBASE_CONFIG;

admin.initializeApp({
    credential: admin.credential.cert(adminFirebase),
    databaseURL: "https://itfreshy2019.firebaseio.com"
});

module.exports = admin;