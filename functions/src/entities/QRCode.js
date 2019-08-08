var randomstring = require("randomstring");

class QRCode {
    constructor(uid) {
        this.uid = uid;
        this.hash = randomstring.generate(7);
        this.counter = 0;
    }
}

module.exports = QRCode;
