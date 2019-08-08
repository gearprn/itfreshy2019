var CryptoJS = require("crypto-js");
module.exports = {
    generate: async function(uid, hash){
        let encode =  await CryptoJS.AES.encrypt(uid, hash);
        return encode.toString()
    },
    decode: async function(encode, hash){
        let decode  = await CryptoJS.AES.decrypt(encode.toString(), hash).toString(CryptoJS.enc.Utf8);
        return decode
    },
};