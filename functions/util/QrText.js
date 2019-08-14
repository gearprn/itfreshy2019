var CryptoJS = require("crypto-js");
module.exports = {
    generate: async function(uid, hash){
        let encoded =  await CryptoJS.AES.encrypt(uid, hash);
        return encoded.toString()
    },
    decode: async function(encode, hash){
        let decode  = await CryptoJS.AES.decrypt(encode.toString(), hash).toString(CryptoJS.enc.Utf8);
        return decode
    },
    randomChoice: async function(friend, names){
        let allChoices = ['1','2','3','4'];
        let choices = {};
        choices[allChoices.splice(Math.floor(Math.random() * allChoices.length), 1)[0]] = friend.nickname;
        names.splice(names.indexOf(friend.nickname), 1);
        for(let i=0;i<3;i++){
            choices[allChoices.splice(Math.floor(Math.random() * allChoices.length), 1)[0]] = names.splice(Math.floor(Math.random() * names.length), 1)[0]
        }
        return choices
    },
};