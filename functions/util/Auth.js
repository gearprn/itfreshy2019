const jwt = require('jsonwebtoken');
const admin = require("../src/config/firebase");
const firestore = admin.firestore();
require('custom-env').env();

async function generateToken(userId) {
    try {
        let id = userId;
        let token = await jwt.sign({userId: id}, process.env.JWT_KEY);
        await firestore.collection('tokens').add({
            token:token,
            userId:id
        });
        return token;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
}

async function registerFacebook(email) {
    try {
        let addUser = await firestore.collection('users').add({
            email:email
        });
        if (addUser) {
            return addUser.id
        } else {
            return false
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    validateToken: async (token) => {
        try {
            let decoded = jwt.verify(token, process.env.JWT_KEY);
            if (decoded) {
                return decoded
            } else {
                return false;
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    },
    loginFacebook: async (email) => {
        try {
            let data = await new Promise((resolve) => {
                firestore.collection('users').where('email','==',email).get()
                    .then((snapshot)=> {
                        if (snapshot.empty) {
                            // eslint-disable-next-line no-console
                            console.log({
                                message:'User not found!',
                                error: 'No matching documents.'
                            });
                            resolve({
                                status: false,
                            });
                        } else {
                            snapshot.forEach(doc=> {
                                resolve({
                                    doc,
                                    status: true
                                });
                            })
                        }
                    })
                    .catch(err => {
                        // eslint-disable-next-line no-console
                        console.log({
                            message: 'Error form loginFacebook',
                            error: err
                        });
                        resolve({
                            status: false,
                        });
                    });
            });
            if (data.status) {
                let token = await generateToken(data.doc.id);
                return token;
            } else {
                let uid = await registerFacebook(email);
                if (uid) {
                    let token = await generateToken(uid);
                    return token;
                } else {
                    return false
                }
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    }
}