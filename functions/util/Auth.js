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

async function registerFacebook(providerData) {
    try {
        let addUser = await firestore.collection('users').add({
            email: providerData.email,
            photoURL: providerData.photoURL
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
    validateToken: async (request) => {
        try {
            token = request.headers.authorization;
            token = token.split(' ')[1];
            let decoded = jwt.verify(token, process.env.JWT_KEY);
            if (decoded) {
                return {
                    userId: decoded.userId,
                    status: true,
                    message: 'Decoded success!'
                }
            } else {
                return {
                    status: false,
                    error: 'Decoded false!'
                };
            }
        } catch (e) {
            console.log(e);
            return {
                status: false,
                error: e
            }
        }
    },
    loginFacebook: async (providerData) => {
        try {
            let data = await new Promise((resolve) => {
                firestore.collection('users').where('email','==',providerData.email).get()
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
                if (data.doc.data().name == undefined) {
                    return {
                        token: token,
                        firstTime: true,
                        status: true
                    };
                }
                return {
                    token: token,
                    firstTime: false,
                    status: true
                };
            } else {
                let uid = await registerFacebook(providerData);
                if (uid) {
                    let token = await generateToken(uid);
                    return {
                        token: token,
                        firstTime: true,
                        status: true
                    };
                } else {
                    return {
                        status: false
                    }
                }
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    }
}