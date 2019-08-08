var CryptoJS = require("crypto-js");
module.exports = {
    generate: async function(uid, hash){
        let encode = CryptoJS.AES.encrypt(uid, hash);
        return encode.toString()
    },
    dencode: async function(encode, hash){
        let decode  = CryptoJS.AES.decrypt(encode.toString(), hash).toString(CryptoJS.enc.Utf8);
        return decode
    },
};